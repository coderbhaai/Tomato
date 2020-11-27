import React, { Component } from 'react'
import { Modal } from 'reactstrap';
import AdminSidebar from './AdminSidebar'
import swal from 'sweetalert'
import CKEditor from 'ckeditor4-react'

class AdminOrders extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            orders:                 [],
            remarks:                '',
            selectedOrder:          '',
            user:                   '',
            currentPage:            1,
            itemsPerPage:           10,
        }
        this.handleChange1 = this.handleChange1.bind( this )
		this.onEditorChange1 = this.onEditorChange1.bind( this )
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value })}
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    onEditorChange1( evt1 ) { this.setState( { remarks: evt1.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { remarks: changeEvent1.target.value } ) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    componentDidMount(){
        axios.get('/api/v1/getAdminOrders').then(res =>{
            console.log('res.data', res.data)
            this.setState({ orders: res.data.data }) }) 
        window.scrollTo(0, 0)
    }

    addModalOn = ()=>{ this.setState({ addmodalIsOpen: true }) }

    resetData = ()=>{
        this.setState({
            editmodalIsOpen:            false,
            remarks:                    '',
            selectedOrder:              '',
            user:                       ''
        })
    }

    editModalOn = (i)=>{
        console.log('i', i)
        this.setState({
            editmodalIsOpen:            true,
            selectedOrder:              i.id,
            remarks:                    i.remarks,
            user:                       JSON.parse(i.user)[0]
        })        
    }

    updateMeta = (e) => {
        e.preventDefault()
        const data={
            id:                 this.state.selectedOrder,
            remarks:            this.state.remarks
        }
        console.log('data', data)        
        axios.post('/api/v1/updateOrder', data)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Order not updated due to error")
            })
            .then( res=> {
                if(res.data.success){
                    this.setState({ orders: this.state.orders.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
                }
                this.callSwal(res.data.response)
            })
        this.resetData()
    }

    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.orders.slice(indexOfFirstItem, indexOfLastItem).map((i, index) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        Name: {JSON.parse(i.user)[0]}<br/>
                        Email: {JSON.parse(i.user)[1]}<br/>
                        Phone: {JSON.parse(i.user)[2]}<br/>
                        Address: {JSON.parse(i.user)[3]}<br/>
                        PIN: {JSON.parse(i.user)[4]}<br/>
                        Message: {JSON.parse(i.user)[5]}<br/>
                    </td>
                    <td>
                        {JSON.parse( i.order).map((j,index2)=>(<p key={index2}>{j[4]} ({j[1]}) @ &#8377;{j[3]} X {j[2]} Units = &#8377;{parseInt(j[3])*parseInt(j[2])}</p>))}<br/>
                        Total = <strong>&#8377;{i.total}</strong>
                    </td>
                    <td>
                        {i.status==='Unpaid' ? "Payment not done" 
                        : 
                        <>
                            Status:     {JSON.parse(i.payment)[1]},<br/>
                            Id:         {JSON.parse(i.payment)[0]}<br/>
                            reqId:      {JSON.parse(i.payment)[2]}
                        </>
                        }
                    </td>
                    <td>{i.status}</td>
                    <td><section dangerouslySetInnerHTML={{ __html: i.remarks }} /></td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.orders.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        
        return (
            <>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel </span>(Orders)</h1>
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
                                        <td>User</td>
                                        <td>Orders</td>
                                        <td>Payment</td>
                                        <td>Status</td>
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
                <Modal isOpen={this.state.editmodalIsOpen} className="adminModal"> 
                    <div className="modal-header">
                        <h2>Update Order status Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form className="modal-form" encType="multipart/form-data" onSubmit={this.updateMeta}>
                        <div className="row">
                            <div className="col-sm-12 order">
                                <label>Remarks</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data ={this.state.remarks}  remarks= {this.state.remarks} onChange={this.onEditorChange1} />
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
export default AdminOrders