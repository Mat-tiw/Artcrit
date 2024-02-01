export const login = localStorage.getItem("token") === null ? false : true
export const defaultBackend = "http://localhost:3030/api/"
export const userPic = localStorage.getItem("userPic");
export const userId = localStorage.getItem("userId")