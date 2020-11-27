import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import { ProductTab } from '../inc/parts/ProductTab'
import { Tomato } from '../inc/parts/Tomato'
import Swiper from '../inc/parts/swiper'
import { Testimonial } from '../inc/parts/Testimonial'


export class Home extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            // displayDown:        'display',
            // displayUp:          'hide',
            fruits:                [],
            vegetables:            [],
            bakery:                [],
            nonVeg:                []
        }
    }
    
    // howitWorks=()=>{
    //     console.log("1")
    //     this.setState({
    //         displayDown:        'hide',
    //         displayUp:          'display'
    //     })
    // }
    // howitWorksReverse=()=>{
    //     this.setState({
    //         displayDown:        'display',
    //         displayUp:          'hide',
    //     })
    // }

    componentDidMount(){
        axios.get('/api/v1/productList').then(res =>{
            this.setState({
                fruits:             res.data.products[0],
                vegetables:         res.data.products[1],
                nonVeg:             res.data.products[4],
            })
        }) 
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <>
                <section className="banner top">
                    <div className="container py-5">
                        <h2 className="text-white text-center my-5">Tomato Project</h2>
                        <div className="row">
                            <div className="col-sm-12 flex-v">
                                <div className="flex-he">
                                    <img src="/images/icons/customer.svg"/>
                                    <img src="/images/icons/transparent.svg"/>
                                    <img src="/images/icons/experience.svg"/>
                                    <img src="/images/icons/fresh.svg"/>
                                    <img src="/images/icons/health.svg"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <ProductTab /> */}
                <div className="container my-5">
                    { this.state.fruits.length>0 ? <Swiper data={this.state.fruits}/> : null }
                    { this.state.vegetables.length>0 ? <Swiper data={this.state.vegetables}/> : null }
                    { this.state.nonVeg.length>0 ? <Swiper data={this.state.nonVeg}/> : null }
                </div>
                <Tomato/>
                <Testimonial/>
                <div className="container-fluid my-5">
                    <div className="row multi-gd-img">
                        <div className="col-sm-6">
                            <Link to="/about-us"><img src="images/bot_1.jpg" alt=""/><h4>Who We Are</h4></Link>
                        </div>
                        <div className="col-sm-6">
                            <Link to="/contact-us"><img src="images/bot_2.jpg" alt=""/><h4>Why Organic</h4></Link>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home
