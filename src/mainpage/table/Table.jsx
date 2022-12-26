import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Table.css"
import "../area/area.css"
import {getNewToken} from "../util/refresh";

function Table() {
    const [data, setData] = useState([]);
    const cleanTable = () => {
        axios.post('http://localhost:8080/api/points/clear', {

        }, {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
            }
        }).then(response => {
            window.location.reload();
        });

    };
    useEffect(() => {
        axios.get('http://localhost:8080/api/points', {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                if (error?.response?.status === 403) {
                    getNewToken();
                }
            });
    }, []);

    const [lastRadius, setLastRadius] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            setLastRadius(data[data.length - 1].radius);
        }
    }, [data]);


    return (
        <div>

        <table>
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Hit</th>
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.id}>
                    <td className="xForm">{item.x}</td>
                    <td className="yForm">{item.y}</td>
                    <td className="rForm">{item.radius}</td>
                    <td>{item.date}</td>
                    <td>{item.duration}</td>
                    <td>{item.hit ? 'Да' : 'Нет'}</td>
                </tr>
            ))}
            </tbody>
            </table>
            {data.map(item => (
                <div style={{ top: `${400 * item.y/(-3*lastRadius)+200+216}px`, left: `${ 400 * item.x/(3*lastRadius)+200+1048}px`, backgroundColor: item.hit ? 'green' : '#960a0a'}} className="dot"></div>
            ))}
            <button type="clean" onClick={cleanTable}>Очистить таблицу</button>
        </div>
    );
}
export default Table;

