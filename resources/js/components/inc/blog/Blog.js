import React, { Component} from 'react'
import BlogList from './Bloglist'
// import BlogBanner from './BlogBanner'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

export class Blog extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            blogs:                      [],
            name:                       '',
            type:                       '',
            empty:                      false,
        }
    }
    
    componentDidMount(){
        if(this.props.match.params.cat){ const url = this.props.match.params.cat; const type = "category"; this.setMeta(url, type); }
        if(this.props.match.params.tag){ const url = this.props.match.params.tag; const type = "tag"; this.setMeta(url, type); }
        if(this.props.match.params.search){ const url = this.props.match.params.search; const type = "search"; this.setMeta(url, type); }
        if(!this.props.match.params.cat && !this.props.match.params.tag && !this.props.match.params.search){const url = "All"; const type = "All"; this.setMeta(url, type);}
        window.scrollTo(0, 0)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.match.params.search !== this.props.match.params.search){
            const url = nextProps.match.params.search; const type = "search"; this.setMeta(url, type); 
        }
    }
    
    setMeta(url, type){
        axios.get('/api/v1/fetchBlog/' + url+ "/"+ type)
        .then(response =>{
        this.setState({ blogs: response.data.blogs, name: response.data.name, type: response.data.type, empty: response.data.empty }) })
    }

    render() {
        return (
            <>
                <div className="container my-5">
                    { this.state.empty ?
                        <>
                            <h1 className="heading">Sorry, We couldn't find<span> what you are looking for</span></h1>
                            <p className="text-center">Do check our blogs</p>
                        </>
                        :
                        <>
                            { this.state.type =="All" ? <h1 className="heading">Interesting Reads <span> for you</span></h1>
                                : this.state.type =="tag" ? <h1 className="heading">Blogs of Tag: <span> {this.state.name}</span></h1>
                                : this.state.type =="category" ? <h1 className="heading">Blogs of Category: <span> {this.state.name}</span></h1>
                                : this.state.type =="search" ? <h1 className="heading">You searched for blogs containing; <span>{this.state.name}</span></h1>
                                :null
                            }
                        </>
                    }
                    <div className="row blogs mt-5">
                        <LazyLoadComponent><BlogList blogs = {this.state.blogs}/></LazyLoadComponent>
                    </div>
                </div>
            </>
        )
    }
}
export default Blog