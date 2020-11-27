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
             milk:              [],
             dryFruit:          [],
             cart:              JSON.parse(localStorage.getItem('myCart')) || '',
             search:            '',
             prodCat:           []
        }
    }

    componentDidMount(){
        axios.get('/api/v1/productList').then(response =>{ 
            this.setState({ 
                fruits: response.data.fruits,
                veg: response.data.veg,
                milk: response.data.milk,
                dryFruit: response.data.dryFruit,
            })
        })
        axios.get('/api/v1/productCategory').then(response =>{ this.setState({ prodCat: response.data.datax }) })
        window.scrollTo(0, 0)
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    
    logout = e =>{
        console.log("I ran")
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
            <section className="nav">
                <div className="topbar">
                    <div className="logo">
                        <Link to="/"><img src="/images/logo.webp" alt=""/></Link>
                    </div>
                    <div className="navitems">
                        <div className="row1">
                            <div className="searchform">
                                <div className="btn-group">
                                    <button className="btn dropdown-toggle searchify left-btn" data-toggle="dropdown">{this.state.category} <b className="caret"></b> </button>
                                    <ul className="dropdown-menu nav-search">
                                        <li value="All" onClick={(e)=>this.selectCategory(e)}>All</li>
                                        {/* { this.state.prodCat.map((i, index) => (  <li key={index} value="i.url" onClick={(e)=>this.selectCategory(e)}>{i.name}</li> )) } */}
                                    </ul>
                                    <input type="text" className="nav-input" placeholder="Enter search terms" name="search" onChange={this.onChange}/>
                                    <button className="btn search-btn" onClick={this.search}><i className="fa fa-search" aria-hidden="true"></i> Search</button>
                                </div>
                            </div>
                            {/* <div className="sign">
                                    <button className="btn dropdown-toggle searchify" data-toggle="modal" data-target="#myModal">Register </button>
                                    <button className="btn dropdown-toggle searchify" data-toggle="modal" data-target="#myModal2">Sign In </button>
                            </div> */}
                            <div className="cart flex-h">
                                {this.props.itemsInCart ?  <span className="text-white">{this.props.itemsInCart}</span> : <span className="text-white">{this.state.cart.length}</span> }
                                <Link to="/cart"><img src="/images/icons/cart.svg"/></Link>
                            </div>                    
                        </div>
                        <div className="row2">
                            <div className="container-fluid">
                                <div className="navbar-header flex-h">
                                    {this.props.itemsInCart ?  <span className="text-white">{this.props.itemsInCart}</span> : <span className="text-white">{this.state.cart.length}</span> }
                                    <Link to="/cart"><img src="/images/icons/cart.svg"/></Link>
                                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-expanded="false"><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
                                </div>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item"><Link className="nav-link" to="/">Home </Link></li>
                                        <li className="nav-item"><a className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-expanded="false">Vegetables <span className="caret"></span></a>
                                            <ul className="dropdown-menu columns-3">
                                                <div className="row">
                                                    <div className="col-sm-2 flex-h channel">
                                                        <img src="/images/top1.jpg" alt=" "/>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        {/* <ul>{ this.state.veg.slice(0,4).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul> */}
                                                    </div>
                                                    <div className="col-sm-3">
                                                        {/* <ul>{ this.state.veg.slice(4,8).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul> */}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        {/* <ul>{ this.state.veg.slice(8,12).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul> */}
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item"><a className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-expanded="false">Fruits <span className="caret"></span></a>
                                            <ul className="dropdown-menu columns-3">
                                                <div className="row">
                                                    <div className="col-sm-2 flex-h channel">
                                                        <img src="/images/top1.jpg" alt=" "/>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        {/* <ul>{ this.state.fruits.slice(0,4).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul> */}
                                                    </div>
                                                    <div className="col-sm-3">
                                                        {/* <ul>{ this.state.fruits.slice(4,8).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul> */}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        {/* <ul>{ this.state.fruits.slice(8,12).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul> */}
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        {/* <li className="nav-item"><a className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-expanded="false">Milk  <span className="caret"></span></a>
                                            <ul className="dropdown-menu columns-3">
                                                <div className="row">
                                                    <div className="col-sm-2 flex-h channel">
                                                        <img src="/images/top1.jpg" alt=" "/>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <ul>{ this.state.milk.slice(0,4).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <ul>{ this.state.milk.slice(4,8).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <ul>{ this.state.milk.slice(8,12).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item"><a className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-expanded="false">Dry Fruit <span className="caret"></span></a>
                                            <ul className="dropdown-menu columns-3">
                                                <div className="row">
                                                    <div className="col-sm-2 flex-h channel">
                                                        <img src="/images/top1.jpg" alt=" "/>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <ul>{ this.state.dryFruit.slice(0,4).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <ul>{ this.state.dryFruit.slice(4,8).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <ul>{ this.state.dryFruit.slice(8,12).map((i, index) => ( <li className="nav-item" key={index}><Link className="nav-link" to={"/product/"+i.url}>{i.name} </Link></li> )) }</ul>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li> */}
                                        <li className="nav-item"><Link className="nav-link" to="/shop">Shop </Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/blog">Blog </Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/our-farmers">Our Farmers </Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/contact-us">Contact Us </Link></li>
                                        <li className="nav-item"><Link className="nav-link" to="/about-us">About Us</Link></li>
                                        { this.props.user ?
                                            <>
                                                { this.props.user.role =='Admin' ?
                                                <>
                                                    <li className="nav-item trip"><Link className="nav-link" to="/admin">Admin </Link></li>
                                                    <li className="nav-item trip"><p className="nav-link" onClick={this.logout}>Log Out </p></li>
                                                </>
                                                : this.props.user.role =='user' ?
                                                    <li className="nav-item trip" onClick={this.logout}><p className="nav-link">Log Out - {this.props.user.name}</p></li>
                                                : <li className="nav-item trip"><Link className="nav-link" to="/login">Sign In </Link></li>
                                                }
                                            </>
                                            : <li className="nav-item trip"><Link className="nav-link" to="/login">Sign In </Link></li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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