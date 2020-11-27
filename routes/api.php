<?php

use Illuminate\Http\Request;


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['jwt.auth','api-header']], function (){
  
    // all routes to protected resources are registered here  
    Route::get('users/list', function(){
        $users = App\User::all();
        
        $response = ['success'=>true, 'data'=>$users]; 
        return response()->json($response, 201);
    });
});

Route::group(['middleware' => 'api-header'], function (){
    Route::post('/v1/register', 'UserController@register');
    Route::post('/v1/login', 'UserController@login');
    Route::post('/v1/forgotPassword', 'UserController@forgotPassword');
    Route::post('/v1/resetPassword', 'UserController@resetPassword');
});



Route::get('/v1/productList', 'AdminController@productList');


Route::get('/v1/fetchProducts/{url}', 'AdminController@fetchProducts');
Route::get('/v1/fetchCatItems/{item}', 'AdminController@fetchCatItems');

Route::get('/v1/fetchProduct/{url}', 'AdminController@fetchProduct');
// Route::get('/v1/cartItems/{items}', 'AdminController@cartItems');

Route::post('/v1/postOrder', 'AdminController@postOrder');
Route::post('/v1/submitPayment', 'AdminController@submitPayment');
Route::get('/v1/getOrders/{id}', 'AdminController@getOrders');


Route::get('/v1/headerList', 'AdminController@headerList');
Route::get('/v1/fetchMeta/{url}', 'AdminController@fetchMeta');


// User Routes
    Route::post('/v1/contactForm', 'AdminController@contactForm');
    
    Route::get('/v1/fetchBlog/{url}/{type}', 'AdminController@fetchBlog');
    Route::get('/v1/blogListCategory/{cat}', 'AdminController@blogListCategory');
    Route::get('/v1/blogListTag/{tag}', 'AdminController@blogListTag');
    Route::get('/v1/blogListSearch/{search}', 'AdminController@blogListSearch');
    Route::get('/v1/blogSingle/{url}', 'AdminController@blogSingle');


// User Routes

// Admin Routes
    Route::get('/v1/fetchContactForm', 'AdminController@fetchContactForm');

    Route::get('/v1/getMeta', 'AdminController@getMeta');
    Route::post('/v1/addMeta', 'AdminController@addMeta');
    Route::post('/v1/updateMeta', 'AdminController@updateMeta');
    
    Route::get('/v1/fetchBasic', 'AdminController@fetchBasic');
    Route::post('/v1/addBasic', 'AdminController@addBasic');
    Route::post('/v1/updateBasic', 'AdminController@updateBasic');

    Route::post('/v1/addBlogMeta', 'AdminController@addBlogMeta');
    Route::get('/v1/fetchBlogMetaList', 'AdminController@fetchBlogMetaList');
    Route::post('/v1/updateBlogMeta', 'AdminController@updateBlogMeta');

    Route::get('/v1/productCategory', 'AdminController@productCategory');
    Route::get('/v1/fetchAdminProducts', 'AdminController@fetchAdminProducts');
    Route::post('/v1/addProduct', 'AdminController@addProduct');
    Route::post('/v1/updateProduct', 'AdminController@updateProduct');

    Route::get('/v1/blogMetaData', 'AdminController@blogMetaData');
    Route::get('/v1/blogList', 'AdminController@blogList');
    Route::post('/v1/addBlog', 'AdminController@addBlog');
    Route::post('/v1/updateBlog', 'AdminController@updateBlog');

    Route::post('/v1/addComment', 'AdminController@addComment');
    Route::get('/v1/fetchComments', 'AdminController@fetchComments');
    Route::post('/v1/updateComment', 'AdminController@updateComment');
    
    Route::get('/v1/getAdminOrders', 'AdminController@getAdminOrders');
    Route::post('/v1/updateOrder', 'AdminController@updateOrder');
    
    Route::post('/v1/addCoupon', 'AdminController@addCoupon');
    Route::get('/v1/getCoupon', 'AdminController@getCoupon');
    Route::post('/v1/updateCoupon', 'AdminController@updateCoupon');
    Route::get('/v1/checkCoupon/{coupon}', 'AdminController@checkCoupon');

    Route::post('/v1/addShipping', 'AdminController@addShipping');
    Route::get('/v1/getShipping', 'AdminController@getShipping');
    Route::post('/v1/updateShipping', 'AdminController@updateShipping');


// Admin Routes