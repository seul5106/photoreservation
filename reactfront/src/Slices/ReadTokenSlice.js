import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import axios from 'axios';
import {Cookies} from "react-cookie"

const cookies = new Cookies();

/** 비동기 처리 함수 구현 */
// payload는 이 함수를 호출할 때 전달되는 파라미터. 
export const getTokenIsOK = createAsyncThunk("GET_LIST", async (payload, { rejectWithValue }) => {
    let result = null;
    
    const token = cookies.get("jwtToken")
    try {
        const apiUrl =  process.env.REACT_APP_LOCALHOST + "/readToken"
        result = await axios.post(apiUrl, {},{
            headers: {authorization: token}
        })
        if(result.data.faultInfo !== undefined) {
            const err = new Error();
            err.response = {status: 500, statusText: result.data.faultInfo.message};
            throw err;
        }
    } catch (err) {
        if(err.response.status === 401 || err.response.status === 419){
            cookies.remove("jwtToken")
        }
        // 에러 발생시 `rejectWithValue()`함수에 에러 데이터를 전달하면 extraReducer의 rejected 함수가 호출된다.          
        result = rejectWithValue(err.response);
    }
    return result;
});
/** Slice 정의 (Action함수 + Reducer의 개념) */
export const ReadTokenSlice = createSlice({
    name: 'ReadToken',
    initialState: {
        /** 상태값 구조 정의 (자유롭게 구성 가능함) */
        rt: null,           // HTTP 상태 코드(200,404,500 등)         
        rtmsg: null,        // 에러메시지         
        data: null,           // Ajax 처리를 통해 수신된 데이터         
        loading: false      // 로딩 여부
    },
    // 내부 action 및 동기 action (Ajax처리시에는 사용하지 않음)     
    reducers: {},
    // 외부 action 및 비동기 action     
    extraReducers: {
        /** Ajax요청 준비 */
        [getTokenIsOK.pending]: (state, { payload }) => {
            // state값을 적절히 수정하여 리턴한다.            
            return { ...state, loading: true }
        },
        /** Ajax 요청 성공 */
        [getTokenIsOK.fulfilled]: (state, { payload }) => {
            
            
            // state값을 적절히 수정하여 리턴한다.            
            return {
                ...state,
                rt: payload.status,
                rtmsg: payload.statusText,
                data: payload.data,
                loading: false
            }
        },
        /** Ajax 요청 실패 */
        [getTokenIsOK.rejected]: (state, { payload }) => {
            // state값을 적절히 수정하여 리턴한다.             
            return {
                ...state,
                rt: payload?.status ? payload.status : '500',
                rtmsg: payload?.statusText ? payload.statusText : 'Server Error',
                loading: false,
            }
        }
    },
});

// 리듀서 객체 내보내기 
export default ReadTokenSlice.reducer;

