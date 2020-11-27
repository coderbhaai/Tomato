import { FETCH_USER, EXIT_USER, RESET_PASSWORD, NEW_USER } from './types'
import { createMessage, returnErrors } from "./messages"

export const registerUser = (data) => dispatch =>{
    return  axios.post('/api/v1/register', data)
    .then(res => {
        console.log('res', res)
        if(res.data.success){
            dispatch(createMessage({ register: "Registration Successful" }))
        }else{
            dispatch(returnErrors( res.data.response ))
        }
    })
}

export const fetchUser = (data) => dispatch =>{
    return  axios.post('/api/v1/login', data)
        .then(res =>{
            if(res.data.success){
                dispatch({ type: FETCH_USER, payload: res.data }),
                dispatch(createMessage({ login: "Welcome to Tomato Project" }))
            }else{
                dispatch(returnErrors( res.data.response ))
            }
        })
}

export const exitUser = (data) => dispatch =>{
    return  axios.post('/api/v1/login', data)
        .then(user => {
            dispatch({ type: EXIT_USER, payload: user }),
            dispatch(createMessage({ logOut: "You are logged out" }))
        })
}

export const forgotPassword = (data) => dispatch =>{
    return  axios.post('/api/v1/forgotPassword', data)
    .then(res => {
        if(res.data.success){
            dispatch(createMessage({ forgotPassword: "Check email to reset password" }))
        }else{
            dispatch(returnErrors( res.data.response ))
        }
    })
}

export const resetPassword = (data) => dispatch =>{
    return  axios.post('/api/v1/resetPassword', data)
        .then(res => {
            if(res.data.success){
                dispatch({ type: RESET_PASSWORD, payload: res.data }),
                dispatch(createMessage({ resetPassword: "Password reset successful" }))
            }else{
                dispatch(returnErrors( res.data.response ))
            }
        }) 
}

export const newUser = (data) => dispatch =>{
    return ( dispatch({ type: NEW_USER, payload: data }) )
}
