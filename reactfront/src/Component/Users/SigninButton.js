import RegexHelper from "./regex_helper"

const SigninButton = () =>{
    const regexHelper = new RegexHelper();
    

    //아이디 유효성 검사
    if (!regexHelper.value("#user_id", "아이디를 입력하세요.")) {
        return false;
    }
    if (!regexHelper.min_length("#user_id", 4, "아이디는 최소 4자 이상 입력 가능합니다.")) {
        return false;
    }
    if (!regexHelper.max_length("#user_id", 20, "아이디는 최대 20자 까지만 입력 가능합니다.")) {
        return false;
    }
    if (!regexHelper.eng_num("#user_id", "아이디는 영어와 숫자 조합만 입력 가능합니다.")) {
        return false;
    }

    //이메일 유효성 검사
    if (!regexHelper.value("#email", "이메일을 입력하세요.")) {
        return false;
    }
    if (!regexHelper.email("#email", "이메일 주소가 잘못되었습니다.")) {
        return false;
    }

    //비밀번호 유효성 검사
    if (!regexHelper.value("#user_pw", "비밀번호를 입력하세요.")) {
        return false;
    }
    if (!regexHelper.min_length("#user_pw", 4, "비밀번호는 최소 4자 이상 입력 가능합니다.")) {
        return false;
    }
    if (!regexHelper.max_length("#user_pw", 20, "비밀번호는 최대 20자 까지만 입력 가능합니다.")) {
        return false;
    }
    if (!regexHelper.compare_to("#user_pw", "#user_pw_re", "비밀번호 확인이 잘못되었습니다.")) {
        return false;
    }

    //이름 유효성 검사
    if (!regexHelper.value("#user_name", "이름을 입력하세요.")) {
        return false;
    }
    if (!regexHelper.min_length("#user_name", 2, "이름은 최소 2자 이상 입력 가능합니다.")) {
        return false;
    }
    if (!regexHelper.max_length("#user_name", 20, "이름은 최대 20자 까지만 입력 가능합니다.")) {
        return false;
    }
    if (!regexHelper.kor("#user_name", "이름은 한글만 입력 가능합니다.")) {
        return false;
    }

    //연락처 유효성 검사
    if (!regexHelper.value("#tel", "연락처를 입력하세요.")) {
        return false;
    }

    // if (!regexHelper.minusSign("#tel", "연락처에 -기호를 빼고 입력하세요.")) {
    //     return false;
    // }

    if (!regexHelper.phone("#tel", "연락처가 잘못되었습니다.")) {
        return false;
    }

    //우편번호 유효성 검사
    if (!regexHelper.value("#postcode", "우편번호를 입력하세요.")) {
        return false;
    }
    if (!regexHelper.value("#address", "주소를 입력하세요.")) {
        return false;
    }
    if (!regexHelper.value("#detailAddress", "상세주소를 입력하세요.")) {
        return false;
    }

    //생년월일 유효성 검사
    if (!regexHelper.value("#user_date", "생년월일을 선택해주세요.")) {
        return false;
    }
}

export default SigninButton