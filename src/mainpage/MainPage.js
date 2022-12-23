import React, { useEffect } from 'react';
import "./CoordinatesForm.css";
import CoordinatesForm from "./CoordinatesForm";
import "./mainPage.css"

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
        <div>
            <CoordinatesForm></CoordinatesForm>
        </div>
        <div>
            <button type="exit" onClick={handleLogout}>Выйти</button>
        </div>
        </div>
    );
}

export default MainPage;



