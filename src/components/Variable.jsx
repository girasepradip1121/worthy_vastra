export const API_URL =process.env.REACT_APP_API_URL

export const userToken=()=>{
    const userData=localStorage.getItem('token');
    return userData ? JSON.parse(userData) : null
}