import axios, { AxiosResponse } from "axios";

import { Activity } from "../models/activities";

// TWO WAYS TO SEND HTTP REQUESTS VIA AXIOS
//1.
// axios.get("/Communications")
// .then(function (response) {
//   console.log(response);
//   setCommunications(response.data);
//   setLoading(false);
// })
//2.
// const sendPost = () => {
// axios({
//     method: 'post',
//     url: '',
//     data: {
//         name: 'beth',
//     }
// })}

axios.defaults.baseURL = "http://localhost:5000/api";

//FAKES A DELAY TO SEE REALISTIC LOADING
//see refactor of code -- so that comments are not needed
// axios.interceptors.response.use((response) => {
//   return new Promise((resolve) => setTimeout(resolve, 1000))
//       .then(() => {
//       console.log(resolve);
//       return response;
//     })
//     .catch((error) => {
//       console.log(error);
//       return Promise.reject(error);
//     });
// });

const fakeResponseDelay = (delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve, delay);
    })
}

axios.interceptors.response.use( async (response) => {
    try {
        await fakeResponseDelay(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

//DEFINING GENERICS IN TYPESCRIPT

//TO MAKE THE RESPONSE OF TYPE AXIOSRESPONSE TYPE SAFE -- MAKE THE RESPONSE TAKE A GENERIC TYPE <T>, THEN DEFINE THE ACTUAL RESPONSE TYPES IN THE ACTIVITES OBJECT
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

//CAN USE THESE METHODS FOR ALL REQUESTS REGARDLESS OF THE DOMAIN  -- 4 basic types of requests
const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};
//DEFINE THE DOMAIN SPECIFIC TYPES OF REQUESTS
const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>('/activities', activity),
  update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activities/${id}`),
};
//BUNDLE DOMAINS UNDER THE agent OBJECT, CALL WOULD BE agent.DOMAIN.RETURN or agent.Activites.list()then(response => {//do something with response, like set it to state })
const agent = {
  Activities,
};

export default agent;
