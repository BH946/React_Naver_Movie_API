import axios from "axios";

const BASE_URL = "/proxy/api";
// const BASE_URL = "http://localhost:5000/api";
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDEyNjBkMjM5ZjRhYzMyY2ZmNzhhZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1ODIzMDExMSwiZXhwIjoxNjU4NDg5MzExfQ.IEqdckNxvyf_iptK7yA3G8Lhxl67wSQVGeqdMqEMwlk";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

// user요청에는 헤더에 토큰이 필요
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}`},
});

