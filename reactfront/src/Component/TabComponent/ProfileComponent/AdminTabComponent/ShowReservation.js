import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Paging from './pagenation';

const ShowReservation = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [itemsCountPerPage, setItemsCountPerPage] = useState();

    useEffect(() => {
        (async () => {
            try {
                await axios.get(process.env.REACT_APP_LOCALHOST + "/admin/reservelist",{
                    params: {
                        page: page
                    }
                }).then((response) => {
                    setData(response)
                    setCount(response.data.pagenation.totalCount)
                    setItemsCountPerPage(response.data.pagenation.listCount)
                })
                
            } catch (error) {
                console.log(error);
                return;
            }
        })()
    }, [page])

    return (
        data !== undefined ?
            <>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>날짜</th>
                            <th>시간</th>
                            <th>예약인원</th>
                            <th>예약취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data !== undefined && data.data.item.length !== 0 ?
                            data.data.item.map((item, index) => (
                                <tr key={index}>
                                    <td>{data.data.item[index].user_id}</td>
                                    <td>{data.data.item[index].reserve_date}</td>
                                    <td>{data.data.item[index].reserve_time}</td>
                                    <td>{data.data.item[index].reserve_headcount}</td>
                                    <td>{data.data.item[index].reserve_cancel}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={8}>잘못된 요청입니다.</td>
                            </tr>}
                    </tbody>
                </Table>

                <Paging page={page} count={count} setPage={setPage} itemsCountPerPage={itemsCountPerPage}/>
            </>
            :

            <></>
    );
};

export default ShowReservation;