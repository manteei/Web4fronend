import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./Table.css"

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
                console.log(error);
            });
    }, []);

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
                    <td>{item.x}</td>
                    <td>{item.y}</td>
                    <td>{item.radius}</td>
                    <td>{item.date}</td>
                    <td>{item.duration}</td>
                    <td>{item.hit ? 'Да' : 'Нет'}</td>
                </tr>))}
            </tbody>
            </table>
            <button type="clean" onClick={cleanTable}>Очистить таблицу</button>
        </div>
    );
}
export default Table;

