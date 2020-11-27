import { CREATE_MESSAGE, GET_ERRORS } from "./types"

export const createMessage = msg =>{
    console.log('mgs-createMessage', msg)
    return { type: CREATE_MESSAGE, payload: msg }
}

export const returnErrors = ( msg ) =>{
    console.log('mgs-returnErrors', msg)
    return { type: GET_ERRORS, payload: { msg } }
}

export const genericError = msg =>{
    console.log('mgs-genericError', msg)
    return { type: GET_ERRORS, payload: msg }
}