import axiosInstance from '../common/Interceptor';
import { ToasterSuccess, ToasterWarning } from "../common/toaster";
import swal from 'sweetalert'

//import axios from 'axios';

class CommonService {


    httpGet = async (requestURL, authorizationRequired) => new Promise((resolve, reject) => {
        // const userresponse = JSON.parse(localStorage.getItem('user'))
        //  const userresponse = "";// JSON.parse(AsyncStorage.getItem('user'))

        const options = {
            method: 'get', 
            headers: {
                    'content-type': 'application/json; charset=UTF-8',
                     "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        axiosInstance.get(requestURL,options)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });

    httpDelete = async (requestURL, authorizationRequired) => new Promise((resolve, reject) => {

        const options = {
            method: 'Delete', 
            headers: {
                    'content-type': 'application/json; charset=UTF-8',
                     "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
            }
        }
        swal({
            title: 'Are You Sure Delete Data?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axiosInstance.delete(requestURL ,options )
                    .then((response) => {
                        resolve(response);
                        ToasterSuccess("Success...!!");

                    })
                    .catch((error) => {
                        reject(error);

                    });
            }
            else {
                ToasterWarning("Your Data Safe...!!");
            }
        })
    });

    httpPost = async (requestURL, requestBody, authorizationRequired) => new Promise((resolve, reject) => {
        // const userresponse = JSON.parse(localStorage.getItem('user'))
        const userresponse = ""; // JSON.parse(AsyncStorage.getItem('user'))

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json, text/plain, */*',
                "Access-Control-Allow-Origin": "*",
                "Authorization" : `Bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify(requestBody)
        }

        if (authorizationRequired && userresponse) {
            // options.headers.Authorization = `CustomBasic ${userresponse.UserId} ${userresponse.Token}`
            options.headers.Authorization = `bearer ${userresponse.accesstoken}`
        }

        axiosInstance.post(requestURL, requestBody, {
            headers: { 'Content-Type': "application/json" }
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });

    httpPostFormData = async (requestURL, requestBody, authorizationRequired) => new Promise((resolve, reject) => {
        // const userresponse = JSON.parse(localStorage.getItem('user'))
        const userresponse = ""; // JSON.parse(AsyncStorage.getItem('user'))

        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json, text/plain, */*'
            },
            body: JSON.stringify(requestBody)
        }

        if (authorizationRequired && userresponse) {
            // options.headers.Authorization = `CustomBasic ${userresponse.UserId} ${userresponse.Token}`
            options.headers.Authorization = `bearer ${userresponse.accesstoken}`
        }

        axiosInstance.post(requestURL, requestBody, {
            headers: { 'Content-Type': "application/json" }
        })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });

    });


    //  checkInternetConnection = async () => {
    //     let data = await Network.getNetworkStateAsync();
    //     if (data.isConnected == false || data.type == Network.NetworkStateType.NONE) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    // }
}
export default CommonService