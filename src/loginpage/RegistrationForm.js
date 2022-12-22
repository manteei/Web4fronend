import React, { useState } from 'react';
import axios from 'axios';


function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:8080/api/user/save`,
                {
                    username: username,
                    password: password
                }
            ).then(response => {
                axios.get(`http://localhost:8080/api/login?username=${username}&password=${password}`)
                    .then(loginResponse=> {
                        const accessToken = loginResponse.data.access_token;
                        sessionStorage.setItem('access_token', accessToken);
                        window.location.href = '/';
                    }).catch(error=>{
                    setError(error.message);
                });
            })
                .catch(error=>{
                    if (error.response.status === 400){
                        setError("Имя пользователя занято!");
                    }else {
                        setError(error.message);
                    }
                });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Имя пользователя:
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <br />
            <label>
                Пароль:
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <br />
            {error && <div>{error}</div>}
            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
}

export default RegistrationForm;
