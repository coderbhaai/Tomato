import React, { Component } from 'react'
import Swiper from 'react-id-swiper'

export class Testimonial extends Component {
    render() {
        const params = {
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },
            loop: true,
            autoplay: {
                delay: 3000
            },
            effect: 'flip',
            grabCursor: true,
            spaceBetween: 30
          }
        return (
            <section className="testis py-5">
                <div className="container">
                    <h2 className="heading">Testimonials</h2>
                    <Swiper {...params}>
                        <div>
                            <div className="review-wrapper">
                                <div className="img-wrapper">
                                    <img src="/images/icons/profile-circle.svg" alt="SEO Client logo"/>
                                </div>
                                <p className="quote">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <h3 className="text-center mt-5">User name</h3>
                                <p className="text-center">Company name</p>
                            </div>
                        </div>
                        <div>
                            <div className="review-wrapper">
                                <div className="img-wrapper">
                                    <img src="/images/icons/profile-circle.svg" alt="digital marketin client logo"/>
                                </div>
                                <p className="quote">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <h3 className="text-center mt-5">User name</h3>
                                <p className="text-center">Company name</p>
                            </div>
                        </div>
                        <div>
                            <div className="review-wrapper">
                                <div className="img-wrapper">
                                    <img src="/images/icons/profile-circle.svg" alt="website development client logo"/>
                                </div>
                                <p className="quote">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <h3 className="text-center mt-5">User name</h3>
                                <p className="text-center">Company name</p>
                            </div>
                        </div>
                        <div>
                            <div className="review-wrapper">
                                <div className="img-wrapper">
                                    <img src="/images/icons/profile-circle.svg" alt="graphics designer client logo"/>
                                </div>
                                <p className="quote">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <h3 className="text-center mt-5">User name</h3>
                                <p className="text-center">Company name</p>
                            </div>
                        </div>
                        <div>
                            <div className="review-wrapper">
                                <div className="img-wrapper">
                                    <img src="/images/icons/profile-circle.svg" alt="social media client logo"/>
                                </div>
                                <p className="quote">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <h3 className="text-center mt-5">User name</h3>
                                <p className="text-center">Company name</p>s
                            </div>
                        </div>
                    </Swiper>
                </div>
            </section>
        )
    }
}

export default Testimonial
