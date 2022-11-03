import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, options = {})=>{
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