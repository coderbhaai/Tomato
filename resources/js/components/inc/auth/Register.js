import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux'
import { registerUser } from '../actions/userActions'
import { Redirect } from 'react-router-dom'
class Register extends Component {
    constructor(props) {
        super(props)    
        this.state = {
            name:                       '',
            email:                      '',
            role:                       'user',
            password:                   '',
            password_confirmation:      '',
            modalOn:                    false,
        }
    }

    componentDidMount(){
        const xx = window.location.pathname
        const url = xx.replace(/[.*+?^${}/|[\]\\]/g, '-')
        axios.get('/api/v1/fetchMeta/'+ url)
        .then(response =>{
            if(response.data.datax){
                document.title = response.data.datax.title
                document.getElementsByTagName("meta")[0].content=response.data.datax.description,
                document.getElementsByTagName("meta")[1].content=response.data.datax.keyword
            }
        })
        window.scrollTo(0, 0)
    }

    modalOn = ()=>{ this.setState({ modalOn: true  }) }

    modalOff = ()=>{
        this.setState({
            modalOn:                   false,
            name: '',
            email: '',
            role: '',
            password: '',
            password_confirmation: ''
        })
    }

    onChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    
    submitHandler = e => {
        e.preventDefault()
        const datafile = new FormData()
        datafile.append('name', this.state.name)
        datafile.append('email', this.state.email)
        datafile.append('role', this.state.role)
        datafile.append('password', this.state.password)
        datafile.append('password_confirmation', this.state.password_confirmation)
        this.props.registerUser(datafile)
        this.props.history.push('/login')
    } 

    render() {
        const{userName, email, role, password, password_confirmation} = this.state
        if(this.props.isAuthenticated){ return <Redirect to="/" /> }
        return (
            <>
                <div className="container my-5">
                    <h1 className="heading"><span>Why sign up with </span>Tomato</h1>
                    <button className="vaidam-btn" onClick={this.modalOn}>Register with Us</button>
                    <p className="mt-5">Dummy text here</p>
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="box-title">Dummy text here</h4>
                            <p>Dummy text here</p>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalOn} className="adminModal"> 
                    <ModalHeader> Register with Tomato </ModalHeader>
                    <div className="closeModal" onClick={this.modalOff}>X</div>
                    <ModalBody>
                        <p>Please provide correct information to help us serve you better</p>
                        <form onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label>Name</label>
                                    <input id="name" type="text" className="form-control" name="name" required autoComplete="name" autoFocus value={userName} onChange={this.onChange} placeholder="Name Please"/>
                                </div>
                                <div className="col-sm-6">
                                    <label>E-Mail Address</label>
                                    <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={email} onChange={this.onChange} placeholder="Email Please"/>
                                </div>
                                <div className="col-sm-4">
                                    <label>I am a </label>
                                    <select className="form-control" required value={role} onChange={this.onChange} name="role">
                                        <option>Iam a </option>
                                        <option value="Student">Customer</option> 
                                        <option value="Tutor">Vendor</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                    <label>Password</label>
                                    <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={password} onChange={this.onChange} placeholder="Password Please"/>
                                </div>
                                <div className="col-sm-4">
                                    <label>Confirm Password</label>
                                    <input id="password-confirm" type="password" className="form-control" name="password_confirmation" required autoComplete="new-password" value={password_confirmation} onChange={this.onChange} placeholder="Confirm Password"/>
                                </div>
                                { password.length> 8 && password_confirmation.length> 8 && password == password_confirmation ?
                                    <div className="my-btn">
                                        <button className="vaidam-btn" type="submit">Register</button>
                                    </div>
                                : <p>The password length should be greater than 8 and should match</p> }
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>
            </>
        )
    }
}
const mapStateToProps = state =>({
    user:       state.admin.user 
})

const mapDispatchToProps = dispatch => ({
    registerUser:        datafile=> dispatch(registerUser(datafile))
})

export default connect( mapStateToProps, mapDispatchToProps)(Register)