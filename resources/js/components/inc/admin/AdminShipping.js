import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import moment from "moment"

class AdminShipping extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            ships:                  [],
            region:                 '',
            name:                   '',
            type:                   '',
            amount:                 '',
            remarks:                '',
            currentPage:            1,
            itemsPerPage:           100
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    componentDidMount(){
        axios.get('/api/v1/getShipping').then(response =>{ this.setState({ ships: response.data.data }) }) 
        window.scrollTo(0, 0)
    }

    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    resetData = ()=>{
        this.setState({
            addmodalIsOpen:            false,
            editmodalIsOpen:            false,
            region:                 '',
            name:                   '',
            type:                   '',
            amount:                 '',
            remarks:                '',
            selectedShip:               ''
        })
    }

    addCoupon = (e) => {
        e.preventDefault()
        const data={
            region:                 this.state.region,
            name:                   this.state.name,
            type:                   this.state.type,
            amount:                 this.state.amount,
            remarks:                this.state.remarks
        }
        axios.post('/api/v1/addShipping', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Shipping not added due to error")
            })
            .then( res=> {
                if(res.data.success){
                    this.setState({ ships: [...this.state.ships, res.data.data ] })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }
    
    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:        true,
            region:                 i.region,
            name:                   i.name,
            type:                   i.shippingtype,
            amount:                 i.amount,
            remarks:                i.remarks,
            selectedShip:           i.id  
        })        
    }

    updateCoupon = (e) => {
        e.preventDefault()
        const data={
            id:                     this.state.selectedShip,
            region:                 this.state.region,
            name:                   this.state.name,
            type:                   this.state.type,
            amount:                 this.state.amount,
            remarks:                this.state.remarks
        }               
        axios.post('/api/v1/updateShipping', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Shipping not updated due to error")
            })
            .then( res=> {
                console.log('res.data', res)
                if(res.data.success){
                    this.setState({ ships: this.state.ships.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.ships.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.region}</td>
                    <td>{i.name}</td>
                    <td>{i.shippingtype}</td>
                    <td>{i.amount}</td>
                    <td>{i.remarks}</td>
                    <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                    {/* <td>{i.updated_at}</td> */}
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.ships.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel</span>(Shipping)</h1>
                    <div className="row admin">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <button className="vaidam-btn" onClick={this.addModalOn}>Add Shipping</button>
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
                                        <td>Region</td>
                                        <td>Name</td>
                                        <td>Shipping Type</td>
                                        <td>Amount</td>
                                        <td>Remarks</td>
                                        <td>Date</td>
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
                        <h2>Add Shipping here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.addCoupon}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Region</label>
                                <select className="form-control" required value={this.state.region} onChange={this.onChange} name="region">
                                    <option>Select type of region</option>
                                    <option value="State">State</option> 
                                    <option value="City">City</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label>Name</label>
                                <input className="form-control" type="text" name="name" placeholder="Name of region" required value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>Type</label>
                                <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                    <option>Type of Shipping charge</option>
                                    <option value="Flat">Flat</option> 
                                    <option value="Variable">Variable</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label>Amount</label>
                                <input className="form-control" type="text" name="amount" placeholder="Amount ot be charged" required value={this.state.amount} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Remarks</label>
                                <textarea className="form-control" type="text" placeholder="Remarks" name="remarks" value={this.state.remarks} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="my-btn">
                            <button className="vaidam-btn" type="submit">Submit</button> 
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Coupon Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateCoupon}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Region</label>
                                <select className="form-control" required value={this.state.region} onChange={this.onChange} name="region">
                                    <option>Select type of region</option>
                                    <option value="State">State</option> 
                                    <option value="City">City</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label>Name</label>
                                <input className="form-control" type="text" name="name" placeholder="Name of region" required value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>Type</label>
                                <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                    <option>Type of Shipping charge</option>
                                    <option value="Flat">Flat</option> 
                                    <option value="Variable">Variable</option>
                                </select>
                            </div>
                            <div className="col-sm-3">
                                <label>Amount</label>
                                <input className="form-control" type="text" name="amount" placeholder="Amount ot be charged" required value={this.state.amount} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Remarks</label>
                                <textarea className="form-control" type="text" placeholder="Remarks" name="remarks" value={this.state.remarks} onChange={this.onChange}/>
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
export default AdminShipping