import axios from "axios";

 export function setToken(refreshToken){
    document.cookie = "refresh_token=" + refreshToken + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
}
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

export function getNewToken(){
        axios.get('http://localhost:8080/api/user/refresh', {
            headers: {
                Authorization: 'Bearer ' + getCookie('refresh_token')
            }}).then(response => {
                const accessToken = response.data.access_token;
                const refreshToken = response.data.refresh_token;
                setToken(refreshToken);
                sessionStorage.setItem('access_token', accessToken);
            })
            .catch(error => {
                console.log(error);
            });
}
