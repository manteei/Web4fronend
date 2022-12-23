import React, { useState } from 'react';
import axios from 'axios';
import "./loginAuthpage.css"


function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        if (username.length < 4) {
            setError('Логин должен содержать минимум 4 символа!');
            return;
        }
        if (password.length < 4) {
            setError('Пароль должен содержать минимум 4 символа!');
            return;
        }
        if (password !== confirmPassword) {
            setError('Пароли не совпадают!');
            return;
        }
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
                        setError("Проблема на стороне сервера!")
                    }
                });
        } catch (err) {
            setError("Проблема на стороне сервера!");
        }
    };

    return (
        <form type="loginAuth" onSubmit={handleSubmit}>
            <div className="labelName">Регистрация</div>
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
            <label>
                Повторите пароль:
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </label>
            <br />
            {error && <div className="error">{error}</div>}
            <button type="submit">
                Зарегистрироваться
            </button>
        </form>
    );
}

export default RegistrationForm;
