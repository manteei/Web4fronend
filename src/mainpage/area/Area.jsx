import React, { useState } from 'react';
import image from "../image/area.png"
import axios from "axios";
import "./area.css"
import {getNewToken} from "../util/refresh";

function Area() {
    function handleClick(event) {
        let x = event.pageX;
        let y = event.pageY;
        let imgx = event.target.offsetLeft;
        let imgy = event.target.offsetTop
        console.log(imgx);
        console.log(imgy);
        const rFormElement = document.querySelector('.rForm');
        const rValue = rFormElement.value;
        let x3 = ((x - imgx - 200) * (3*rValue)/400)
        let y3 = -((y - imgy - 200) * (3*rValue)/400)

        axios.post('http://localhost:8080/api/points/check', {
            x: x3,
            y: y3,
            radius: rValue
        }, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
            }
        }).then(response => {
            window.location.reload();
        }).catch(error => {
            if (error?.response?.status === 403) {
                getNewToken();
            }
        });
    }

    return (
        <div>
        <img src={image} className="image" alt="Координатная плоскость" onClick={event => handleClick(event)} />
        </div>
    );
}
export default Area;