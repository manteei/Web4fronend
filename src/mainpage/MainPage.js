import React, { useEffect } from 'react';

const MainPage = () => {
    // Проверяем, есть ли токен доступа в sessionStorage
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
            // Если токена нет, то редиректим на страницу авторизации
            window.location.replace('/login');
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');
        window.location.replace('/login');
    };

    return (
        <div>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}

export default MainPage;



