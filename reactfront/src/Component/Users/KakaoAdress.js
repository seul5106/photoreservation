import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { setPostCode } from "../../Slices/SignInPostCodeSlice"

// 상태값을 로드하기 위한 hook과 action함수를 dispatch할 hook 참조
import { useDispatch } from "react-redux";

const KakaoAdress = () => {
    const [openPostcode, setOpenPostcode] = useState(false);

    // hook을 통해 slice가 관리하는 상태값 가져오기
    

    // dispatch 함수 생성
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        postcode: "",
        longaddress: "",
        refaddress: "",
        detailaddress: ""
    })

    //스타일
    const postCodeStyle = {
        width: "100%",
        height: "500px",
    }

    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data: any) => {
            //dispatch함수로 slice에 데이터 저장
            dispatch(setPostCode({
                ...address,
                postcode: data.zonecode,
                longaddress: data.address,
                refaddress: data.bname,
            }))
            setAddress({
                postcode: data.zonecode,
                longaddress: data.address,
                refaddress: data.bname,
            })
            setOpenPostcode(false);
        },
    }

    const onChangeDetailAddress = (e) => {
        setAddress({
            ...address,
            detailaddress: e.target.value
        });

        dispatch(setPostCode({
            ...address,
            detailaddress: e.target.value
        }))
    }

    return (
        <div>
            <div className="form-group">
                <p className="ptag">주소지</p>
                <div className="flex">
                    <div className="input-100">
                        <input value={address.postcode || ""} type="text" name="postcode" id="postcode" className="form-control justify" placeholder="우편번호"
                            readOnly />
                    </div>
                    <div className="input-100">
                        <button className='form-control' onClick={handle.clickButton}>우편번호찾기</button>
                    </div>
                </div>
                <div className="input-100">
                    <input value={address.longaddress || ""} type="text" name="address" id="address" className="form-control" placeholder="주소" readOnly />
                </div>
                <div className="flex">
                    <div className="input-100">
                        <input onChange={onChangeDetailAddress} type="text" name="detailAddress" id="detailAddress" className="form-control justify"
                            placeholder="상세주소" />
                    </div>
                    <div className="input-100">
                        <input value={address.refaddress || ""} type="text" name="extraAddress" id="extraAddress" className="form-control ref" placeholder="참고항목"
                            readOnly />
                    </div>
                </div>
                <div>
                    {openPostcode &&
                        <DaumPostcodeEmbed
                            onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                            style={postCodeStyle}
                        />}
                </div>
            </div>
        </div>
    )
};

export default KakaoAdress;