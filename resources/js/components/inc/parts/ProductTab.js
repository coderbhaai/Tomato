import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { itemAdded } from '../actions/adminActions'
import { connect } from 'react-redux'

export class ProductTab extends Component {
    constructor(props) {
        super(props)
        this.selectedDiv = React.createRef();
        this.state = {
            active:             'veg',
            fruits:             [],
            veg:                [],
            wholefoods:         [],
            condiments:         [],
            grains:             [],
            japanese:           [],
            nonVeg:             [],
            kitchen:            [],
            cart:               JSON.parse(localStorage.getItem('myCart')) || []
        }
    }
    componentDidMount(){
        axios.get('/api/v1/productList')
        .then(response =>{
            this.setState({
                // fruits:         response.data.fruits,
                veg:            response.data.products[1],
                // wholefoods:     response.data.wholefoods,
                // condiments:     response.data.condiments,
                // grains:         response.data.grains,
                // japanese:       response.data.japanese,
                // nonVeg:         response.data.nonVeg,
                // kitchen:        response.data.kitchen 
            })
        })
    }

    setActive=(e)=>{ this.setState({ active: e.target.getAttribute('name') }) }

    addToCart=(i)=>{
        const found = this.state.cart.some(el => el.id === i.id);
        if (!found){
            this.setState({ cart: [...this.state.cart, i] }
                ,()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart) )
                // ,()=>   console.log('this.state.cart', this.state.cart)
            )
        }else{
            this.state.cart.forEach((o, index)=>{
                if( o.id === parseInt(i.id) ){
                    this.state.cart[index].unit = this.state.cart[index].unit + 1;
                    localStorage.setItem('myCart', JSON.stringify(this.state.cart))
                    this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart) )
                    )
                }
            }
            )
        }
        this.render()
        // console.log('this.state.cart', this.state.cart)
    }

    removeFromCart=(i)=>{
        const found = this.state.cart.some(el => el.id === i.id);
        if (found){
            this.state.cart.forEach((o, index)=>{
                if( o.id === parseInt(i.id) ){
                    if(o.unit>1){
                        this.state.cart[index].unit = this.state.cart[index].unit - 1;
                        localStorage.setItem('myCart', JSON.stringify(this.state.cart) );
                        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart) ))
                    }else{
                        this.state.cart.splice(index, 1)
                        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart) ))
                        // console.log('object')
                    }
                }
            })
        }
        // console.log('this.state.cart', this.state.cart)

    }
    
    render() {
        console.log('this.state.cart', this.state.cart)
        // const imgPath = "/tomato/storage/app/public/product/"
        const imgPath = "/storage/product/"
        return (
            <section className="py-5">
                <h2 className="heading">Product Categories</h2>
                <div className="tabs">
                    <ul className="nav">
                        <li><a data-toggle="pill" name="veg" onClick={(e)=>this.setActive(e)} className={classnames({'active': 'active'})}>Vegtables</a></li>
                        <li><a data-toggle="pill" name="fruits" onClick={(e)=>this.setActive(e)}>Fruits</a></li>
                        <li><a data-toggle="pill" name="wholeFood" onClick={(e)=>this.setActive(e)}>Whole Food</a></li>
                        <li><a data-toggle="pill" name="grains" onClick={(e)=>this.setActive(e)}>Grains</a></li>
                        <li><a data-toggle="pill" name="japanese" onClick={(e)=>this.setActive(e)}>Japanese Veggies</a></li>
                        <li><a data-toggle="pill" name="nonVeg" onClick={(e)=>this.setActive(e)}>Non Veg</a></li>
                    </ul>
                </div>
                <div className="container products">
                    <div className="tab-content">
                        <div className={classnames({'tab-pane':true, 'fade': true, 'show': true, 'active': this.state.active === "veg" })} >
                            <div className="tab-product row" ref={this.selectedDiv}>
                                { this.state.veg.map((i, index) => (
                                    <div className="col-sm-3 " key={index}>
                                        <div className="card">
                                            <Link to={"/product/" + i.url}>
                                                <div className="img">
                                                    <img src={imgPath + JSON.parse(i.images)[0]}/>
                                                    {/* { this.state.cart.some(el => el.id === i.id) ?
                                                        <>
                                                            { this.state.cart.map((j, index) => ( 
                                                                <div key={index}>{ j.id == i.id ? <div className="itemAdded" > <h3>{j.unit}</h3><p>Added to Cart</p> </div> : null} </div>
                                                            ))}
                                                        </>: null} */}
                                                </div>
                                            </Link>
                                            <div className="cartBtn">
                                                <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                                <div>
                                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // <div className="col-sm-3 product-men" key={index}>
                                    //     <div className="men-thumb-item">
                                    //         <LazyLoadImage src={imgPath + i.images[0]} alt="" className="pro-image-front"/>
                                    //         <LazyLoadImage src={imgPath + i.images[0]} alt="" className="pro-image-back"/>
                                    //         <div className="men-cart-pro">
                                    //             <div className="inner-men-cart-pro">
                                    //                 <Link to={"/product/"+i.url} className="link-product-add-cart">Quick View</Link>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    //     <div className="item-info-product ">
                                    //         <h4><Link to={"/product/"+i.url}>{i.name}</Link></h4>
                                    //         <span className="item_price">&#8377;{i.price[0]}</span>							
                                    //     </div>
                                    // </div>
                                )) }
                            </div>
                        </div>
                        <div className={classnames({'tab-pane':true, 'fade': true, 'show': true, 'active': this.state.active === "fruits" })} >
                            <div className="tab-product row" ref={this.selectedDiv}>
                                { this.state.fruits.map((i, index) => ( 
                                    <div className="col-sm-3 " key={index}>
                                        <div className="card">
                                            <Link to={"/product/" + i.url}>
                                                <div className="img">
                                                    <img src={imgPath + JSON.parse( i.images)[0]}/>
                                                    { this.state.cart.some(el => el.id === i.id) ?
                                                        <>
                                                            { this.state.cart.map((j, index) => ( 
                                                                <div key={index}>{ j.id == i.id ? <div className="itemAdded" > <h3>{j.unit}</h3><p>Added to Cart</p> </div> : null} </div>
                                                            ))}
                                                        </>: null}
                                                </div>
                                            </Link>
                                            <div className="cartBtn">
                                                <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                                <div>
                                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    // <div className="col-sm-3 product-men" key={index}> 
                                    //     <div className="men-thumb-item">
                                    //         <LazyLoadImage src={imgPath + i.images[0]} alt="" className="pro-image-front"/>
                                    //         <LazyLoadImage src={imgPath + i.images[0]} alt="" className="pro-image-back"/>
                                    //         <div className="men-cart-pro">
                                    //             <div className="inner-men-cart-pro">
                                    //                 <Link to={"/product/"+i.url} className="link-product-add-cart">Quick View</Link>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    //     <div className="item-info-product ">
                                    //         <h4><Link to={"/product/"+i.url}>{i.name}</Link></h4>
                                    //         <span className="item_price">&#8377;{i.price[0]}</span>							
                                    //     </div>
                                    // </div>
                                )) }
                            </div>
                        </div>
                        <div className={classnames({'tab-pane':true, 'fade': true, 'show': true, 'active': this.state.active === "wholeFood" })} >
                            <div className="tab-product row" ref={this.selectedDiv}>
                                {this.state.wholefoods.map((i, index) => ( 
                                    <div className="col-sm-3 " key={index}>
                                        <div className="card">
                                            <Link to={"/product/" + i.url}>
                                                <div className="img">
                                                    <img src={imgPath + i.images[0]}/>
                                                    { this.state.cart.some(el => el.id === i.id) ?
                                                        <>
                                                            { this.state.cart.map((j, index) => ( 
                                                                <div key={index}>{ j.id == i.id ? <div className="itemAdded" > <h3>{j.unit}</h3><p>Added to Cart</p> </div> : null} </div>
                                                            ))}
                                                        </>: null}
                                                </div>
                                            </Link>
                                            <div className="cartBtn">
                                                <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                                <div>
                                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classnames({'tab-pane':true, 'fade': true, 'show': true, 'active': this.state.active === "grains" })} >
                            <div className="tab-product row" ref={this.selectedDiv}>
                                {this.state.grains.map((i, index) => ( 
                                    <div className="col-sm-3 " key={index}>
                                        <div className="card">
                                            <Link to={"/product/" + i.url}>
                                                <div className="img">
                                                    <img src={imgPath + i.images[0]}/>
                                                    { this.state.cart.some(el => el.id === i.id) ?
                                                        <>
                                                            { this.state.cart.map((j, index) => ( 
                                                                <div key={index}>{ j.id == i.id ? <div className="itemAdded" > <h3>{j.unit}</h3><p>Added to Cart</p> </div> : null} </div>
                                                            ))}
                                                        </>: null}
                                                </div>
                                            </Link>
                                            <div className="cartBtn">
                                                <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                                <div>
                                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classnames({'tab-pane':true, 'fade': true, 'show': true, 'active': this.state.active === "japanese" })} >
                            <div className="tab-product row" ref={this.selectedDiv}>
                                { this.state.japanese.map((i, index) => ( 
                                    <div className="col-sm-3 " key={index}>
                                        <div className="card">
                                            <Link to={"/product/" + i.url}>
                                                <div className="img">
                                                    <img src={imgPath + i.images[0]}/>
                                                    { this.state.cart.some(el => el.id === i.id) ?
                                                        <>
                                                            { this.state.cart.map((j, index) => ( 
                                                                <div key={index}>{ j.id == i.id ? <div className="itemAdded" > <h3>{j.unit}</h3><p>Added to Cart</p> </div> : null} </div>
                                                            ))}
                                                        </>: null}
                                                </div>
                                            </Link>
                                            <div className="cartBtn">
                                                <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                                <div>
                                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) }
                            </div>
                        </div>
                        <div className={classnames({'tab-pane':true, 'fade': true, 'show': true, 'active': this.state.active === "nonVeg" })} >
                            <div className="tab-product row" ref={this.selectedDiv}>
                                { this.state.nonVeg.map((i, index) => ( 
                                    <div className="col-sm-3 " key={index}>
                                        <div className="card">
                                            <Link to={"/product/" + i.url}>
                                                <div className="img">
                                                    <img src={imgPath + i.images[0]}/>
                                                    { this.state.cart.some(el => el.id === i.id) ?
                                                        <>
                                                            { this.state.cart.map((j, index) => ( 
                                                                <div key={index}>{ j.id == i.id ? <div className="itemAdded" > <h3>{j.unit}</h3><p>Added to Cart</p> </div> : null} </div>
                                                            ))}
                                                        </>: null}
                                                </div>
                                            </Link>
                                            <div className="cartBtn">
                                                <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                                <div>
                                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/>
                                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                    <div className="myBtn">
                        <button><Link to="/shop">Show More</Link></button>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state =>({
})

const mapDispatchToProps = dispatch => ({
    itemAdded:            datafile=> dispatch(itemAdded(datafile))
})

 export default connect( mapStateToProps, mapDispatchToProps)(ProductTab)