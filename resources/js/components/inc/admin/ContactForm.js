import React, { Component } from 'react'
import AdminSidebar from './AdminSidebar'
import moment from "moment"

export class ContactForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               '',               
            email:              '',
            phone:              '',
            message:            '',
            currentPage:        1,
            itemsPerPage:       10,
            contactForm:        []
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        axios.get('/api/v1/fetchContactForm').then(res =>{
            console.log('res.data', res.data)
            this.setState({ contactForm: res.data.data })
        })
    }

    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    
    render() {
        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.contactForm.slice(indexOfFirstItem, indexOfLastItem).map(i => {
            return (
                <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.email}</td> 
                    <td>{i.phone}</td> 
                    <td>{i.message}</td> 
                    <td>{moment(i.created_at).format("DD MMMM  YYYY")}</td>
                    {/* <td>{i.created_at}</td>  */}
                </tr>
            )})
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.contactForm.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <div className="container-fluid my-5">
                    <h1 className="heading"><span>Admin Panel</span>( Contact Form )</h1>
                    <div className="row admin">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <select className="form-control" required value={itemsPerPage} onChange={(e)=>this.changeitemsPerPage(e)}>
                                    <option>{itemsPerPage}</option>
                                    <option value="10">10</option> 
                                    <option value="25">25</option> 
                                    <option value="50">50</option> 
                                    <option value="100">100</option> 
                                </select>
                                <div className="flex-h">
                                    <ul className="page-numbers">{renderPagination}</ul>
                                </div>
                            </div>
                            <table className="table table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>{renderItems}</tbody>
                            </table>
                            <ul className="page-numbers">{renderPagination}</ul>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default ContactForm