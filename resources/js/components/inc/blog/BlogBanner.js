import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export class BlogBanner extends Component {
    render() {
        const imgPath = "/tomato/storage/app/public/blog/"
        // const imgPath = "/storage/blog/"
        return (
            <>
                {this.props.blogs.slice(0, 1).map((i)=>{ 
                    let alt = i.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                    return(
                        <div className="carousel-item active" key={i.id}>
                            <LazyLoadImage src={imgPath + i.cover_img} alt={alt} className="web"/>
                            <LazyLoadImage src={imgPath + "online-"+ i.cover_img } alt={alt} className="mobile"/>
                            <div className="carousel-caption">
                                <Link to={"/blog/" + i.url}>
                                    <h2>{i.title}</h2>
                                    <button className="amitBtn">Read More</button>
                                </Link>
                            </div>
                        </div>
                    )})}
                {this.props.blogs.slice(1, 3).map((i)=>{
                    let alt = i.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                    return(
                        <div className="carousel-item" key={i.id}>
                            <LazyLoadImage src={imgPath + i.cover_img} alt={alt} className="web"/>
                            <LazyLoadImage src={imgPath + "online-"+ i.cover_img } alt={alt} className="mobile"/>
                            <div className="carousel-caption">
                                <Link to={"/blog/" + i.url}>
                                    <h2>{i.title}</h2>
                                    <button className="amitBtn">Read More</button>
                                </Link>
                            </div>
                        </div>
                    )})}
            </>
        )
    }
}

export default BlogBanner