import axiosInstance from "~/axiosConfig";

interface ISignUpBody {
    "username": string,
    "email": string,
    "password": string
}

export const signUp = (signUpData: ISignUpBody) => {
    const body = signUpData;
    const headers = {};
    axiosInstance.post('/register/', body, {headers: headers})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}