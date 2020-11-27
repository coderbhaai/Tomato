import React, { Component } from 'react'
import ImageGallery from '../inc/parts/ImageGallery'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Swiper from '../inc/parts/swiper'

export class Product extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product:               [],
             images:                [],
             related:               [],
             cart:                  JSON.parse(localStorage.getItem('myCart')) || [],
        }
    }
    
    componentDidMount(){
        const url= this.props.match.params.url
        this.getData(url)
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if (nextProps.match.params.url !== this.props.match.params.url){
            const url = nextProps.match.params.url; this.getData(url); 
        }
    }

    getData=(url)=>{
        axios.get('/api/v1/fetchProduct/'+ url).then(res =>{
            console.log('res.data', res.data)
            this.setState({ 
                product:        res.data.product,
                images:         JSON.parse(res.data.product.images),
                related:        res.data.related
            }) })
        window.scrollTo(0, 0)
    }

    addToCart=(i)=>{
        var item = [i.id, i.qtySelected, 1, i.priceSelected, i.name, i.sku, i.url, JSON.parse(i.images)[0], i.sale ]
        if( this.state.cart.some( j => j[0] === parseInt(i.id) && j[1] === i.qtySelected )){
            this.state.cart.forEach((o)=>{
                if( o[0] === parseInt(i.id) && o[1] === i.qtySelected ){ o[2]++ }
            })
            this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
        }else{
            this.setState({ cart: [...this.state.cart, item] },()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
        }
    }

    removeFromCart=(i)=>{
        if( this.state.cart.some( j => j[0] === parseInt(i.id) && j[1] === i.qtySelected )){
            this.state.cart.forEach((o, index)=>{
                if( o[0] === parseInt(i.id) && o[1] === i.qtySelected ){
                    if(o[2]>1){ o[2]-- }else{ this.state.cart.splice(index, 1) }
                }
            })
        }
        this.setState({cart: this.state.cart},()=>localStorage.setItem('myCart', JSON.stringify(this.state.cart)))
    }

    qtyChanged=(e)=>{
        this.state.product.qtySelected= e.target.value
        JSON.parse( this.state.product.sku ).forEach((x)=>{
            if( JSON.parse(x)[0] === e.target.value){
                this.state.product.priceSelected = parseInt( JSON.parse(x)[1] )
            }
        })
        this.setState({product: this.state.product})
    }

    render() {
        // const imgPath = "/tomato/storage/app/public/product/"
        const imgPath = "/storage/product/"
        const images = this.state.images.map((k) => { return ({ original: imgPath + k, thumbnail: imgPath + k} )})

        return (
            <div className="container my-5">
                <h1 className="heading">{this.state.product.name}</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <ImageGallery items={images} />
                    </div>
                    <div className="col-sm-8 singleProduct">
                        <h2>{this.state.product.catName}</h2>
                        <section dangerouslySetInnerHTML={{ __html: this.state.product.short_desc }}/>
                            <div className="cartBtn">
                                <select className="form-control" onChange={(e)=>this.qtyChanged(e)}>
                                    {this.state.product.sku ?
                                        JSON.parse( this.state.product.sku ).map((j, index)=>(
                                            <option key={index}>{JSON.parse(j)[0]}</option>
                                        ))
                                    :null}
                                </select>
                                <div>
                                    <img src="/images/icons/minus.svg" alt="" onClick={()=>this.removeFromCart(this.state.product)}/>
                                    <img src="/images/icons/plus.svg" alt="" onClick={()=>this.addToCart(this.state.product)}/>
                                </div>
                            </div>
                            <p><strong>Price - Rs. {this.state.product.priceSelected}</strong></p>
                    </div>
                    <div className="col-sm-12">
                        <section dangerouslySetInnerHTML={{ __html: this.state.product.long_desc }}/>
                    </div>
                </div>
                <h2 className="heading my-5">Related Products</h2>
                    { this.state.related.length>0 ? <Swiper data={this.state.related} related={true}/> : null }
            </div>
        )
    }
}
export default Product