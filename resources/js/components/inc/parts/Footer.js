import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component'
import swal from 'sweetalert'

export class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prodCat:           []
        }
    }

    componentDidMount(){
        axios.get('/api/v1/productCategory').then(response =>{ this.setState({ prodCat: response.data.data }) })
        if(typeof(Storage) !== "undefined" && localStorage.getItem('message') ){ 
            swal({ title:       localStorage.getItem('message'), 
            timer:              4000 
        })
            setTimeout(function() { localStorage.removeItem('message') }, 4000)
        }
    }
    
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <h4>Tomato Project </h4>
                            <ul>
                                <li><Link to="">About Us</Link></li>
                                <li><Link to="">Shopping Policy</Link></li>
                                <li><Link to="">Contact Us</Link></li>
                                <li><Link to="">Cancellation Policy</Link></li>
                                <li><Link to="">Return Policy</Link></li>
                                <li><Link to="">Privacy Policy</Link></li>
                                <li><Link to="">FAQs</Link></li>
                                <li><Link to="">T&amp;C</Link></li>
                            </ul>
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
                        <div className="col-sm-3">
                            <h4>Product <span>Categories</span> </h4>
                            <ul>{ this.state.prodCat.map((i, index) => (  <li key={index}><Link to={"/product-category/"+i.url}>{i.name}</Link></li> )) }</ul>
                        </div>
                        <div className="col-sm-3">
                            <h4>Store <span>Information</span></h4>
                            <div className="address">
                                <i className="fa fa-phone" aria-hidden="true"></i>
                                <div className="text">
                                    <h6>Phone Number</h6>
                                    <p>+91 95994 40161</p>
                                </div>
                            </div>
                            <div className="address">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                <div className="text">
                                    <h6>Email Address</h6>
                                    <p>Email :<a href="mailto:#"> TP@tomatoproject.com</a></p>
                                </div>
                            </div>
                            <div className="address">
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                                <div className="text">
                                    <h6>Location</h6>
                                    <p>FF12, Augusta Point, Sector 53</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 sign-gd flickr-post">
                            <h4>Top <span>Products</span></h4>
                            <ul>
                                <li><a href="#"><img src="/images/t1.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t2.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t3.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t4.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t5.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t6.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t7.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t8.jpg" alt=" " className="img-responsive" /></a></li>
                                <li><a href="#"><img src="/images/t9.jpg" alt=" " className="img-responsive" /></a></li>
                            </ul>
                        </div>
                    </div>
                    <p className="copy-right">© 2019 | Designed &amp; Developed by <a href="#"> Navneet Khare</a></p>
                </div>
            </div>
        )
    }
}

export default Footer
