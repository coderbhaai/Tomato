import React, { Component } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from 'axios'
import { connect } from 'react-redux'
import { newUser } from '../inc/actions/userActions'
import { Link, Redirect } from 'react-router-dom'

const block = [
    'sex',
    'girl',
    'porn',
    'nude',
    'horny',
    'bitch',
    'Viagra',
    'Gambling',
    'Cryptocurrencies',
    'Cryptocurrency',
    '$',
    'Bitcoin',
    'USD',
    'www',
    'htttp'
]

export class Cart extends Component {    
    constructor(props) {
        super(props)    
        this.state = {
            products:              [],
            cart:                  JSON.parse(localStorage.getItem('myCart')) || [],
            cartItems:             [],
            prices:                [],
            coupon:                '',
            discount:              0,
            discountRemarks:       '',
            name:                  '',
            email:                 '',
            phone:                 '',
            country:               'India',
            state:                 '',
            city:                  '',
            address:               '',
            pin:                   '',
            message:               '',
            total:                 '',
            stateShip:             [],
            cityShip:              [],
            stateShipping:         0,
            cityShipping:          0
            // name:                  'Amit',
            // email:                 'test@test.com',
            // phone:                 '8424003840',
            // address:               'GGN',
            // pin:                   '122002',
            // message:               'test'
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0)
        axios.get('/api/v1/getShipping')
            .catch(err=>console.log('err', err))
            .then(res=>{
                console.log('res', res)
                this.setState({
                    stateShip:          res.data.stateShip,
                    cityShip:           res.data.cityShip
                })
            })

        this.totalBill()
    }
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    stateShipping= (e) => { this.setState({ state : e.target.value },()=>this.checkForShipping()) }
    cityShipping= (e) => { this.setState({ city : e.target.value },()=>this.checkForShipping()) }

    checkForShipping=()=>{
        if( this.state.stateShip.some( i => i.name.toUpperCase() === this.state.state.toUpperCase() )){
            this.state.stateShip.map( i => i.name.toUpperCase() === this.state.state.toUpperCase() ?
            <>{ this.setState({ stateShipping: i.amount },()=>this.totalBill())} </> : null)
        }else{
            this.setState({ stateShipping: 0 },()=>this.totalBill())
        }

        if( this.state.cityShip.some( i => i.name.toUpperCase() === this.state.city.toUpperCase())){
            this.state.cityShip.map( i => i.name.toUpperCase() === this.state.city.toUpperCase() ?
            <>{ this.setState({ cityShipping: i.amount },()=>this.totalBill())} </> : null)
        }else{
            this.setState({ cityShipping: 0 },()=>this.totalBill())
        }
    }

    changeQty=( i, e , index)=>{
        if( this.state.cart.some( j => j[0] === parseInt(i[0]) && j[1] === e.target.value)){
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i[0]) && o[1] === e.target.value && o[index]!= index){
                    o[2]= o[2] + i[2]
                }
            })
            this.state.cart.splice(index, 1)
        }else{
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i[0]) && o[1] === i[1]  ){
                    o[1]= e.target.value
                    JSON.parse(i[5]).forEach((k)=>{
                        if( JSON.parse(k)[0] === e.target.value ){ o[3]= JSON.parse(k)[1] }
                    })
                }
            })
        } 
        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
        this.totalBill()
    }

    changeUnit=(i, e)=>{
        this.state.cart.forEach((o, index)=>{
            if( o[0] === parseInt(i[0]) && o[1] === i[1] ){
                o[2]= parseInt( e.target.value )
            }
        })
        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
        this.totalBill()
    }

    removeItem=(index)=>{
        this.state.cart.splice(index, 1)
        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
        this.totalBill()
    }

    payment=(e)=>{
        e.preventDefault()
        var total = 0;
        for (var i=0; i<this.state.cart.length; i++) { total += parseInt( this.state.cart[i][2] )*parseInt(this.state.cart[i][3]) }
        var datax = new FormData()
        datax.append('purpose', 'Order placement')
        datax.append('amount', total)
        datax.append('phone', this.state.phone)
        datax.append('buyer_name', this.state.name)
        datax.append('email', this.state.email)
        datax.append('user', JSON.stringify( [ this.state.address, this.state.pin, this.state.message ] ) )
        datax.append('redirect_url', 'http://tomato.xyz/order/')
        var config = {
          method: 'post',
          url: 'https://cors-anywhere.herokuapp.com/https://test.instamojo.com/api/1.1/payment-requests/ ',
          headers: { 
            'X-Api-Key': 'test_490656d5feb81f9d197d50875c9', 
            'X-Auth-Token': 'test_f59ec6dfc73bf5466a890183a4d', 
            'X-Requested-With': 'XMLHttpRequest'
          },
          data : datax
        };
        
        axios(config)
        .catch(err=>console.log('err', err))
        .then(res=>{
            if(res.data.success){ 
                var total = 0;
                for (var i=0; i<this.state.cart.length; i++) { total += parseInt( this.state.cart[i][2] )*parseInt(this.state.cart[i][3]) }
                const data = new FormData()
                if(this.props.user.id){
                    data.append('userId', this.props.user.id )
                }
                data.append('user', JSON.stringify( [ this.state.name, this.state.email, this.state.phone, this.state.address, this.state.pin, this.state.message ] ))
                data.append('order', JSON.stringify(this.state.cart) )
                data.append('total', total )
                data.append('name', this.state.name)
                data.append('email', this.state.email)
                data.append('paymentId', res.data.payment_request.id)
                data.append('longurl', res.data.payment_request.longurl)
                data.append('status', 'Unpaid')
                axios.post('/api/v1/postOrder', data)
                    .catch(err2=>console.log('err2', err2))
                    .then(res2=>{
                        console.log('res.data from order', res2.data)
                        if(res2.data.success){
                            localStorage.clear()
                            if(res2.data.newUser){
                                this.props.newUser(res2.data.newUser)
                            }
                            window.open(res.data.payment_request.longurl, '_blank')
                            this.props.history.push('/shop')
                        }
                    })
            }
        })
        
    }

    checkCoupon=(e)=>{
        console.log('this.state.coupon', this.state.coupon)
        axios.get( '/api/v1/checkCoupon/'+ this.state.coupon.toUpperCase() )
            .catch(err=>console.log('err', err))
            .then(res=>{
                console.log('res.data', res.data)
                this.setState({
                    discount:           res.data.discount,
                    discountRemarks:    res.data.response,
                },()=>this.totalBill())
            })
        
    }

    totalBill=()=>{
        var shippingCharges = 0
        if(this.state.stateShipping< this.state.cityShipping){
            var shippingCharges = parseInt( this.state.cityShipping )
            this.setState({
                shippingCharges: this.state.cityShipping
            })
        }else{
            var shippingCharges = parseInt( this.state.stateShipping )
            this.setState({
                shippingCharges:  this.state.stateShipping
            })
        }
        var bill = this.state.cart.reduce( function(cnt, i){ return cnt + i[2]*i[3]  }, 0)
        this.setState({
            total:          bill - this.state.discount + shippingCharges
        })
    }

    render() {
        if(!this.state.cart.length>0){ return <Redirect to="/shop" /> }
        // const imgPath = "/tomato/storage/app/public/product/"
        const imgPath = "/storage/product/"
        return (
            <div className="container my-5">
                <h1 className="heading">Cart</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <table className="table table-hover table-responsive">
                            <thead>
                                <tr>
                                    <td>Sl no.</td>
                                    <td>Item Name</td>
                                    <td>Image</td>
                                    <td>Quantity</td>
                                    <td>No. of Items</td>
                                    <td>Rate</td>
                                    <td>Cost</td>
                                    <td>Remove</td>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.cart.map((i, index)=>{ return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td><Link to={"/product/"+i[6]}>{i[4]}</Link></td>
                                        <td className="text-center"><LazyLoadImage src={imgPath + i[7]} style={{maxWidth:'50px'}} /></td>
                                        <td className="mAuto">
                                            <select className="form-control" required value={i[1]} onChange={(e)=>this.changeQty(i, e, index)}>
                                                { JSON.parse(i[5]).map((j, index)=>(
                                                    <option value={JSON.parse(j)[0]} key={index}>{JSON.parse(j)[0]}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="mAuto">
                                            <input type='number' className="form-control unit" required value={i[2]} onChange={(e)=>this.changeUnit( i, e)}/>
                                        </td>
                                        <td className="text-center">&#8377;{i[3]}</td>
                                        <td className="text-center">&#8377;{i[2]*i[3]}</td>
                                        <td className="text-center"><img className="remove" src="/images/icons/wrong-red.svg" onClick={()=>this.removeItem(index)}/></td>
                                    </tr>
                                )})}
                                { this.state.cart.length>0 ?
                                <tr>
                                    <td className="text-center" colSpan="6"><strong>Total</strong></td>
                                    <td className="text-center"><strong>&#8377;{ this.state.cart.reduce( function(cnt, i){ return cnt + i[2]*i[3]; }, 0) }</strong></td>
                                </tr>
                                : null}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12">
                        <label><strong>Apply Coupon</strong></label>
                        <div className="couponCode">
                            <input className="form-control" type="text" name="coupon" required placeholder="Coupon Code" value={this.state.coupon} onChange={this.onChange}/>
                            <div className="">
                                <button className="vaidam-btn" onClick={this.checkCoupon}>Apply coupon</button>
                            </div>
                        </div>
                        { this.state.discount ?
                            <p>We are happy to provide you discount of <strong>&#8377;{this.state.discount}</strong></p> 
                            :
                            <p>{this.state.discountRemarks}</p>
                        }
                        <h3>Invoice:  : &#8377;{this.state.total}</h3>
                        
                    </div>
                </div>
                <form encType="multipart/form-data" onSubmit={this.payment} className="my-5">
                    <h2 className="heading">Shipping Address</h2>
                    <p className="text-center">Please note: Shipping charges apply as per region. You can check the complete list of <Link target="_blank" to="/shipping">shipping charges</Link>.</p>
                    <div className="row shipping">
                        <div className="col-sm-6">
                            <label>Name</label>
                            <input className="form-control" type="text" name="name" required placeholder="Name Please" value={this.state.name} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-3">
                            <label>Email</label>
                            <input className="form-control" type="email" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/> 
                        </div>
                        <div className="col-sm-3">
                            <label>Phone</label>
                            <input className="form-control" type="text" name="phone" required placeholder="Phone Please" value={this.state.phone} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-4">
                            <label>Country</label>
                            <input className="form-control" type="text" name="country" required placeholder="Country" value={this.state.country} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-4">
                            <label>State</label>
                            <input className="form-control" type="text" name="state" required placeholder="State" value={this.state.state} onChange={this.stateShipping}/>
                        </div>
                        <div className="col-sm-4">
                            <label>City</label>
                            <input className="form-control" type="text" name="city" required placeholder="City" value={this.state.city} onChange={this.cityShipping}/>
                        </div>
                        <div className="col-sm-9">
                            <label>Address</label>
                            <input className="form-control" type="text" name="address" required placeholder="Shipping Addrress Please" value={this.state.address} onChange={this.onChange}/> 
                        </div>
                        <div className="col-sm-3">
                            <label>PIN Code</label>
                            <input className="form-control" type="text" name="pin" required placeholder="Postal PIN Please" value={this.state.pin} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-12">
                            <label>Message</label>
                            <textarea type="text" name="message" required className="form-control" placeholder="Message" value={this.state.message} onChange={this.onChange}></textarea>
                        </div>
                        <div className="col-sm-12 mt-3">
                            { this.state.shippingCharges ?
                                <p>Shipping charges of <strong>&#8377;{this.state.shippingCharges}</strong> applicable </p>
                            : null }
                            <h3>Final Amount : {this.state.total}</h3>
                        </div>
                        <div className="my-5">
                            <button className="vaidam-btn">Proceed to Payment</button>
                        </div>
                    </div>
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
export default connect( mapStateToProps, mapDispatchToProps)(Cart)
