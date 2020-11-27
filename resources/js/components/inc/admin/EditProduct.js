import React, { Component } from 'react'
import CKEditor from 'ckeditor4-react'
import {connect} from 'react-redux'
// import { updateProduct } from '../actions/adminActions'

// CKEditor.editorUrl = 'http://tomato.xyz/ckeditor/ckeditor.js';
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
            prodCat:           []
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
        this.onEditorChange1 = this.onEditorChange1.bind( this )
        this.onEditorChange2 = this.onEditorChange2.bind( this )
    }
    
    componentDidMount(){
        const url= this.props.match.params.url
        axios.get('/api/v1/fetchProduct/' + url)
        .then(response =>{
            this.setState({
                product:                            response.data.datax[0],
                // images:                             JSON.parse(response.data.datax[0].images),
                name:                               response.data.datax[0].name,
                url:                                response.data.datax[0].url,
                category:                           response.data.datax[0].category,
                short_desc:                         response.data.datax[0].short_desc,
                long_desc:                          response.data.datax[0].long_desc,
                images:                             response.data.datax[0].images,
                qty:                                response.data.datax[0].qty,
                price:                              response.data.datax[0].price,
                sku:                                response.data.datax[0].sku,
            })
        })
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
        const datafile = new FormData()
        if(this.state.images){
            for(const f of this.state.images){
                datafile.append('images[]', f)
            }
        }
        datafile.append('name', this.state.name)
        datafile.append('url', this.state.url)
        datafile.append('category', this.state.category)
        datafile.append('short_desc', this.state.short_desc)
        datafile.append('long_desc', this.state.long_desc)
        datafile.append('qty', this.state.qty)
        datafile.append('price', this.state.price)
        datafile.append('sku', this.state.sku)
        this.props.updateProduct(datafile)
        // this.props.history.push('/adminSights') 
    } 

    render() {
        return (
            <div className="container admin my-5">
                <h1 className="heading">Add Product</h1>
                <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                    <div className="row">
                        <div className="col-sm-6">
                            <input className="form-control" type="text" name="name" required="" placeholder="Name of Product" value={this.state.name} onChange={this.onChange}/>
                            <label>Name of Sightseeing</label>
                        </div>
                        <div className="col-sm-3">
                            <input className="form-control" type="text" name="url" required="" placeholder="Add URL" value={this.state.url} onChange={this.onChange}/>
                            <label>URL</label>
                        </div>
                        <div className="compare col-sm-3">
                            <select className="form-control" required value={this.state.category} onChange={this.onChange} name="category">
                                <option>Select Category</option>
                                <option value="fruit">Fruit</option> 
                                <option value="vegetables">Vegetables</option>
                            </select>
                            <label>Category</label>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } value={this.state.short_desc} short_desc={this.state.short_desc} onChange={this.onEditorChange1}/>

                            {this.state.short_desc}
                            <label>Short Description</label>
                        </div>
                        <div className="col-sm-6 mt-3">
                            <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } 


                            
                            
                            
                            
                            data={this.state.long_desc} long_desc={this.state.long_desc} onChange={this.onEditorChange2}/>
                            {this.state.long_desc}
                            <label>Long Description</label>
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

const mapStateToProps = state =>({
})

const mapDispatchToProps = dispatch => ({
    updateProduct:            datafile=> dispatch(updateProduct(datafile)),
})

 export default connect( mapStateToProps, mapDispatchToProps)(AddProduct)