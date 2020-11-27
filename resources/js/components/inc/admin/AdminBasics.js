import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'

class AdminBasics extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            basics:                [],
            type:                  '',
            name:                  '',
            url:                   '',
            selectedBasic:         '',
            currentPage:           1,
            itemsPerPage:          20
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    
    componentDidMount(){
        axios.get('/api/v1/fetchBasic').then(response =>{ this.setState({ basics: response.data.data }) }) 
        window.scrollTo(0, 0)
    }

    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:             false,
            editmodalIsOpen:            false,
            type:                       '',
            name:                       '',
            url:                        '',
            selectedBasic:              ''
        })
    }

    addBasic = (e) => {
        e.preventDefault()
        const data={
            type:                this.state.type, 
            name:               this.state.name,
            url:                this.state.url,
        }               
        axios.post('/api/v1/addBasic', data)
            .catch(err=>console.log('err', err)) 
            .then( res=> {
                if(res.data.success){
                    this.setState({ basics: [...this.state.basics, res.data.data ] })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }
    
    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:            true,     
            type:                       i.type,
            name:                       i.name,
            url:                        i.url,
            selectedBasic:              i.id  
        })        
    }

    updateBasic = (e) => {
        e.preventDefault()
        const data={
            id:                 this.state.selectedBasic, 
            type:               this.state.type, 
            name:               this.state.name,
            url:                this.state.url,
        }               
        axios.post('/api/v1/updateBasic', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Basics not updated due to error")
            }) 
            .then( res=> {
                if(res.data.success){
                    this.setState({ basics: this.state.basics.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.basics.slice(indexOfFirstItem, indexOfLastItem).map(( i, index ) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.type}</td>                                              
                    <td>{i.name}</td>
                    <td>{i.url}</td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.basics.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        
        return (
            <>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel</span>( Basics )</h1>
                    <div className="row admin">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <button className="vaidam-btn" onClick={this.addModalOn}>Add Basic</button>  
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
                                        <td>Action</td>
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
                        <h2>Add Basics Data Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.addBasic}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Type</label>
                                <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                    <option>Select Type</option>
                                    <option value="prod-category">Product Category</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label>Name</label>
                                <input className="form-control" type="text" placeholder="Name" name="name" required value={this.state.name} onChange={this.onChange}/>
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

                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Basic Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.updateBasic}>
                        <div className="row">
                            <div className="col-sm-4">
                                <label>Type</label>
                                <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                    <option>Select Type</option>
                                    <option value="prod-category">Product Category</option>
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <label>Name</label>
                                <input className="form-control" type="text" placeholder="Name" name="name" required value={this.state.name} onChange={this.onChange}/>
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
export default AdminBasics