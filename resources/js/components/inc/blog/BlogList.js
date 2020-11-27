import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'; 

export class BlogList extends Component {
    render() {
        // const imgPath = "/tomato/storage/app/public/blog/"
        const imgPath = "/storage/blog/"
        return (
            <>
                { this.props.blogs.map((i)=>{ 
                    let alt = i.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
                return(
                    <div className="col-sm-3 " key={i.id}>
                        <div className="card">
                            <Link to={"/blog/" + i.url}>
                                <LazyLoadImage src={imgPath + i.cover_img} alt={alt} className="web"/>
                                <LazyLoadImage src={imgPath + "online-"+ i.cover_img } alt={alt} className="mobile"/>
                                <div className="name">
                                    <h2 className="text-center">{i.title}</h2>
                                    <p>Read More </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )})}
            </>
        )
    }
}

export default BlogList
