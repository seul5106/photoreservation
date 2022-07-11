// import axios from "axios"

// import { Cookies } from 'react-cookie'

// const cookies = new Cookies();

// export default function ReadToken() {
//   (async () => {
//     try {
//       await axios.post(process.env.REACT_APP_LOCALHOST + "/readToken");
//       console.log("토큰비교성공!!")
//     } catch (error) {
//       if (error.response.status === 419) {
//         cookies.remove("jwtToken")
        
//       } else if (error.response.status === 401) {
//         cookies.remove("jwtToken")
//       }
//       return;
//     }
//   })()
//   return true;
// }