import React, { Component } from 'react'

export class extra extends Component {
    render() {
        return (
            <>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" data-interval="50000" >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <LazyLoadImage src="images/banner1.jpg" alt="First slide" className="web"/>
                            <LazyLoadImage src="images/banner1-m.jpg" alt="First slide" className="mobile"/>
                            <div className="carousel-caption">
                                <h1>Buy fresh <span>Fruits &amp; Vegtables</span></h1>
                                <p>We provide fresh fruits and vegetables</p>
                                    <a className="hvr-outline-out button2" data-toggle="modal" data-target="#show">Join Now </a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <LazyLoadImage src="images/banner2.jpg" alt="Second slide" className="web"/>
                            <LazyLoadImage src="images/banner-2-m.jpg" alt="Second slide" className="mobile"/>
                            <div className="carousel-caption">
                                <h3>Best priced <span>Food products</span></h3>
                                <p>We provide fresh fruits and vegetables</p>
                                <a className="hvr-outline-out button2" data-toggle="modal" data-target="#show">Join Now </a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <LazyLoadImage src="images/banner3.jpg" alt="Third slide" className="web"/>
                            <LazyLoadImage src="images/banner3-m.jpg" alt="Third slide" className="mobile"/>
                            <div className="carousel-caption">
                                <h3>Experience top <span> fruits and vegetables</span></h3>
                                <p>We provide fresh fruits and vegetables</p>
                                <a className="hvr-outline-out button2" data-toggle="modal" data-target="#show">Join Now </a>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="sr-only">Previous</span></a>
                    <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="sr-only">Next</span></a>
                </div>
                <section className="howItWorks">
                    <h3>How it <span>Works</span></h3>
                    <p>Are you new here?</p>
                    <img className={"down check "+this.state.displayDown} src="/images/icons/downArrow-red.svg" onClick={this.howitWorks}/>
                    <div className="container">
                        <div className={"row my-5 "+ this.state.displayUp}>
                            <div className="col-sm-4">
                                <img src="/images/icons/profile-red.svg"/>
                                <p>Some text</p>
                            </div>
                            <div className="col-sm-4">
                                <img src="/images/icons/profile-red.svg"/>
                                <p>Some text</p>
                            </div>
                            <div className="col-sm-4">
                                <img src="/images/icons/profile-red.svg"/>
                                <p>Some text</p>
                            </div>
                        </div>
                        <img className={"down check "+this.state.displayUp} src="/images/icons/upArrow-red.svg" onClick={this.howitWorksReverse}/>
                    </div>
                </section>
                <section className="news">
                    <button>News</button>
                    <ul>
                        <li><a href="">Lorem ipsum text will go here</a></li>
                        <li><a href="">Lorem ipsum text will go here</a></li>
                        <li><a href="">Lorem ipsum text will go here</a></li>
                    </ul>
                </section>
                <div className="container">
                    <div className="row grid">
                        <div className="col-sm-6">
                            <figure className="effect-roxy">
                                <img src="images/bottom1.jpg" alt=" " className="img-responsive" />
                                <figcaption>
                                    <h3><span>H</span>ot Deal</h3>
                                    <p>of Week</p>
                                </figcaption>			
                            </figure>
                        </div>
                        <div className="col-sm-6">
                            <figure className="effect-roxy">
                                <img src="images/bottom1.jpg" alt=" " className="img-responsive" />
                                <figcaption>
                                    <h3><span>H</span>ot Deal</h3>
                                    <p>of Month</p>
                                </figcaption>			
                            </figure>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                
                <div className="parallax mb-3">
                    <div className="container">
                        <h6>We Offer Flat <span>40%</span> Discount</h6>
                        <a className="hvr-outline-out button2" href="#">Shop Now </a>
                    </div>
                </div>
                {/* <div className="coupons container-fluid">
                    <div className="row">
                        <div className="col-sm-3 flex-h">
                            <div className="c-icon hvr-radial-out">
                                <i className="fa fa-truck" aria-hidden="true"></i>
                            </div>
                            <div className="c-text">
                                <h3>FREE SHIPPING</h3>
                                <p>Min Order Criteria</p>
                            </div>
                        </div>
                        <div className="col-sm-3 flex-h">
                            <div className="c-icon hvr-radial-out">
                                <i className="fa fa-headphones" aria-hidden="true"></i>
                            </div>
                            <div className="c-text">
                                <h3>24/7 SUPPORT</h3>
                                <p>For all the unpredictability in India</p>
                            </div>
                        </div>
                        <div className="col-sm-3 flex-h">
                            <div className="c-icon hvr-radial-out">
                                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                            </div>
                            <div className="c-text">
                                <h3>MONEY BACK GUARANTEE</h3>
                                <p>Stay well connected and well informed</p>
                            </div>
                        </div>
                        <div className="col-sm-3 flex-h">
                            <div className="c-icon hvr-radial-out">
                                <i className="fa fa-gift" aria-hidden="true"></i>
                            </div>
                            <div className="c-text">
                                <h3>FREE GIFT COUPONS</h3>
                                <p>For Your Daily Needs</p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </>
        )
    }
}

export default extra
