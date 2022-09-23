import axios from "axios";

const ajax = axios.create({
    baseURL: '/api/lms',
    timeout: 1500
    // headers: {'X-Custom-Header': 'foobar'}
  });


  // Add a request interceptor
ajax.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("request", config)
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
ajax.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("response",response)
    return response;
  }, function (error) {
    console.log("response error",error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default ajax