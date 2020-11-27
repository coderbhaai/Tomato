import React, { Component } from 'react'
import AdminSidebar from './AdminSidebar'
import { Dropdown } from 'semantic-ui-react'
import CKEditor from 'ckeditor4-react'
import { Modal } from 'reactstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import moment from "moment"

class AdminBlogs extends Component{
    constructor(props) {
        super(props)
        this.state = {
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            title:                      '',
            blogURL:                    '',
            content:                    '',
            categoryOptions:            [],
            tagOptions:                 [],
            selectedCategory:           [],
            selectedTag:                [],
            blogImage:                  null,
            blogUpdateImage:            null,
            blogList:                   [],
            previewImg:                 null,
            category:                   [],
            tag:                        [],
            blogId:                     '',
            currentPage:                1,
            itemsPerPage:               10
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    componentDidMount(){
        axios.get('/api/v1/blogList').then(response =>{ this.setState({ blogList: response.data.blogs }) }) 
        axios.get('/api/v1/blogMetaData').then(response =>{
            this.setState({ 
                categoryOptions: response.data.catList, 
                tagOptions: response.data.tagList
             }) })
        window.scrollTo(0, 0)
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    categorySelected = (e, {value}) => { this.setState({ selectedCategory: value })}
    tagSelected = (e, {value}) => { this.setState({ selectedTag: value })}
    onEditorChange1( evt1 ) { this.setState( { content: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { content: changeEvent1.target.value } ) }
    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:                 false,
            editmodalIsOpen:                false,
            blogImage:                      null,
            images:                         null,
            title:                          '',
            caption:                        '',
            blogURL:                        '',
            content:                        '',
            selectedCategory:               [],
            selectedTag:                    [],
            blogId:                         '',
            blogUpdateImage:                null,
            category:                       [],
            tag:                            [],
            previewImg:                     null,
            previewImages:                  [],
        })
    }

    blogImage = (e) =>{ this.setState({ blogImage: e.target.files[0] }) }
    blogUpdateImage = (e) =>{ this.setState({ blogUpdateImage: e.target.files[0] }) }

    addBlogData= (e)=>{
        e.preventDefault()
        const data = new FormData()
        data.append('file', this.state.blogImage)
        data.append('title', this.state.title)
        data.append('url', this.state.blogURL)
        data.append('content', this.state.content)
        data.append('category', JSON.stringify( this.state.selectedCategory ) )
        data.append('tag', JSON.stringify( this.state.selectedTag ) )
        axios.post('/api/v1/addBlog', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Blog not added due to error")
            })
            .then( res=> {
                if(res.data.success){ this.setState({ blogList: [...this.state.blogList, res.data.data ] }) }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    editBlogOn = (i)=>{        
        this.setState({
            editmodalIsOpen:                true,
            blogId:                         i.id,
            blogUpdateImage:                null,
            title:                          i.title,
            blogURL:                        i.url,
            content:                        i.content,
            previewImg:                     i.cover_img,
            category:                       JSON.parse( i.category ),
            tag:                            JSON.parse( i.tag )
        }) 
             
    }

    arrayCategoryRemove(index){
        this.state.category.splice(index, 1)
        this.setState({category: this.state.category})
    }

    arrayTagRemove(index){
        this.state.tag.splice(index, 1)
        this.setState({tag: this.state.tag})
    }

    updateBlogData= (e)=>{
        e.preventDefault()
        const data = new FormData()
        const finalCategory = Array.from(new Set( [...this.state.category, ...this.state.selectedCategory]));
        const finalTag = Array.from(new Set( [...this.state.tag, ...this.state.selectedTag]));
        data.append('id', this.state.blogId)
        data.append('file', this.state.blogUpdateImage)
        data.append('title', this.state.title)
        data.append('url', this.state.blogURL)
        data.append('content', this.state.content)
        data.append('category', JSON.stringify( finalCategory ) )
        data.append('tag', JSON.stringify( finalTag ) )
        axios.post('/api/v1/updateBlog', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Blog not added due to error")
            })
            .then( res=> {
                if(res.data.success){ this.setState({ blogList: this.state.blogList.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) }) }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        console.log('this.state.blogList', this.state.blogList)
        // const imgPath = "/tomato/storage/app/public/blog/"
        const imgPath = "/storage/blog/"

        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.blogList.slice(indexOfFirstItem, indexOfLastItem).map(i => {
            return (
                <tr key={i.id}>
                    <td>{i.id}</td>                                              
                    <td><Link to={"/blog/" + i.url} target="_blank">{i.title}</Link></td>
                    <td><img src={ imgPath + i.cover_img } alt="" className="img-fluid tableImg"/></td>
                    <td>
                        { i.category ? <>Category: { JSON.parse(i.category).map(( j, index)=><span key={index}>{j}, </span>) }<br/></> : null }
                        { i.tag ? <>Tag: { JSON.parse(i.tag).map(( j, index)=><span key={index}>{j}, </span>) }</> : null}
                    </td>
                    {/* <td>{i.created_at}</td> */}
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    <td className="text-center editIcon"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editBlogOn(i)}></img></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.blogList.length / itemsPerPage); i++) {
          pageNumbers.push(i)
        }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                {/* <FlashMessage/> */}
                <div className="container-fluid my-5 admin">
                    <h1 className="heading"><span>Admin Panel</span>(Blogs)</h1>
                    <div className="row">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <button className="action-btn" onClick={this.addModalOn}>Add Blogs</button>
                                <div className="flex-h">
                                    <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                        <option>{itemsPerPage}</option>
                                        <option value="10">10</option> 
                                        <option value="25">25</option> 
                                        <option value="50">50</option> 
                                        <option value="100">100</option> 
                                    </select>
                                    <ul className="page-numbers">{renderPagination}</ul>
                                </div>
                            </div>
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <td>Sl no.</td>
                                        <td>Blog Name</td>
                                        <td>featured Image</td>
                                        <td>Category &amp; tags</td>
                                        <td>Time</td>
                                        <td>Status</td>
                                    </tr>
                                </thead>
                                <tbody>{renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header">
                        <h2>Publish Blog Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.addBlogData}>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Title</label>
                                <input className="form-control" type="text" placeholder="Blog Title" name="title" required value={this.state.title} onChange={this.onChange}/> 
                            </div>
                            <div className="col-sm-3">
                                <label>Blog URL</label>
                                <input className="form-control" type="text" placeholder="Blog URL" name="blogURL" required value={this.state.blogURL} onChange={this.onChange}/> 
                            </div>
                            <div className="col-sm-3">
                                <label>Featured Image</label>
                                <input className="form-control" type="file" onChange={this.blogImage}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Blog Content</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.content} onChange={this.onEditorChange1} />
                            </div>
                            <div className="col-sm-12 blogMeta compare label-down my-3">
                                <label>Categories</label>
                                <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.categoryOptions}/>
                            </div>
                            <div className="col-sm-12 blogMeta compare label-down my-3">
                                <label>Tags</label>
                                <Dropdown placeholder='Select Tags' multiple fluid search selection onChange={this.tagSelected} options={this.state.tagOptions}/>
                            </div>
                        </div>
                        <div className="my-btn">
                            <button className="action-btn" type="submit">Submit</button> 
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Edit Blog Here </h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.updateBlogData}>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Title</label>
                                <input className="form-control" type="text" placeholder="Blog Title" name="title" required value={this.state.title} onChange={this.onChange}/> 
                            </div>
                            <div className="col-sm-3">
                                <label>Blog URL</label>
                                <input className="form-control" type="text" placeholder="Blog URL" name="blogURL" readOnly required value={this.state.blogURL} onChange={this.onChange} readOnly/> 
                            </div>
                            <div className="col-sm-3">
                                <img src={ imgPath + this.state.previewImg } alt="" className="img-fluid tableImg"/>
                                <label>Featured Image</label>
                                <input className="form-control" type="file" onChange={this.blogUpdateImage}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Blog Content</label>
                                <CKEditor  onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.content} content= {this.state.content} onChange={this.onEditorChange1} />
                            </div>
                            <div className="col-sm-12 blogMeta compare label-down mt-3">
                                <label>Categories</label>
                                <Dropdown placeholder='Select category' multiple fluid search selection onChange={this.categorySelected} options={this.state.categoryOptions}/>
                                <div className="update-treat">
                                    { this.state.category.map((category, index) =>(
                                        <span className="ui label mr-3" key={index}>{category}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayCategoryRemove(index)}></i></span>
                                    ))}
                                </div>
                            </div>
                            <div className="col-sm-12 blogMeta compare label-down mt-3">
                                <label>Tags</label>
                                <Dropdown placeholder='Select Tags' multiple fluid search selection onChange={this.tagSelected} options={this.state.tagOptions}/>
                                <div className="update-treat">
                                    { this.state.tag.map((tag, index) =>(
                                        <span className="ui label mr-3" key={index}>{tag}<i aria-hidden="true" className="delete icon"  onClick={()=>this.arrayTagRemove(index)}></i></span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="my-btn">
                            <button className="action-btn" type="submit">Submit</button> 
                        </div>
                    </form>
                </Modal>
            </>
        )
       
    }    
}
export default AdminBlogs