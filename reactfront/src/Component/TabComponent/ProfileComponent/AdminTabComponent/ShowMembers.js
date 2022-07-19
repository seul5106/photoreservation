import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Paging from './pagenation';

const ShowMembers = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [itemsCountPerPage, setItemsCountPerPage] = useState();

    useEffect(() => {
        (async () => {
            try {
                await axios.get(process.env.REACT_APP_LOCALHOST + "/admin/list",{
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
                            data.data.item.map((item, index) => (
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

export default ShowMembers;