
import { FETCH_USER, NEW_USER, EXIT_USER, ADD_META, UPDATE_META, ADD_BLOG, UPDATE_BLOG, ADD_BLOG_META, ADD_BASIC, UPDATE_BASIC, ITEM_ADDED, FETCH_BLOG_META, UPDATE_BLOG_META, ALL_LIST, FETCH_CONTACT_FORM } from '../actions/types'

const initialState={
    user:                       [],
    newMeta:                    [],
    updatedMeta:                [],
    newBlogMeta:                [],
    updatedBlogMeta:            [],
    newBlog:                    [],
    updatedBlog:                [],
    newBasic:                   [],
    updatedBasic:               [],
    updatedProduct:             [],
    itemsInCart:                '',
    catList:                    [],
    tagList:                    [],    
    blogList:                   [],
    contactForm:                [],
    trips:                      [],
    suggestedBlogs:             [],
    isAuthenticated:            false,
}

export default function(state= initialState, action){
    switch(action.type){
        case ADD_META:                           if(action.payload.success === true){ return{ ...state, newMeta: action.payload.datax } }else{ return{ ...state} }
        case UPDATE_META:                        if(action.payload.success === true){ return{ ...state, updatedMeta: action.payload.datax} }else{ return{ ...state} }
        
        case ADD_BLOG_META:                      if(action.payload.success === true){ return{ ...state, newBlogMeta: action.payload.datax} }else{ return{ ...state} }
        case UPDATE_BLOG_META:                   if(action.payload.success === true){ return{ ...state, updatedBlogMeta: action.payload.datax} }else{ return{ ...state} } 
        
        case ADD_BASIC:                          if(action.payload.success === true){ return{ ...state, newBasic: action.payload.datax } }else{ return{ ...state} }
        case UPDATE_BASIC:                       if(action.payload.success === true){ return{ ...state, updatedBasic: action.payload.datax} }else{ return{ ...state} }
        
        // case UPDATE_PRODUCT:                     if(action.payload.success === true){ return{ ...state, updatedProduct: action.payload.datax} }else{ return{ ...state} }
        
        case FETCH_BLOG_META:                    return { ...state, catList: action.payload.catList, tagList: action.payload.tagList}
        
        case ADD_BLOG:                            if(action.payload.success === true){ return{ ...state, newBlog: action.payload.datax} }else{ return{ ...state} }
        case UPDATE_BLOG:                         if(action.payload.success === true){ return{ ...state, updatedBlog: action.payload.datax} }else{  return{ ...state} }
        
        case ALL_LIST:                            if(action.payload.success === true){ return{ ...state, stateList: action.payload.state, cityList: action.payload.city, sightList: action.payload.sight} }else{ return{ ...state} }
        case FETCH_CONTACT_FORM:                  if(action.payload.success === true){ return{ ...state, contactForm: action.payload.datax } }else{ return{ ...state} }
        
        case ITEM_ADDED:                          return{ ...state, itemsInCart: action.payload }
        
        case FETCH_USER:                          if(action.payload.success === true){ return{ ...state, user: action.payload.user, isAuthenticated: true }}else{ return{ ...state} }
        case EXIT_USER:                           return{ ...state, isAuthenticated: false, user: [] }

        
        case NEW_USER:                            if(action.payload.success === true){ return{ ...state, user: action.payload.user, isAuthenticated: true }}else{ return{ ...state} }
        
        default:                                   return state
    }
}
// console.log('action.payload', action.payload)