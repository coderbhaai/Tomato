import React, { Component } from 'react'
import { connect } from 'react-redux'
import { exitUser } from '../actions/userActions'
import { Link } from 'react-router-dom'
import { withRouter } from "react-router";

export class Header extends Component {
    constructor(props) {
        super(props)    
        this.state = {
             category:          'All',
             fruits:            [],
             veg:               [],
             nonVeg:            [],
             cart:              JSON.parse(localStorage.getItem('myCart')) || '',
             search:            '',
             prodCat:           [],
             isTop:             ''
        }
    }

    componentDidMount(){
        axios.get('/api/v1/headerList').then(res =>{
            this.setState({ 
                fruits:             res.data.products[0],
                veg:                res.data.products[1],
                nonVeg:               res.data.products[4]
            })
        })
        // axios.get('/api/v1/productCategory').then(response =>{ this.setState({ prodCat: response.data.datax }) })
        // window.scrollTo(0, 0)
        document.addEventListener('scroll', () => { if (window.scrollY < 10) { this.setState({ isTop: '' }) }else{ this.setState({ isTop: 'ban-fix' }) } })
    }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    
    logout = e =>{
        e.preventDefault()
        this.props.exitUser(this.state)
    }

    search=()=>{
        if(this.state.search){
            this.props.history.push("/product-category/"+this.state.category+"/"+ this.state.search)
        }
    }

    selectCategory=(e)=>{ this.setState({ category: e.target.innerText }) }

    render() {
        return (
            <header>    
                <nav className="navbar navbar-expand-lg navbar-light fixed-top navbar-expand-lg navbar-light navbar-fixed-top">
                    <Link to="/"><img className="logo" src="/images/logo.webp" alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li><a className="nav-link" href="/" >Home</a></li>
                            <li><a className="nav-link scroll" href="/about">About Us</a></li>
                            <li><a className="nav-link scroll" href="/shop">Shop</a></li>
                            <li className="dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Fruits</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item scroll nav-link" href="/product-category/fruits">All Fruits</a>
                                    {this.state.fruits.slice(0,8).map((i, index)=>( <a key={index} className="dropdown-item scroll nav-link" href={"/product/"+i.url}>{i.name}</a>))}
                                </div>
                            </li>
                            <li className="dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Veggies</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item scroll nav-link" href="/product-category/vegetables">All Vegetables</a>
                                    {this.state.veg.slice(0,8).map((i, index)=>( <a key={index} className="dropdown-item scroll nav-link" href={"/product/"+i.url}>{i.name}</a>))}
                                </div>
                            </li>
                            <li className="dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Non veg</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item scroll nav-link" href="/product-category/non-veg">All Non veg</a>
                                    {this.state.nonVeg.slice(0,8).map((i, index)=>( <a key={index} className="dropdown-item scroll nav-link" href={"/product/"+i.url}>{i.name}</a>))}
                                </div>
                            </li>
                            { this.props.user ?
                                <>
                                    { this.props.user.role =='Admin' ?
                                    <>
                                    <li className="dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin</a>
                                        <div className="dropdown-menu lastDrop" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item scroll nav-link" href="/admin">Admin Panel</a>
                                            <a className="dropdown-item scroll nav-link" onClick={this.logout}>Log Out</a>
                                        </div>
                                    </li>
                                    </>
                                    : this.props.user.role =='User' ?
                                        <li className="dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.user.name}</a>
                                            <div className="dropdown-menu lastDrop" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item scroll nav-link" href="/shop">Shop</a>
                                                <a className="dropdown-item scroll nav-link" href="/cart">Cart</a>
                                                <a className="dropdown-item scroll nav-link" href="/order">My Orders</a>
                                                <a className="dropdown-item scroll nav-link" onClick={this.logout}>Log Out</a>
                                            </div>
                                        </li>
                                    : 
                                        <li className="dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Join us</a>
                                            <div className="dropdown-menu lastDrop" aria-labelledby="navbarDropdown">
                                                <a className="dropdown-item scroll nav-link" href="/register">Register</a>
                                                <a className="dropdown-item scroll nav-link" href="/login">Login</a>
                                                <a className="dropdown-item scroll nav-link" href="/contact">Contact Us</a>
                                            </div>
                                        </li>
                                    }
                                </>
                                : <li className="nav-item trip"><Link className="nav-link" to="/login">Sign In </Link></li>
                            }
                            <li><a className="nav-link scroll" href="/cart">Cart</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = state =>({
    user:               state.admin.user,
    itemsInCart:        state.admin.itemsInCart
})

const mapDispatchToProps = dispatch => ({
    exitUser:           () => dispatch(exitUser()),
})
export default withRouter( connect( mapStateToProps, mapDispatchToProps)(Header))