import React, { Component } from 'react'
import { Modal } from 'reactstrap'
import CKEditor from 'ckeditor4-react'
import axios from 'axios'
import swal from 'sweetalert'
import moment from "moment"

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
export class Comments extends Component {
    constructor(props) {
        super(props)
            this.state = {
                user:                  [],
                name:                  '',
                email:                 '',
                comment:               '',
                error:                 '',
                order:                 0,
                status:                0,
                commentId:             0,
                addmodalIsOpen:        false,
                message:               '',
                errorReason:           ''
            }
            this.handleChange1 = this.handleChange1.bind( this )
            this.onEditorChange1 = this.onEditorChange1.bind( this )
        }
        
        onChange= (e) => { this.setState({ [e.target.name]: e.target.value },()=>this.checkForHTML()) }
        onEditorChange1( evt1 ) { this.setState( { comment: evt1.editor.getData() },()=>this.checkForHTML() ) }
        handleChange1( changeEvent1 ) { this.setState( { comment: changeEvent1.target.value } ) }
        componentDidMount(){
            if(typeof(Storage) !== "undefined"){ this.setState({ user: JSON.parse(localStorage.getItem('user')) || [] }) }
        }

        checkForHTML=()=>{
            block.map((i)=>{
                if(this.state.name.includes(i) || this.state.comment.includes(i)){
                    this.setState({ 
                        error:          "Error in inputs being provided",
                        errorReason:    i
                    })
                }
            })
        }

        addAdminModalOn = (i)=>{
            this.setState({ 
                addmodalIsOpen:         true,
                commentId:              i.id,
                name:                   'AmitKK',
                email:                  'amit@amitkk.com',
                order:                  1,
                status:                 1
        })}

        addUserModalOn = (i)=>{ 
            this.setState({ 
                addmodalIsOpen:         true,
                commentId:              i.id,
                order:                  1,
                status:                 0
        })}
        
        resetData = ()=>{
            this.setState({
                name:               '',
                email:              '',
                comment:            '',
                commentId:          0,
                order:              0,
                status:             0,
                addmodalIsOpen:     false,
                error:              '',
                errorReason:        ''
            })
        }

        submitComment = (e) => {
            e.preventDefault()
            const data={
                id:                 this.props.blogId,
                order:              this.state.order,
                status:             this.state.status,
                commentId:          this.state.commentId,
                name:               this.state.name,
                email:              this.state.email,
                comment:            this.state.comment
            }             
            axios.post('/api/v1/addComment', data)
                .catch(err=>console.log('err', err))
                .then(res=>{ 
                    this.callSwal(res.data.response)
                })
            this.resetData()
        }

        callSwal=(mesg)=>{ swal({ title: mesg, timer: 4000 }) }

    render() {
        return (
            <>
                <div className="container comments">
                    <h3 className="heading"><span>Share your </span>Views</h3>
                    <p>Please keep your views respectful and not include any anchors, promotional content or obscene words in them. Such comments will be definitely removed and your IP be blocked for future purpose.</p>
                    <form encType="multipart/form-data" onSubmit={this.submitComment}>
                        <div className="card">
                            <div className="row">
                                <div className="col-sm-5">
                                    <label>Name</label>
                                    <input className="form-control" type="text" name="name" required placeholder="Name Please" value={this.state.name} onChange={this.onChange}/>
                                </div>    
                                <div className="col-sm-7">
                                    <label>Email</label>
                                    <input className="form-control" type="email" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/> 
                                </div>    
                                <div className="col-sm-12">
                                    <label>Comment</label>
                                    <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } data={this.state.comment} content= {this.state.comment} onChange={this.onEditorChange1} />
                                    { this.state.error ?
                                        <div className="myBtn py-3">
                                            <p>{this.state.error}</p>
                                            <p>Do not include - {this.state.errorReason}</p>
                                            <button className="amitBtn w-100" onClick={this.resetData}>Try Again</button> 
                                        </div>
                                    :   <div className="myBtn py-3"><button className="amitBtn w-100">Submit</button></div>
                                    }
                                    { this.state.message ?  <p>{this.state.message}</p> : null }
                                </div>
                            </div>
                        </div>
                    </form>
                    {this.props.comments ?
                        <>
                            {this.props.comments.length > 0 ?
                            <>
                                <h3 className="heading mt-5"><span>Some love showed </span>by people </h3>
                                <div className="row comments">
                                    { this.props.comments.map((i, index)=>{ return(
                                        <div className="col-sm-12 " key={index}>
                                            <div className="card"> 
                                                <section className="originalComment" dangerouslySetInnerHTML={{ __html: i.comment }}/>
                                                <span><strong>{i.user}</strong> on {moment(i.updated_at).format("DD MMMM  YYYY")}</span>
                                                { this.props.response.map((j, index)=>{ 
                                                    if(i.id === j.commentId){
                                                        return(
                                                            <div className="adminReply" key={index}>
                                                                <section className="not-found-controller" dangerouslySetInnerHTML={{ __html: j.comment }}/>
                                                                <span><strong>{j.user}</strong> on {moment(j.updated_at).format("DD MMMM  YYYY")}</span>
                                                            </div>
                                                )} })}
                                                { this.state.user.role=='Admin' ?
                                                    <div className="forAdmin"><button className="amitBtn" onClick={()=>this.addAdminModalOn(i)}>Reply by Admin</button></div>
                                                    : <div className="forAdmin"><button className="amitBtn" onClick={()=>this.addUserModalOn(i)}>Reply</button></div>
                                                }
                                            </div>
                                        </div>
                                    ) })}
                                </div>
                            </>
                            : null }
                        </>
                    :null }
                </div>
                <Modal isOpen={this.state.addmodalIsOpen} className="adminModal">
                    <div className="modal-header">
                        <h2>Reply to comment Here</h2>
                        <div className="closeModal" onClick={this.resetData}>X</div>
                    </div>
                    <form encType="multipart/form-data" onSubmit={this.submitComment}>
                        <div className="row">
                            { !this.state.user.role ?
                                <>
                                    <div className="col-sm-6">
                                        <label>Name</label>
                                        <input className="form-control" type="text" placeholder="Your Name" name="name" required value={this.state.name} onChange={this.onChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Email</label>
                                        <input className="form-control" type="email" placeholder="Your Email ID" name="email" required value={this.state.email} onChange={this.onChange}/>
                                    </div>
                                </>
                                : null
                            }
                            <div className="col-sm-12 comments">
                                <label>Comment</label>
                                <CKEditor onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } content= {this.state.comment} onChange={this.onEditorChange1} />
                            </div>
                        </div>
                        <div className="my-btn">
                            <button className="action-btn" type="submit">Submit</button> 
                        </div>
                    </form>
                </Modal>
            </>
        )
    }
}
export default Comments