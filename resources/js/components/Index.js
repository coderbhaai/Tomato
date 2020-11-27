import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'
import { persistor, store } from './inc/store'

import Register from './inc/auth/Register' 
import Login from './inc/auth/Login'
import ForgotPassword from './inc/auth/ForgotPassword'
import ResetPassword from './inc/auth/ResetPassword'

import Header from './inc/parts/Header'
import Footer from './inc/parts/Footer'

import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Order from './pages/Order'

import Blog from './inc/blog/Blog'
import Single from './inc/blog/Single'

import AdminMeta from './inc/admin/AdminMeta'
import AdminBlogs from './inc/admin/AdminBlogs'
import AdminComments from './inc/admin/AdminComments'
import AdminBlogMeta from './inc/admin/AdminBlogMeta'
import AdminBasics from './inc/admin/AdminBasics'
import AdminProducts from './inc/admin/AdminProducts'
import AdminCoupon from './inc/admin/AdminCoupon'
import AdminShipping from './inc/admin/AdminShipping'
import AdminOrders from './inc/admin/AdminOrders'
import AddProduct from './inc/admin/AddProduct'
import EditProduct from './inc/admin/EditProduct'
import ContactForm from './inc/admin/ContactForm'

// import RequireAuth from './inc/RequireAuth'
import RequireAdmin from './inc/RequireAdmin'

class Index extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router>
                        <Header/>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/contact" component={Contact} />

                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/forgotPassword" component={ForgotPassword} /> 
                            <Route exact path="/resetPassword/:token" component={ResetPassword} />

                            <Route exact path="/about-us" component={About} />
                            <Route exact path="/product/:url" component={Product} />
                            <Route exact path="/shop" component={Shop} />
                            <Route exact path="/cart" component={Cart} />
                            <Route exact path="/order" component={Order} />
                            <Route exact path="/products/:url" component={Shop}/>
                            <Route exact path="/product-category/:category" component={Shop}/>

                            <Route exact path='/blog' component={Blog} />
                            <Route exact path='/blog/:url' component={Single} />
                            <Route exact path='/category/:cat' component={Blog} />
                            <Route exact path='/tag/:tag' component={Blog} />
                            <Route exact path='/search/:search' component={Blog}/>                            
                            
                            <Route exact path='/admin' component={ RequireAdmin(AdminBlogs)}/>
                            <Route exact path="/adminMeta" component={ RequireAdmin(AdminMeta)}/>
                            <Route exact path="/adminComments" component={ RequireAdmin(AdminComments)}/>
                            <Route exact path="/adminBlogs" component={ RequireAdmin(AdminBlogs)}/>
                            <Route exact path="/adminBlogMeta" component={ RequireAdmin(AdminBlogMeta)}/>
                            <Route exact path="/adminBasics" component={ RequireAdmin(AdminBasics)}/>
                            <Route exact path="/adminProducts" component={ RequireAdmin(AdminProducts)}/>
                            <Route exact path="/adminOrders" component={ RequireAdmin(AdminOrders)}/>
                            <Route exact path="/adminCoupon" component={ RequireAdmin(AdminCoupon)}/>
                            <Route exact path="/adminShipping" component={ RequireAdmin(AdminShipping)}/>
                            <Route exact path="/addProduct" component={ RequireAdmin(AddProduct)}/>
                            <Route exact path="/editProduct/:url" component={ RequireAdmin(EditProduct)}/>
                            
                            <Route exact path="/adminLeads" component={ContactForm} />

                        </Switch>
                        <Footer/>
                    </Router>
                </PersistGate>
            </Provider>
        )
    }
}
if (document.getElementById('root')) { ReactDOM.render(<Index />, document.getElementById('root')); }