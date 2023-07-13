import axios from 'axios';

// Add a request interceptor 
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(async (config) => {
    //let userData = await AsyncStorage.getItem('loginUser');
    
    
    // const userData = localStorageService.getAccessToken();
    const userData = {};
    // if (userData) {
    //     const objuserDetail = JSON.parse(userData)
    //     if (objuserDetail) {
    //         config.headers['Authorization'] = 'Bearer ' + objuserDetail.access_token
    //     }
    // }
    return config;
}, (error) => {
    // Do something with request error 
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use((response) => {
    // Do something with response data
    return response
}, function (error) {
    // Do something with response error
    return Promise.reject(error)
})


export default axiosInstance;