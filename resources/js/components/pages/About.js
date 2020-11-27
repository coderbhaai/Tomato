import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <h1 className="heading">What is Tomato Project?</h1>
                    <div className="row">
                        <div className="col-sm-12">
                            <p> Tomato Project was established on 2013.</p>
                            <p>The motivation towards the establishment of enterprise started from the problem of lack of safe vegetables.</p>
                            <p>At the time, I had a daughter in elementary school and that became a huge problem that there was no safe vegetable that I can make my daughter eat with authenticity. That was same for other mothers also.</p>
                            <p>The first farmer I have met was the farmers of Himachal. They were growing safe and delicious vegetables, and was looking for buyer. It was a miraculous encounter.</p>
                            <p>Since then, the number of connections with farmers has gradually increased. But Tomato Project still handles most of the vegetables from Himachal and Uttarakhand.</p>
                            <p>Tomato Project focuses not only on whether the vegetables are organic, but also on the growing environment such as water, air, and soil in the production area.</p>
                            <p>Only when the water and the soil in place are kept clean, a safe and delicious vegetable can be grown.I feel that in my relationship with Himachal and Uttarakhand production area.</p>
                        </div>
                        <div className="col-sm-6 my-3">
                            <img src="images/pic1.webp"/>
                        </div>
                        <div className="col-sm-6 my-3">
                            <img src="images/pic2.webp"/>
                        </div>
                        <div className="col-sm-12">
                            <p> You can't get it just by using no pesticides or chemical fertilizers, but stick to the environment in which vegetables grow. That's what the Tomato Project cherishes.</p>
                            <p>What Tomato Project cherishes is that to stick to the environment of the production areas but not only sticking not to using pesticides nor chemical fertilizers.</p>
                        </div>
                        <div className="col-sm-6 my-3">
                            <img src="images/pic3.webp"/>
                        </div>
                        <div className="col-sm-6 my-3">
                            <img src="images/pic4.webp"/>
                        </div>
                        <div className="col-sm-12"></div>
                            <p>In addition to “buying” and “eating”, we value to have good relationship with farmers. We achieve that by visiting the farmers and production areas frequently.</p>
                            <p>We have also started trying to grow vegetables on our own.</p>
                            <p>Not only to consume, but to produce as much as possible even if that is of small amount.</p>
                            <p>It is small, but is valuable step towards better future.</p>
                    </div>
                </div>
            </>
        )
    }
}

export default About
