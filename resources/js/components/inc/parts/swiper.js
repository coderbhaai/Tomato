import React, { Component } from 'react'
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom'

export class Fruits extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            cart:               JSON.parse(localStorage.getItem('myCart')) || []
        }
    }

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
        // const imgPath = "/tomato/storage/app/public/product/"
        const imgPath = "/storage/product/"

        const params = {
            slidesPerView: 6,
            spaceBetween: 5,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            loop: true,
            // autoplay: {
            //     delay: 3000
            // },
            breakpoints: {
                // 640: {
                //   slidesPerView: 2,
                //   spaceBetween: 20,
                // },
                // 768: {
                //   slidesPerView: 4,
                //   spaceBetween: 40,
                // },
                // 1400: {
                //   slidesPerView: 6,
                //   spaceBetween: 5,
                // },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        }
        return (
            <div className="swiperList">
                { !this.props.related ?
                    <div className="prod myBtn">
                        <h3>{this.props.data[0].catName}</h3>
                        <button><Link to={"/product-category/"+this.props.data[0].catUrl}>Check All</Link></button>
                    </div>
                :null }
                <Swiper {...params}>
                    { this.props.data.map((i, index)=>(
                        <div key={index} className="card">
                            <Link to={"/product/"+i.url}><img className="productImage" src={imgPath+JSON.parse(i.images)[0]}/></Link>
                            <div className="cartBtn">
                                <Link to={"/product/"+i.url}><h2>{i.name}</h2></Link>
                                <div>
                                    <img src="/images/icons/minus.svg" alt="" onClick={(i)=>this.removeFromCart()}/>
                                    <img src="/images/icons/plus.svg" alt="" onClick={(i)=>this.addToCart()}/>
                                </div>
                            </div>
                        </div>
                    ))}
                </Swiper>
            </div>
        )
    }
}

export default Fruits
