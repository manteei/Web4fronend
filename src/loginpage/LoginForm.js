import React, { useState } from 'react';
import axios from 'axios';
import "./loginAuthpage.css"

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.get(
                `http://localhost:8080/api/login?username=${username}&password=${password}`
            ).then(response => {
                const accessToken = response.data.access_token;
                sessionStorage.setItem('access_token', accessToken);
                // перенаправление на главную страницу
                window.location.href = '/';
            })
                .catch(error => {
                        if (error?.response?.status === 401) {
                            setError("Неправильный пароль или имя пользователя!");
                        } else {
                            setError("Проблема на стороне сервера!")
                        }
                });

        } catch (err) {
            setError(err.message);

        }
    };

    return (
        <form type="loginAuth" onSubmit={handleSubmit}>
            <div className="labelName">Вход</div>
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
            {error && <div className="error">{error}</div>}
            <button type="submit" >
                Войти
            </button>
        </form>
    );
}
export default LoginForm;
