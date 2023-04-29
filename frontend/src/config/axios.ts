import axios from "axios";
import cogoToast from "cogo-toast";

// axios 인스턴스를 생성합니다.
// baseURL은 .env 파일에서 가져옵니다.
// .env 파일은 프로젝트 루트에 있습니다.
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_DEV,
  headers: {
    "Access-Control-Allow-Origin": "*", // CORS 지원이 작동하는데 필요합니다.(모든 도메일의 요청에 대해 CORS를 허용합니다.)
  },
});

// axios 인스턴스에 요청을 보내기 전에 수행할 일을 정의합니다.
instance.interceptors.request.use(
    (config) => {
        // 요청을 보내기 전에 수행할 일 (토큰 추가 등)
        let authState = window.sessionStorage.getItem("token");
        // Bearer 토큰을 헤더에 추가합니다.
        // Bearer 토큰은 JWT 토큰을 사용할 때 사용합니다.
        // JWT 토큰은 로그인을 하면 서버에서 발급해주는 토큰입니다
        config.headers.Authorization = `Bearer ${authState}`;
        return config;
    },
    (error) => Promise.reject(error)
)
