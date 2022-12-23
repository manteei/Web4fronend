import React, { useState } from 'react';
import "./CoordinatesForm.css"
import axios from "axios";
function CoordinatesForm() {

    const [x, setX] = useState("0");
    const [y, setY] = useState("0");
    const [radius, setRadius] = useState('1');
    /*const handleChange = (e) => {
        const value = e.target.value;
        if (value >= -5 && value <= 5) {
            // сохранить значение в state
        } else {
            // вывести сообщение об ошибке
        }
    }*/
    const handleSubmit = async e => {
        e.preventDefault();

        await axios.post('http://localhost:8080/api/points/check', {
            x: x,
            y: y,
            radius: radius
        }, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
            }
        })
    };

    return (
        <form className="coordinatesForm" onSubmit={handleSubmit}>
            <label>
                Координата X:
                <select className="xForm" value={x} onChange={e => setX(e.target.value)}>
                    <option value="-5">-5</option>
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </label>

            <label>
                Координата Y:
                <input placeholder="(-5 ... 5)" type="number" min="-5" max="5"  value={y} onChange={e => setY(e.target.value)} />
            </label>

            <label>
                Радиус:
                <select value={radius} onChange={e => setRadius(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </label>
            <button type="submit" >Проверить</button>
        </form>
    );
}
export default CoordinatesForm;
