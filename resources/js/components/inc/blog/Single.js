import React, { Component } from 'react'
import Sidebar from './Sidebar'
import BlogCarousel from './BlogCarousel'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component'
import SocialShare from './SocialShare'
import Comments from './Comments'

export class Single extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            data:               '',
            cover_img:          '',
            category:           [],
            suggestBlogs:       [],
            blogList:           [],
            cats:               [],
            tags:               [],
            comments:           [],
            response:           []
        }
    }
    
    componentDidMount(){
        const url = this.props.match.params.url
        this.setMeta(url)
    }
    
    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.match.params.url !== this.props.match.params.url){
            const url = nextProps.match.params.url
            this.setMeta(url)
        }
    }
    
    setMeta(url){
        axios.get('/api/v1/blogSingle/'+ url)
        .then(res =>{
            console.log('res.data', res.data)
            this.setState({
                data:                   res.data.blogSingle,
                cover_img:              res.data.blogSingle.cover_img ,
                suggestBlogs:           res.data.suggestBlogs,
                blogList:               res.data.blogList,
                cats:                   res.data.cats,
                tags:                   res.data.tags,
                comments:               res.data.comments,
                response:               res.data.response,
            })
        })
        window.scrollTo(0, 0)
    }

    render() {
        // const imgPath = "/tomato/storage/app/public/blog/"
        const imgPath = "/storage/blog/"
        
       let alt = this.state.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')
       return (
            <>
                <div className="blogBanner">
                    <img src={imgPath+this.state.cover_img} alt={this.state.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')} className="web"/>
                    <img src={imgPath+ this.state.cover_img } alt={this.state.cover_img.replace('.jpg', '').replace(/_/g, ' ').replace(/-/g, ' ')} className="mobile"/>
                    <div className="carousel-caption d-none d-md-block">
                        <h2>{this.state.data.title}</h2>
                    </div>
                </div>
                <div className="sight page container py-5">
                    <h1 className="heading">{this.state.data.title} </h1>
                    <div className="row">
                        <div className="col-sm-9">
                            <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.data.content }} />
                            <blockquote>Feel free to use images in our website by simply providing a source link to the page they are taken from. </blockquote>
                            <SocialShare title={this.state.data.title} url={"http://www.amitkk.com/blog/"+this.state.data.url} media={"http://www.amitkk.com/amit/storage/app/public/blog/"+ this.state.data.cover_img}/>
                            <LazyLoadComponent><Comments comments={this.state.comments} response={this.state.response} blogId={this.state.data.id}/></LazyLoadComponent>
                            {/* <Comments comments={this.state.comments} response={this.state.response} blogId={this.state.data.id}/> */}
                        </div>
                        <div className="col-sm-3 sidebar">
                            <Sidebar blogs={this.state.blogList} cats={this.state.cats} tags={this.state.tags}/>
                        </div>
                    </div>
                </div>
                <LazyLoadComponent><BlogCarousel blogs={this.state.suggestBlogs}/></LazyLoadComponent>
            </>
        )
    }
}

export default Single