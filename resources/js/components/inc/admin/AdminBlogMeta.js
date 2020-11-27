import React, { Component } from 'react'
import AdminSidebar from './AdminSidebar'
import {Input, Modal} from 'reactstrap'
import swal from 'sweetalert'

class AdminBlogMeta extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            blogMetaList:               [],
            addMetaModalIsOpen:         false,  
            editMetaModalIsOpen:        false,  
            name:                       '',
            url:                        '',
            type:                       '',
            selectedMeta:               '',
            currentPage:                1,
            itemsPerPage:               10
        }
    } 

    componentDidMount(){
        axios.get('/api/v1/fetchBlogMetaList').then(response =>{ this.setState({ blogMetaList: response.data.data }) }) 
        window.scrollTo(0, 0)
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    addMetaModalOn = ()=>{
        this.setState({
            addMetaModalIsOpen:            true,           
        })        
    }

    resetData= ()=>{
        this.setState({
            addMetaModalIsOpen:         false,
            name:                       '',
            url:                        '',
            type:                       '',
            editMetaModalIsOpen:        false
        })
    }

    addBlogMetaData = (e) => {
        e.preventDefault()
        const data={
            type:              this.state.type,
            name:              this.state.name,
            url:               this.state.url
        }               
        axios.post('/api/v1/addBlogMeta', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Blog Meta tag not added due to error")
            })
            .then( res=> {
                if(res.data.success){
                    this.setState({ blogMetaList: [...this.state.blogMetaList, res.data.data ] })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }
    
    editMetaModalOn = (i)=>{
        this.setState({
            editMetaModalIsOpen:            true,
            name:                           i.name,
            url:                            i.url,
            type:                           i.type,
            selectedMeta:                   i.id
        })        
    }

    updateBlogMetaData = (e) => {
        e.preventDefault()
        const data={
            id:                this.state.selectedMeta,
            type:              this.state.type,
            name:              this.state.name,
            url:               this.state.url
        }               
        axios.post('/api/v1/updateBlogMeta', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Blog Meta tag not updated due to error")
            })
            .then( res=> {
                if(res.data.success){
                    this.setState({ blogMetaList: this.state.blogMetaList.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.blogMetaList.slice(indexOfFirstItem, indexOfLastItem).map(i => {
            return (
                <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.type}</td>
                    <td>{i.name}</td>                                              
                    <td>{i.url}</td>
                    <td className="text-center"><button className="action-btn" onClick={()=>this.editMetaModalOn(i)}>Edit</button></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.blogMetaList.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
                
        return (
            <>
            <div className="container-fluid my-5">
                <h1 className="heading"><span>Admin Panel</span>(Blog Meta)</h1>
                <div className="row admin">
                    <AdminSidebar/>
                    <div className="col-sm-10">
                        <div className="btn-pag">
                            <button className="vaidam-btn" onClick={this.addMetaModalOn}>Add Blog Meta</button>
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
                                    <td>Type</td>
                                    <td>Name</td>
                                    <td>URL</td>
                                    <td>Edit</td>
                                </tr>
                            </thead>
                            <tbody>{renderItems}</tbody>
                        </table>
                        <ul className="page-numbers">{renderPagination}</ul>
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.addMetaModalIsOpen} className="adminModal"> 
                <div className="modal-header">
                    <h2>Add Blog Category and Tags Here </h2>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                </div>
                <form className="modal-form" encType="multipart/form-data" onSubmit={this.addBlogMetaData}>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Type</label>
                            <Input type="select"  className="form-control" required name="type" value={this.state.type} onChange={this.onChange}>
                                <option>Select Type</option>
                                <option value="category">Category</option>
                                <option value="tag">Tag</option>
                            </Input>
                        </div>
                        <div className="col-sm-4">
                            <label>Name</label>
                            <input className="form-control" type="text" placeholder="name of Meta" name="name" required value={this.state.name} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-4">
                            <label>URL</label>
                            <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="my-btn">
                        <button className="vaidam-btn" type="submit">Submit</button> 
                    </div>
                </form>
            </Modal>
            <Modal isOpen={this.state.editMetaModalIsOpen} className="adminModal"> 
                <div className="modal-header">
                    <h2>Update Blog Category and Tags Here</h2>
                    <div className="closeModal" onClick={this.resetData}>X</div>
                </div>
                <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateBlogMetaData}>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Type</label>
                            <select type="select"  className="form-control" required name="type" value={this.state.type} onChange={this.onChange}>
                                <option>Select Type</option>
                                <option value="category">Category</option>
                                <option value="tag">Tag</option>
                            </select>
                        </div>
                        <div className="col-sm-4">
                            <label>Name</label>
                            <input className="form-control" type="text" placeholder="name of Meta" name="name" required value={this.state.name} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-4">
                            <label>URL</label>
                            <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="my-btn">
                        <button className="vaidam-btn" type="submit">Submit</button> 
                    </div>
                </form>
            </Modal>
        </>
        )
    }
}
export default AdminBlogMeta