import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Pagenation from './pagenation';

const ShowMembers = () => {
    const [data, setData] = useState();
    const [limit, setLimit] = useState(2);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    useEffect(() => {
        (async () => {
            try {
                await axios.get(process.env.REACT_APP_LOCALHOST + "/admin/list").then((response) => {
                    setData(response)

                })
                console.log(data)
            } catch (error) {

                console.log(error);
                return;
            }
        })()


    }, [])

    const handle = () => {
        console.log(offset)
        console.log(data.data.item)
    }

    return (
        data !== undefined ?
            <>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>성함</th>
                            <th>아이디</th>
                            <th>이메일</th>
                            <th>전화번호</th>
                            <th>생년월일</th>
                            <th>주소</th>
                            <th>등록일</th>
                            <th>탈퇴여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data !== undefined && data.data.item.length !== 0 ?
                            data.data.item.slice(offset, offset + limit).map((item, index) => (
                                <tr key={index}>
                                    <td>{data.data.item[index].user_name}</td>
                                    <td>{data.data.item[index].user_id}</td>
                                    <td>{data.data.item[index].user_email}</td>
                                    <td>{data.data.item[index].user_tel}</td>
                                    <td>{data.data.item[index].user_birth}</td>
                                    <td>{data.data.item[index].totalAdd}</td>
                                    <td>{data.data.item[index].reg_date}</td>
                                    <td>{data.data.item[index].is_out}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={3}>예약된 날짜가 없습니다.</td>
                            </tr>}
                    </tbody>
                </Table>
                <button onClick={handle}>asd</button>
                <Pagenation
                    total={data.data.item.length}
                    limit={limit}
                    page={page}
                    setPage={setPage}
                />
            </>
            :

            <div>
                123
            </div>
    );
};

export default ShowMembers;