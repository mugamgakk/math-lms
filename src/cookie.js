import { Cookies } from "react-cookie";
import dayjs from "dayjs";

const cookies = new Cookies();


// 미지정 시 하루뒤 만료
export const setCookie = (key, value, options = { expires : dayjs(new Date()).add(1, "d").$d})=>{
    return cookies.set(key, value, {...options})
}

// options = {
//     path : "/",
//     expires : 
// }

export const getCookie = (key)=>{
    return cookies.get(key);
}

export const removeCookie = (key)=>{
    return cookies.remove(key);
}