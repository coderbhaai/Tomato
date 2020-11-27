import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'

class AdminMeta extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            metas:                 [],
            url:                   '',
            title:                 '',
            description:           '',
            keyword:               '',
            selectedMeta:          '',
            newMeta:               '',
            currentPage:           1,
            itemsPerPage:          10
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    componentDidMount(){
        axios.get('/api/v1/getMeta').then(response =>{ this.setState({ metas: response.data.datax }) }) 
        window.scrollTo(0, 0)
    }

    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:            false,
            editmodalIsOpen:            false,
            url:                        '',
            title:                      '',
            description:                '',
            keyword:                    '',
            selectedMeta:               ''
        })
    }

    addMeta = (e) => {
        e.preventDefault()
        const data={
            url:                this.state.url, 
            title:              this.state.title,
            description:        this.state.description,
            keyword:            this.state.keyword
        }               
        axios.post('/api/v1/addMeta', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Meta tag not added due to error")
            })
            .then( res=> {
                if(res.data.success){
                    this.setState({ metas: [...this.state.metas, res.data.data ] })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }
    
    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            url:                        i.url,
            title:                      i.title,
            description:                i.description,
            keyword:                    i.keyword,
            selectedMeta:               i.id  
        })        
    }

    updateMeta = (e) => {
        e.preventDefault()
        const data={
            id:                 this.state.selectedMeta,
            url:                this.state.url, 
            title:              this.state.title,
            description:        this.state.description,
            keyword:            this.state.keyword
        }               
        axios.post('/api/v1/updateMeta', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Meta tag not updated due to error")
            })
            .then( res=> {
                console.log('res.data', res)
                if(res.data.success){
                    this.setState({ metas: this.state.metas.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.metas.slice(indexOfFirstItem, indexOfLastItem).map(i => {
            return (
                <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.url}</td>                                              
                    <td>
                        Title: {i.title}<br/>
                        Description: {i.description}<br/>
                        Keyword: {i.keyword}<br/>
                        Updated on: {i.created_at}
                    </td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.metas.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        
        return (
            <>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel</span>(Meta Tags)</h1>
                    <div className="row admin">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <button className="vaidam-btn" onClick={this.addModalOn}>Add Meta Tags</button>  
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
                                        <td>URL</td>
                                        <td>Meta</td>
                                        <td>Edit</td>
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
                        <h2>Add Meta Data Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.addMeta}>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>URL</label>
                                <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Title</label>
                                <textarea className="form-control" type="text" placeholder="Add Title Here" name="title" required value={this.state.title} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Description</label>
                                <textarea className="form-control" type="text" placeholder="Add Description" name="description" required value={this.state.description} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Keywords</label>
                                <textarea className="form-control" type="text" placeholder="Add Keywords" name="keyword" required value={this.state.keyword} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="my-btn">
                            <button className="vaidam-btn" type="submit">Submit</button> 
                        </div>
                    </form>
                </Modal>

                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Meta Data Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateMeta}>
                        <div className="row">
                            <div className="col-sm-6">
                                <label>URL</label>
                                <input className="form-control" type="text" placeholder="URL of Page" name="url" required value={this.state.url} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Title</label>
                                <textarea className="form-control" type="text" placeholder="Add Title Here" name="title" required value={this.state.title} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Description</label>
                                <textarea className="form-control" type="text" placeholder="Add Description" name="description" required value={this.state.description} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6">
                                <label>Keywords</label>
                                <textarea className="form-control" type="text" placeholder="Add Keywords" name="keyword" required value={this.state.keyword} onChange={this.onChange}/>
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
export default AdminMeta 