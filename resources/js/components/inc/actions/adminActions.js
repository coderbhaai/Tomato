import { ADD_META, UPDATE_META, ADD_BLOG, UPDATE_BLOG, ADD_BLOG_META, UPDATE_BLOG_META, ADD_BASIC, UPDATE_BASIC, ITEM_ADDED, ALL_LIST, FETCH_CONTACT_FORM, DROP_LIST } from './types'

import axios from 'axios'



// Admin Action

export const addMeta = (data) => dispatch =>{
    return  axios.post('/api/v1/addMeta', data)
    .then( res =>res.data )
    .then(meta => {
        dispatch({ type: ADD_META, payload: meta })
    })
}

export const updateMeta = (data) => dispatch =>{
    return  axios.post('/api/v1/updateMeta', data)
        .then( res =>res.data )
        .then(meta =>{
            dispatch({ type: UPDATE_META, payload: meta })
        })
}

export const addBlog = (data) => dispatch =>{
    return  axios.post('/api/v1/addBlog', data)
        .then( res =>res.data )
        .then(blog => {
            dispatch({ type: ADD_BLOG, payload: blog })
        })
}

export const updateBlog = (data) => dispatch =>{
    return  axios.post('/api/v1/updateBlog', data)
    .then( res =>res.data )
        .then(blog => {
            dispatch({ type: UPDATE_BLOG, payload: blog })
        })
}

export const addBlogMeta = (data) => dispatch =>{
    return  axios.post('/api/v1/addBlogMeta', data)
        .then( res =>res.data )
        .then(blogmeta => { 
            dispatch({ type: ADD_BLOG_META, payload: blogmeta })
        })
}

export const updateBlogMeta = (data) => dispatch =>{
    return  axios.post('/api/v1/updateBlogMeta', data)
        .then( res =>res.data )
        .then(blogmeta => {
            dispatch({ type: UPDATE_BLOG_META, payload: blogmeta })
        })
}

export const addBasic = (data) => dispatch =>{
    return  axios.post('/api/v1/addBasic', data)
    .then( res =>res.data )
    .then(meta => {
        dispatch({ type: ADD_BASIC, payload: meta })
    })
}

export const updateBasic = (data) => dispatch =>{
    return  axios.post('/api/v1/updateBasic', data)
        .then( res =>res.data )
        .then(meta =>{
            dispatch({ type: UPDATE_BASIC, payload: meta })
        })
}

// export const addProduct = (data) => dispatch =>{
//     return  axios.post('/api/v1/addProduct', data)
//     .then( res =>res.data )
//     .then(product => {
        
//     })
// }

// export const updateProduct = (data) => dispatch =>{
//     return  axios.post('/api/v1/updateProduct', data)
//         .then( res =>res.data )
//         .then(product =>{
//             dispatch({ type: UPDATE_PRODUCT, payload: product })
//         })
// }

export const itemAdded = (data) => dispatch =>{
    return (
        dispatch({ type: ITEM_ADDED, payload: data })
    )
}

export const allList = () => dispatch => {
    axios.get('/api/v1/allList')
        .then( res =>res.data )
        .then(states =>
            dispatch({ type: ALL_LIST, payload: states })
        )
}


export const dropList = () => dispatch => {
    axios.get('/api/v1/dropList')
        .then( res =>res.data )
        .then(drop =>
            dispatch({ type: DROP_LIST, payload: drop })
        )
}

// Admin Panel



// export const fetchContactForm = () => dispatch => {
//     axios.get('/api/v1/fetchContactForm')
//         .then( res =>res.data )
//         .then(form =>
//             dispatch({ type: FETCH_CONTACT_FORM, payload: form })
//         )
// }



















export const addContactForm = (data) => dispatch =>{
    return  axios.post('/api/v1/addContactForm', data)
    .then( res =>res.data )
    .then(from => {
    })
}