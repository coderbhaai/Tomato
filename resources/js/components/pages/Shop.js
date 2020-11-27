import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { itemAdded } from '../inc/actions/adminActions'
import { connect } from 'react-redux'
import swal from 'sweetalert'

export class Shop extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            products:              [],
            cart:                  JSON.parse(localStorage.getItem('myCart')) || [],
            count:                  0
        }
    } 
    
    componentDidMount(){
        if(this.props.match.params.category){
            var name = this.props.match.params.category;
        }else{
            var name = 'All'
        }
        axios.get('/api/v1/fetchCatItems/'+name)
            .then(res =>{
                this.setState({ 
                    products:       res.data.data,
                    name:           res.data.name
                })
            })
        window.scrollTo(0, 0)
    }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.match.params.category && nextProps.match.params.item){
            axios.get('/api/v1/fetchCatItems/'+nextProps.match.params.category+"/"+nextProps.match.params.item)
            .then(res =>{
                this.setState({ products: res.data.datax, name: res.data.name }) })

        }else{
            if(nextProps.match.params.url){
                axios.get('/api/v1/fetchProducts/'+nextProps.match.params.url).then(res =>{ this.setState({ products: res.data.datax, name: res.data.name }) })
            }else{
                axios.get('/api/v1/fetchProducts/All').then(res =>{ this.setState({ products: res.data.datax, name: res.data.name }) })
            }
        }
    }

    addToCart=(i)=>{
        var item = [i.id, i.qtySelected, 1, i.priceSelected, i.name, i.sku, i.url, JSON.parse(i.images)[0], i.sale ]
        if( this.state.cart.some( j => j[0] === parseInt(i.id) && j[1] === i.qtySelected )){
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i.id) && o[1] === i.qtySelected ){ 
                    o[2]++
                    this.callSwal(o[4]+" in cart increased to "+o[2])
                }
            })
            this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
        }else{
            this.setState({ cart: [...this.state.cart, item] },()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
            this.callSwal(i.name + " added to cart ")
        }
    }

    removeFromCart=(i)=>{
        if( this.state.cart.some( j => j[0] === parseInt(i.id) && j[1] === i.qtySelected )){
            this.state.cart.forEach((o, index)=>{
                if( o[0] === parseInt(i.id) && o[1] === i.qtySelected ){
                    if(o[2]>1){ 
                        o[2]--
                        this.callSwal(i.name + " in cart reduced to "+ o[2])
                    }else{ 
                        this.state.cart.splice(index, 1)
                        this.callSwal(i.name + " removed from cart ")
                    }
                }
            })
        }
        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
    }

    qtyChanged=(i, e)=>{
        this.state.products.forEach((o)=>{
            if( o.id === parseInt(i.id) ){
                console.log('e.target.value', e.target.value)
                o.qtySelected= e.target.value
                JSON.parse( o.sku ).forEach((x)=>{
                    if( JSON.parse(x)[0] === e.target.value){
                        o.priceSelected = parseInt( JSON.parse(x)[1] )
                    }
                })
            }
        })
        this.setState({products: this.state.products})
    }

    render() {
        console.log('this.state.products', this.state.products)
        console.log('this.state.cart', this.state.cart)
        // const imgPath = "/tomato/storage/app/public/product/"
        const imgPath = "/storage/product/"
        return (
            <div className="container products shop my-5">
                <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: this.state.name }} />
                <div className="row product">
                    { this.state.products.map((i, index)=>{
                        return (
                            <div className="col-sm-3" key={index}>
                                <div className="card">
                                    <Link to={"/product/" + i.url}>
                                        <div className="img">
                                            <img src={imgPath + JSON.parse( i.images)[0]}/>
                                            { this.state.cart.some(x => x[0] === i.id) ?
                                                <div className="itemAdded">
                                                    { this.state.cart.map((o, index) => (
                                                        <p key={index}>
                                                            { o[0] === i.id ?
                                                                    <>{o[1]} X Rs.{o[3]}X {o[2]}unit = Rs.{o[2]*o[3]}</>
                                                            : null}
                                                        </p>
                                                    ))}
                                                    <p>Added to Cart</p>
                                                </div>
                                            : null}
                                        </div>
                                    </Link>
                                    <Link to={"/product/" + i.url}><h2>{i.name}</h2></Link>
                                    <div className="cartBtn">
                                        <select className="form-control" onChange={(e)=>this.qtyChanged(i,e)}>
                                            { JSON.parse( i.sku ).map((j, index)=>(
                                                <option key={index}>{JSON.parse(j)[0]} @ &#8377; {JSON.parse(j)[1]}</option>
                                            ))}
                                        </select>
                                        <div>
                                            { this.state.cart.some(x => x[0] === i.id) ? <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(i)}/> : null }
                                            <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(i)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )})}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
})

const mapDispatchToProps = dispatch => ({
    itemAdded:            datafile=> dispatch(itemAdded(datafile)),
})

 export default connect( mapStateToProps, mapDispatchToProps)(Shop)