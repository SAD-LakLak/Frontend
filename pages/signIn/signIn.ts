import axiosInstance from "~/axiosConfig";

interface ISignInBody {
    "username": string,
    "password": string
}

interface ISignInHeaders {

}

export const signUp = (signUpData: ISignUpBody) => {
    const body: ISignInBody = signUpData;
    const headers: ISignInHeaders = {};
    axiosInstance.post('/login', body, {headers: headers})
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}