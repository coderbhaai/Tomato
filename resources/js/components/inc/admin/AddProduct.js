import React, { Component } from 'react'
import CKEditor from 'ckeditor4-react'
// import {connect} from 'react-redux'
// import { addProduct } from '../actions/adminActions'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'

export class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               '',
            url:                '',
            category:           '',
            short_desc:         '',
            long_desc:          '',
            qty:                [],
            price:              [],
            sku:                [],
            images:             null,
            prodCat:            [],
            sale:               ''
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
        this.onEditorChange1 = this.onEditorChange1.bind( this )
        this.onEditorChange2 = this.onEditorChange2.bind( this )
    }

    componentDidMount(){
        axios.get('/api/v1/productCategory').then(response =>{ this.setState({ prodCat: response.data.basicOptions }) })
        window.scrollTo(0, 0)
    }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    onEditorChange1( evt1 ) { this.setState( { short_desc: evt1.editor.getData() } ) }
    onEditorChange2( evt2 ) { this.setState( { long_desc: evt2.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { short_desc: changeEvent1.target.value } ) }
	handleChange2( changeEvent2 ) { this.setState( { long_desc: changeEvent2.target.value } ) }
    imagesAdd = (e) =>{ this.setState({ images: e.target.files }) }

    addQPS(e){
        this.setState({qty: [...this.state.qty, ""]})
        this.setState({price: [...this.state.price, ""]})
        this.setState({sku: [...this.state.sku, ""]})
    }

    arrayQtyChange(e, index){
        this.state.qty[index] = e.target.value
        this.setState({qty: this.state.qty})
    }

    arrayPriceChange(e, index){
        this.state.price[index] = e.target.value
        this.setState({price: this.state.price})
    }

    arraySkuChange(e, index){
        this.state.sku[index] = e.target.value
        this.setState({sku: this.state.sku})
    }

    removeQPS(index){
        this.state.qty.splice(index, 1)
        this.setState({qty: this.state.qty})
        this.state.price.splice(index, 1)
        this.setState({price: this.state.price})
        this.state.sku.splice(index, 1)
        this.setState({sku: this.state.sku})
    }

    submitHandler = (e) =>{
        e.preventDefault()
        const data = new FormData()
        if(this.state.images){
            for(const f of this.state.images){
                data.append('images[]', f)
            }
        }
        var skuFinal = []
        for (var i = 0; i < this.state.qty.length; i++) {
            skuFinal.push( JSON.stringify( [this.state.qty[i], this.state.price[i], this.state.sku[i]] ) )
        } 
        data.append('name', this.state.name)
        data.append('url', this.state.url)
        data.append('sale', this.state.sale)
        data.append('category', this.state.category)
        data.append('short_desc', this.state.short_desc) 
        data.append('long_desc', this.state.long_desc)
        data.append('sku', JSON.stringify( skuFinal ) )
        axios.post('/api/v1/addProduct', data)
            .catch(err=>console.log('err', err))
            .then(res=>{
                if(res.data.success){
                    this.props.history.push('/adminProducts')
                }
            })
    }
    
    categorySelected = (e, {value}) => { this.setState({ category: value }) }

    render() {
        console.log('this.state', this.state)
        return (
            <div className="container admin my-5">
                <h1 className="heading">Add Product</h1>
                <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="col-sm-3">
                            <label>Name of Product</label>
                            <input className="form-control" type="text" name="name" required="" placeholder="Name of Product" value={this.state.name} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-2">
                            <label>URL</label>
                            <input className="form-control" type="text" name="url" required="" placeholder="Add URL" value={this.state.url} onChange={this.onChange}/>
                        </div>
                        <div className="compare col-sm-3">
                            <label>Category</label>
                            <Dropdown placeholder='Select category' fluid search selection onChange={this.categorySelected} options={this.state.prodCat}/>
                        </div>
                        <div className="col-sm-4">
                            <label>Sale (Leave blank if no sale)</label>
                            <textarea className="form-control" type="text" name="sale" required="" placeholder="Sale Information" value={this.state.sale} onChange={this.onChange}/>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <label>Short Description</label>
                            <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } short_desc={this.state.short_desc} onChange={this.onEditorChange1}/>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <label>Long Description</label>
                            <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } long_desc={this.state.long_desc} onChange={this.onEditorChange2}/>
                        </div>
                        <div className="col-sm-12 my-5">
                            <input className="form-control" name="images" type="file" multiple onChange={this.imagesAdd}/>
                        </div>
                        <div className="col-sm-12">
                            <button className="action-btn" id="addHidden" type="button" onClick={(e)=>this.addQPS(e)}><i className="glyphicon glyphicon-plus"></i> Add Quantity, Price and SKU</button>
                            <label>Click to add details</label>
                            <div id="addHiddenBox" className="row">
                                <div className="col-sm-4 boxAdded">
                                    { this.state.qty.map((j, index) =>{ return( 
                                        <div key={index}>  
                                            <label>Quantity</label>
                                            <div className="" key={index}>
                                                <input className="form-control" type="text" placeholder="Add Quantity" name="qty"rows="10" value={j} required onChange={(e)=>this.arrayQtyChange(e, index)}/>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                                <div className="col-sm-4 boxAdded">
                                    { this.state.price.map((j, index) =>{ return( 
                                        <div key={index}>  
                                            <label>Price</label>
                                            <div className="" key={index}>
                                                <input className="form-control" type="text" placeholder="Add Price" name="price" rows="10" required value={j} onChange={(e)=>this.arrayPriceChange(e, index)}/>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                                <div className="col-sm-4 boxAdded flex-v">
                                    { this.state.sku.map((k, index) =>{ return(  
                                        <div key={index}>      
                                            <label>SKU</label>
                                            <div className="form-group" key={index}>
                                                <input className="form-control" type="text" placeholder="Enter SKU" name="days" value={k} onChange={(e)=>this.arraySkuChange(e, index)}  />
                                                <button className="btn btn-danger removeText flex-h" type="button" onClick={()=>this.removeQPS(index)}><img src="/images/icons/wrong-white.svg" alt="Travel guide to India"/></button>
                                            </div>
                                        </div>
                                    )})}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-div my-5">
                        <button className="action-btn">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddProduct
// const mapStateToProps = state =>({
// })

// const mapDispatchToProps = dispatch => ({
//     addProduct:            data=> dispatch(addProduct(data))
// })

//  export default connect( mapStateToProps, mapDispatchToProps)(AddProduct)