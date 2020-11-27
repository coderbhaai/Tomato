import React, { Component } from 'react'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component'

export class Tomato extends Component {    
    render() {
        return (
            <div className="container tomato py-5">
                <div className="row py-3">
                    <div className="col-sm-6">
                        <h2>Call to order</h2>
                        <p>What's fresh, what's good, what makes your basket, perfect. Our team knows best. Call us for assisted ordering !</p>
                        <p>011-123456789</p>
                    </div>
                    <div className="col-sm-6 text-center">
                        <h2>Text over call?</h2>
                        <p>We got you. WhatsApp your orders</p>
                        <img className="orderImg" src="/images/icons/order.svg" alt=""/>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-sm-6">
                        <h2>Contact</h2>
                        <p>A1/212, Sushant Lok, sector-55, Gurgaon</p>
                        <p>tomato.project.in@gmail.com</p>
                        <p>call to <strong>9667675052</strong></p>
                        <div className="social">
                            <h2><a href="#">Follow Us</a></h2>
                            <div className="middle">
                                <a href="#" className="btn" target="_blank"><LazyLoadImage src="/images/icons/facebook-white.svg" alt="Study Spectrum Facebook Page"/></a>
                                <a href="#" className="btn" target="_blank"><LazyLoadImage src="/images/icons/instagram-white.svg" alt="Study Spectrum Instagram Page"/></a>
                                <a href="#" className="btn" target="_blank"><LazyLoadImage src="/images/icons/linkedin-white.svg" alt="Study Spectrum Linkedin Page"/></a>
                                <a href="#" className="btn" target="_blank"><LazyLoadImage src="/images/icons/youtube-white.svg" alt="Study Spectrum Youtube Page"/></a>
                            </div> 
                        </div>
                    </div>
                    <div className="col-sm-6 text-center">
                        <img className="orderImg" src="/images/icons/bigLogo.jpg" alt=""/>
                    </div>
                </div>
                <div className="row py-3">
                    <div className="col-sm-12 iframe">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.184843695756!2d77.09810891542638!3d28.443843799345874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18b30f544fe7%3A0xaeb303a27a887ffd!2sAugusta+Point!5e0!3m2!1sen!2sin!4v1551173788796" frameBorder="0" className="map" allowFullScreen=""></iframe>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tomato