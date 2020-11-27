import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

export class BlogCarousel extends Component {
    render() {
        // const imgPath = "/tomato/storage/app/public/blog/"
        const imgPath = "/storage/blog/"
        return (
            <>
                <div className="parallax">
                    <h3>Want to  <span> publish your blog</span> with us?</h3>
                    <div className="myBtn">
                        <a data-toggle="modal" data-target="#exampleModalCenter" className="smallBtn"><button className="amitBtn">Write for us</button></a>
                    </div>
                </div>
                {this.props.blogs ? 
                    <div className="container py-5">
                        <h3 className="heading"><span>Blogs You might be </span>interested in</h3>
                        <div className="row blogs">
                        { this.props.blogs.sort(() => 0.5 - Math.random()).slice(0,6).map((i,index)=>{
                            let alt = i.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                            return(
                                <div className="col-sm-4 " key={index}>
                                    <div className="card">
                                        <Link to={"/blog/" + i.url}>
                                            <LazyLoadImage src={imgPath + i.cover_img} alt={alt} className="web"/>
                                            <LazyLoadImage src={imgPath + "online-"+ i.cover_img } alt={alt} className="mobile"/>
                                            <div className="name">
                                                <h2>{i.title}</h2>
                                                <p>Read More </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ) })}
                        </div>
                    </div>
                : null }
            </>
        )
    }
}
export default BlogCarousel