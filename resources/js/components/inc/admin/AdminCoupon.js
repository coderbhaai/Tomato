import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import moment from "moment"

class AdminCoupon extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            coupons:                [],
            type:                   '',
            from:                   '',
            to:                     '',
            amount:                 '',
            remarks:                '',
            currentPage:            1,
            itemsPerPage:           10
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    componentDidMount(){
        axios.get('/api/v1/getCoupon').then(response =>{ this.setState({ coupons: response.data.data }) }) 
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

    addCoupon = (e) => {
        e.preventDefault()
        const data={
            code:                   this.state.code.toUpperCase(),
            type:                   this.state.type,
            from:                   this.state.from,
            to:                     this.state.to,
            amount:                 this.state.amount,
            remarks:                this.state.remarks
        }
        axios.post('/api/v1/addCoupon', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Coupon not added due to error")
            })
            .then( res=> {
                if(res.data.success){
                    this.setState({ coupons: [...this.state.coupons, res.data.data ] })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }
    
    editModalOn = (i)=>{
        this.setState({
            editmodalIsOpen:        true,
            code:                   i.code,
            type:                   i.type,
            from:                   i.from,
            to:                     i.to,
            amount:                 i.amount,
            remarks:                i.remarks,
            selectedCoupon:         i.id  
        })        
    }

    updateCoupon = (e) => {
        e.preventDefault()
        const data={
            id:                     this.state.selectedCoupon,
            code:                   this.state.code.toUpperCase(),
            type:                   this.state.type,
            from:                   this.state.from,
            to:                     this.state.to,
            amount:                 this.state.amount,
            remarks:                this.state.remarks
        }               
        axios.post('/api/v1/updateCoupon', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Coupon not updated due to error")
            })
            .then( res=> {
                console.log('res.data', res)
                if(res.data.success){
                    this.setState({ coupons: this.state.coupons.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.coupons.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{i.type}</td>
                    <td>{i.code}</td>
                    <td>{moment(i.from).format("DD MMMM  YYYY")} - {moment(i.to).format("DD MMMM  YYYY")}</td>
                    <td>{i.amount}</td>
                    <td>{i.remarks}</td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.coupons.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        
        return (
            <>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel</span>(Coupons)</h1>
                    <div className="row admin">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <button className="vaidam-btn" onClick={this.addModalOn}>Add Coupon</button>
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
                                        <td>Code</td>
                                        <td>Dates</td>
                                        <td>Amount</td>
                                        <td>Remarks</td>
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
                        <h2>Add coupon here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.addCoupon}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Type of Coupon</label>
                                <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                    <option>Select coupon type</option>
                                    <option value="cash">Cash Discount</option> 
                                    <option value="slash">Slash the bill (%)</option>
                                </select>
                            </div>
                            <div className="col-sm-2">
                                <label>Code</label>
                                <input className="form-control" type="text" name="code" required value={this.state.code} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <label>From</label>
                                <input className="form-control" type="date" name="from" required value={this.state.from} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <label>To</label>
                                <input className="form-control" type="date" name="to" required value={this.state.to} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>Amount</label>
                                <input className="form-control" type="number" placeholder="Enter the amount or % with no symbols" name="amount" required value={this.state.amount} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Remarks</label>
                                <textarea className="form-control" type="text" placeholder="Remarks" name="remarks" required value={this.state.remarks} onChange={this.onChange}/>
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
                                <label>Type of Coupon</label>
                                <select className="form-control" required value={this.state.type} onChange={this.onChange} name="type">
                                    <option>Select coupon type</option>
                                    <option value="cash">Cash Discount</option> 
                                    <option value="slash">Slash the bill (%)</option>
                                </select>
                            </div>
                            <div className="col-sm-2">
                                <label>Code</label>
                                <input className="form-control" type="text" name="code" required value={this.state.code} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <label>From</label>
                                <input className="form-control" type="date" name="from" required value={this.state.from} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <label>To</label>
                                <input className="form-control" type="date" name="to" required value={this.state.to} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-3">
                                <label>Amount</label>
                                <input className="form-control" type="number" placeholder="Enter the amount or % with no symbols" name="amount" required value={this.state.amount} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Remarks</label>
                                <textarea className="form-control" type="text" placeholder="Remarks" name="remarks" required value={this.state.remarks} onChange={this.onChange}/>
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
export default AdminCoupon