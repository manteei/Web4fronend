import React, { useState, useEffect } from 'react';
import LoginForm from './loginpage/LoginForm';
import RegistrationForm from './loginpage/RegistrationForm';
import MainPage from './mainpage/MainPage';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('access_token');
    setIsLoggedIn(false);
  };

  const [loginform, setLoginForm] = useState(true);
  const [authform, setAuthForm] = useState(false);

  const handleAuthForm = () => {
    setAuthForm(true);
    setLoginForm(false);
    // обнуление полей формы
  };

  const handleLoginForm = () => {
    setAuthForm(false);
    setLoginForm(true);
    // обнуление полей формы
  };

  return (
      <div>
        {isLoggedIn ? (
            <div>
              <MainPage handleLogout={handleLogout} />
            </div>
        ) : (
            <div>
              <div>
                <span className="labelName">Громилова Мария P32311</span>
                {loginform ? (
                    <button type="change" onClick={handleAuthForm}>Регистрация</button>)
                    :(<div></div>)}
                {authform ? (
                    <button type="change" onClick={handleLoginForm}>Вход</button>
                ):(<div></div>)}
              </div>

            <div>
              {loginform ? (
                  <LoginForm  setIsLoggedIn={setIsLoggedIn} setError={setError} />
              ):(<div></div>)}
              {authform ? (
                  <RegistrationForm  setIsLoggedIn={setIsLoggedIn} setError={setError} />
              ):(<div></div>)}
              {error && <div>{error}</div>}
            </div>
            </div>
        )}
      </div>
  );
}

export default App;



