import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { newUser } from '../inc/actions/userActions'
import moment from "moment"
import Invoice from '../inc/parts/Invoice'
import { PDFDownloadLink } from "@react-pdf/renderer";

export class Order extends Component {    
    constructor(props) {
        super(props)    
        this.state = {
             cart:                  JSON.parse(localStorage.getItem('myCart')) || [],
             user:                  [],
             orders:                [] 
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        const xx =  window.location.href.split("?")
        if(xx[1]){
            var paymentId = this.substrInBetween(xx[1], 'payment_id=', '&payment_status=')
            var paymentStatus = this.substrInBetween(xx[1], '&payment_status=', '&payment_request_id=')
            var paymentRequestId =  xx[1].split('=').pop().split('&payment_request_id=')[0]
            const data = new FormData()
            data.append('payment', JSON.stringify( [ paymentId, paymentStatus, paymentRequestId ] ) )
            data.append('paymentRequestId', paymentRequestId )
            axios.post('/api/v1/submitPayment', data)
                .catch(err=>console.log('err', err))
                .then(res=>{
                    if(res.data.success){
                        this.setState({
                            orders:                 res.data.orders,
                            user:                   JSON.parse( res.data.orders[res.data.orders.length - 1].user )
                        })
                        this.props.history.push('/order')
                    }
                })
        }else{
            axios.get('/api/v1/getOrders/'+this.props.user.id)
            .then(res =>{
                this.setState({ 
                    orders:                 res.data.orders,
                    user:                  JSON.parse( res.data.orders[res.data.orders.length - 1].user )
                })
            })
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }

    substrInBetween=(whole_str, str1, str2)=>{
        var strlength1 = str1.length;
        return whole_str.substring( whole_str.indexOf(str1) + strlength1, whole_str.indexOf(str2) )
    }

    render() {
        return (
            <div className="container cart my-5">
                <h1 className="heading">Your Orders</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <td>Sl no.</td>
                                    <td>Order</td>
                                    <td>Payment details</td>
                                    <td>Total</td>
                                    <td>Remarks</td>
                                    <td>Date</td>
                                    <td>Status</td>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.orders.map((i, index)=>{ return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>
                                            { JSON.parse( i.order).map((j, index2)=>(
                                                <p key={index2}><Link to={"/product/" + j[6]}>{j[4]}</Link> ({j[1]}) - &#8377;{j[3]} X {j[2]}Units = &#8377;{parseInt(j[3])*parseInt(j[2])}</p>
                                            ))}
                                        </td>
                                        <td>
                                            { i.status === 'Unpaid' ?
                                                <>Unpaid</>
                                            :
                                                <>
                                                    Status -{JSON.parse( i.payment)[1]}<br/>
                                                    Payment Id - {JSON.parse( i.payment)[0]}<br/>
                                                    Request Id- {JSON.parse( i.payment)[2]}
                                                </>
                                            }
                                        </td>
                                        <td>&#8377;{i.total}</td> 
                                        <td><section dangerouslySetInnerHTML={{ __html: i.remarks }} /></td> 
                                        <td>{moment(i.updated_at).format("DD MMMM  YYYY")}</td>
                                        <td className="myBtn">{ i.status=== 'Unpaid' ?
                                        <button><a href={i.payment} target="_blank">Pay now</a></button>
                                        : 
                                        <>
                                        {i.status}
                                        <PDFDownloadLink
                                            document={<Invoice data={i} />}
                                            fileName="Invoice.pdf"
                                            style={{ display: "block" }}
                                            >Download Invoice</PDFDownloadLink>
                                        </>
                                        }</td> 
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </div>
                <form className="my-5">
                    <h2 className="heading">Shipping Address</h2>
                    {this.state.user.length>0 ?
                        <div className="row shipping">
                            <div className="col-sm-6">
                                <label>Name</label>
                                <input className="form-control" type="text" readOnly name="name" defaultValue={this.state.user[0]}/>
                            </div>
                            <div className="col-sm-3">
                                <label>Email</label>
                                <input className="form-control" type="email" readOnly name="email" defaultValue={this.state.user[1]}/> 
                            </div>
                            <div className="col-sm-3">
                                <label>Phone</label>
                                <input className="form-control" type="text" readOnly name="phone" defaultValue={this.state.user[2]}/>
                            </div>
                            <div className="col-sm-9">
                                <label>Address</label>
                                <input className="form-control" type="text" readOnly name="address" defaultValue={this.state.user[3]}/> 
                            </div>
                            <div className="col-sm-3">
                                <label>PIN Code</label>
                                <input className="form-control" type="text" readOnly name="pin" defaultValue={this.state.user[4]}/>
                            </div>
                            <div className="col-sm-12">
                                <label>Message</label>
                                <textarea type="text" name="message" readOnly className="form-control" defaultValue={this.state.user[5]}></textarea>
                            </div>
                        </div>
                    : null}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    user:               state.admin.user,
})

const mapDispatchToProps = dispatch => ({
    newUser:           data => dispatch(newUser(data))
})
export default connect( mapStateToProps, mapDispatchToProps)(Order)