import axios from 'axios';

import logout from './logout';

const apiController = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
});

// 요청 인터셉터 추가하기
apiController.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async function (error) {
    // 요청 오류가 있는 작업 수행
    return await Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
apiController.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    const { status, data } = error.response;
    if (status === 400 && data === 1001) {
      const refreshToken = localStorage.getItem('refreshToken');
      const config = {
        url: '/reissue',
        method: 'post',
        data: { refreshToken },
      };
      const { data } = await apiController(config);
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      return;
    }
    console.log(error);
    logout();
  },
);

export default apiController;
