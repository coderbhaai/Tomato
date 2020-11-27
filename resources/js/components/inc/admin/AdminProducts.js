import React, { Component } from 'react'
import AdminSidebar from './AdminSidebar'
import { Link } from 'react-router-dom'
import { Modal } from 'reactstrap';
import CKEditor from 'ckeditor4-react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import swal from 'sweetalert'

class AdminProducts extends Component{
    constructor(props) {
        super(props)
        this.state = {
            products:           [],
            currentPage:        1,
            itemsPerPage:       10,
            name:               '',
            url:                '',
            category:           '',
            short_desc:         '',
            long_desc:          '',
            qty:                [],
            price:              [],
            skuList:            [],
            images:             null,
            prevImages:         [],
            prevCategory:       '',
            prodCat:            [],
            sale:               ''
        }
        this.handleChange1 = this.handleChange1.bind( this )
        this.handleChange2 = this.handleChange2.bind( this )
        this.onEditorChange1 = this.onEditorChange1.bind( this )
        this.onEditorChange2 = this.onEditorChange2.bind( this )
    }

    componentDidMount(){
        axios.get('/api/v1/fetchAdminProducts').then(response =>{
            console.log('response.data', response.data)
            this.setState({ products: response.data.data })
        })
        axios.get('/api/v1/productCategory').then(response =>{
            this.setState({ prodCat: response.data.basicOptions }) })
        window.scrollTo(0, 0)
    }
    
    onEditorChange1( evt1 ) { this.setState( { short_desc: evt1.editor.getData() } ) }
    onEditorChange2( evt2 ) { this.setState( { long_desc: evt2.editor.getData() } ) }
    handleChange1( changeEvent1 ) { this.setState( { short_desc: changeEvent1.target.value } ) }
	handleChange2( changeEvent2 ) { this.setState( { long_desc: changeEvent2.target.value } ) }
    imagesAdd = (e) =>{ this.setState({ images: e.target.files }) }
    callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }
    addQPS(e){
        this.setState({qty: [...this.state.qty, ""]})
        this.setState({price: [...this.state.price, ""]})
        this.setState({skuList: [...this.state.skuList, ""]})
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
        this.state.skuList[index] = e.target.value
        this.setState({skuList: this.state.skuList})
    }
    removeQPS(index){
        this.state.qty.splice(index, 1)
        this.setState({qty: this.state.qty})
        this.state.price.splice(index, 1)
        this.setState({price: this.state.price})
        this.state.skuList.splice(index, 1)
        this.setState({skuList: this.state.skuList})
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    handleClick= (e)=> { this.setState({ currentPage: Number(e.target.id) }) }
    changeitemsPerPage = (e)=>{ this.setState({ itemsPerPage: e.target.value }) }
    categorySelected = (e, {value}) => { this.setState({ category: value }) }

    editModalOn = (i)=>{
        for (var j = 0; j < JSON.parse(i.sku).length; j++) {
            this.state.qty.push( JSON.parse( JSON.parse(i.sku)[j] )[0] )
            this.state.price.push( JSON.parse( JSON.parse(i.sku)[j] )[1] )
            this.state.skuList.push( JSON.parse( JSON.parse(i.sku)[j] )[2] )
        } 
        this.setState({
            editmodalIsOpen:            true,     
            name:                       i.name,
            url:                        i.url,
            prevCategory:               i.catName,
            category:                   i.catId,
            short_desc:                 i.short_desc,
            long_desc:                  i.long_desc,
            prevImages:                 i.images,
            selectedId:                 i.id,
            prevImages:                 JSON.parse( i.images ),
            sale:                       i.sale
        })
    }

    resetData = ()=>{
        this.setState({
            editmodalIsOpen:            false,
            name:                       '',
            url:                        '',
            category:                   '',
            prevImages:                 '',
            short_desc:                 '',
            long_desc:                  '',
            qty:                        [],
            price:                      [],
            skuList:                    [],
            images:                     null,
            prevImages:                 [],
            selectedId:                 '',
            sale:                       ''
        })
    }

    submitHandler = (e) =>{
        e.preventDefault()
        const datafile = new FormData()
        if(this.state.images){
            for(const f of this.state.images){
                datafile.append('images[]', f)
            }
        }
        var skuFinal = []
        for (var i = 0; i < this.state.qty.length; i++) {
            skuFinal.push( JSON.stringify( [this.state.qty[i], this.state.price[i], this.state.skuList[i]] ) )
        }
        datafile.append('id', this.state.selectedId)
        datafile.append('name', this.state.name)
        datafile.append('url', this.state.url)
        datafile.append('sale', this.state.sale)
        datafile.append('category', this.state.category)
        datafile.append('short_desc', this.state.short_desc)
        datafile.append('long_desc', this.state.long_desc)
        datafile.append('sku', JSON.stringify( skuFinal ))

        axios.post('/api/v1/updateProduct', datafile)
            .catch(err=>{
                console.log('err', err)
                this.callSwal("Product not updated due to error")
            })
        .then(res=>{
            if(res.data.success){ 
                this.setState({ products: this.state.products.map(x => x.id === parseInt(res.data.data.id) ? x= res.data.data :x ) })
            }
            this.callSwal(res.data.response)
        })
        this.resetData()
    } 

    render() {
        // const imgPath = "/tomato/storage/app/public/product/"
        const imgPath = "/storage/product/"

        const {currentPage, itemsPerPage } = this.state
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const renderItems =  this.state.products.slice(indexOfFirstItem, indexOfLastItem).map(( i, index ) => {
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td><Link to={"/product/"+i.url}>{i.name}</Link><br/><Link to={"/product-category/"+i.catUrl}>{i.catName}</Link></td>
                    <td>
                        {JSON.parse(i.sku).map(( j, index) =>( 
                                <p key={index}>
                                    {JSON.parse(j).map((k, index2)=>(
                                            index2!==2 ? <span key={index2}>{k} =></span> : <span key={index2}>{k}</span>
                                    ))}
                                </p> 
                            )
                        )}
                    </td>
                    <td>
                        { i.sale? i.sale : "No Sale"}
                    </td>
                    <td>{i.updated_at}</td>
                    <td className="editIcon text-center"><img src="/images/icons/edit.svg" alt="Edit Icon" onClick={()=>this.editModalOn(i)}></img></td>
                </tr>
            )}) 
        const pageNumbers = []
        for (let i = 1; i <= Math.ceil(this.state.products.length / itemsPerPage); i++) { pageNumbers.push(i) }
        const renderPagination = pageNumbers.map(number => { if(currentPage == number){ return ( <li key={number} id={number} onClick={this.handleClick} className="active"> {number}</li> ) }else{ return ( <li key={number} id={number} onClick={this.handleClick} > {number}</li> ) } })
        return (
            <>
                <div className="container-fluid my-5 admin">
                    <h1 className="heading"><span>Admin Panel</span>(Products)</h1>
                    <div className="row">
                        <AdminSidebar/>
                        <div className="col-sm-10">
                            <div className="btn-pag">
                                <Link to="/addProduct" target="_blank"><button className="action-btn">Add Products</button></Link>
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
                                        <td>Product | Category</td>
                                        <td>SKU</td>
                                        <td>Sale</td>
                                        <td>Time</td>
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
                        <h2>Update Product Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.submitHandler}>
                        <div className="row">
                            <div className="col-sm-3">
                                <label>Name of Sightseeing</label>
                                <input className="form-control" type="text" name="name" required="" placeholder="Name of Product" value={this.state.name} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-2">
                                <label>URL</label>
                                <input className="form-control" type="text" name="url" required="" placeholder="Add URL" value={this.state.url} onChange={this.onChange} />
                            </div>
                            <div className="compare col-sm-3">
                                <label>Category - {this.state.prevCategory}</label>
                                <Dropdown placeholder='Select category' fluid search selection onChange={this.categorySelected} options={this.state.prodCat}/>
                            </div>
                            <div className="col-sm-4">
                                <label>Sale (Leave blank if no sale)</label>
                                <textarea className="form-control" type="text" name="sale" required="" placeholder="Sale Information" value={this.state.sale} onChange={this.onChange}/>
                            </div>
                            <div className="col-sm-6 mt-3">
                                <label>Short Description</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data={this.state.short_desc} short_desc={this.state.short_desc} onChange={this.onEditorChange1}/>
                            </div>
                            <div className="col-sm-6 mt-3">
                                <label>Long Description</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data={this.state.long_desc} long_desc={this.state.long_desc} onChange={this.onEditorChange2}/>
                            </div>
                            <div className="col-sm-12 my-5 xsImg">
                                <input className="form-control" name="images" type="file" multiple onChange={this.imagesAdd}/>
                                {this.state.prevImages.map(( i, index) => { return ( <img key={index} src={imgPath+i} /> ) })}
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
                                        { this.state.skuList.map((k, index) =>{ return(  
                                            <div key={index}>      
                                                <label>SKU</label>
                                                <div className="form-group" key={index}>
                                                    <input className="form-control" type="text" placeholder="Enter SKU" name="sku" required value={k} onChange={(e)=>this.arraySkuChange(e, index)}/>
                                                    <img className="remove" src="/images/icons/wrong-red.svg" onClick={()=>this.removeQPS(index)}/>
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
                </Modal>
            </>
        )
       
    }
}
export default AdminProducts