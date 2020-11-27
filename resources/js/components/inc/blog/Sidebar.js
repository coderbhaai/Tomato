import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            search:                 '',
            categoryList:           [],
            tagList:                [],
            blogs:                  []
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    
    render() {
        console.log('this.props', this.props)
        return (
            <>
                <div className="form-group flex-center-h">
                    <h3>Search for Blogs here</h3>
                    <input className="form-control" type="text" placeholder="Search for" name="search" required value={this.state.search} onChange={this.onChange}/>
                    <div className="form-group text-center myBtn mt-3">
                        <Link to={"/search/" + this.state.search}><button type="Submit" className="w-100 amitBtn">Search</button></Link>
                    </div>
                </div>
                <div className="categories mt-5">
                    <h3>Recently Published</h3>
                    {this.props.blogs ? <ul>{this.props.blogs.map((i,index) =><li key={index}><a href={"/blog/" + i.url}>{i.title}</a></li> )}</ul> :null }
                </div>
                <div className="categories mt-5">
                    <h3>Category List</h3>
                    {this.props.cats ? <ul>{ this.props.cats.map((i,index) => <li key={index}><a href={"/category/" + i.url}>{i.name}</a></li> )}</ul> :null }
                </div>
                <div className="categories mt-5">
                    <h3>Tag List</h3>
                    {this.props.tags ? <ul>{ this.props.tags.map((i,index) => <li key={index}><a href={"/tag/" + i.url}>{i.name}</a></li> )}</ul> :null }
                </div>
            </>
        )
    }
}
export default Sidebar