import React, { Component } from 'react'
import BlogCarousel from '../inc/blog/BlogCarousel'
import Form from '../inc/parts/Form'

export class Contact extends Component {
    render() {
        return (
            <>
                <div className="container page my-5">
                    <h1 className="heading my-3">Connect Today</h1>
                    <p className="text-center">Feel free to connect with me for any requirement</p>
                    <div className="row my-5">
                        <div className="col-sm-6 contact">
                            <p><strong>Address:</strong> 1172, Sector- 45, Gurgaon, Haryana</p>
                            <p><strong>Phone: </strong><a href="tel:8424003840"> +91 -8424 003 840</a> / <a href="tel:+91-9354811331"> +91-9354 811 331</a></p>
                            <p><strong>Email: </strong><a href="mailto:amit@amitkk.com">amit@amitkk.com</a> / <a href="mailto:amit.khare588@gmail.com">amit.khare588@gmail.com</a></p>
                            <h2>Follow me</h2>
                            <div className="middle">
                                <a className="btn" target="_blank" href="https://www.facebook.com/Amitkk-110578507216727"> <img src="/images/icons/facebook-white.svg" alt="AmitKK Facebook Page"/></a>
                                <a className="btn" target="_blank" href="https://www.linkedin.com/in/amitkhare588/"> <img src="/images/icons/linkedin-white.svg" alt="AmitKK Linkedin Page"/></a>
                                <a className="btn" target="_blank" href="https://twitter.com/AmitdoubleK"> <img src="/images/icons/twitter-white.svg" alt="AmitKK Twitter Page"/></a>
                                <a className="btn" target="_blank" href="https://www.instagram.com/amitdoublek/"> <img src="/images/icons/instagram-white.svg" alt="AmitKK Instagram Page"/></a>
                                <a className="btn" target="_blank" href="//api.whatsapp.com/send?phone=918424003840&amp;text= Hi, I got your whatsapp Number from www.amitkk.com"> <img src="/images/icons/whatsapp-white.svg" alt="AmitKK Whats App"/></a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <h2>Please fill the below form and I will reach back to you.</h2>
                            <Form/>
                        </div>
                    </div>
                </div>
                {/* <BlogCarousel blogs={this.state.blogs}/> */}
            </>
        )
    }
}

export default Contact