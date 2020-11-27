import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/userActions'
import { Link, Redirect } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Login extends Component {
    constructor(props){
        super(props)        
        this.state = {
            email:          '',
            password:       '',
            modalOn:        true,
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

    changeHandler = (e) => { this.setState({ [e.target.name]: e.target.value }) } 
    modalOn = ()=>{ this.setState({ modalOn: true  }) }

    modalOff = ()=>{
        this.setState({
            modalOn:        false,
            email:          '',
            password:       ''
        })
    }

    submitHandler = e =>{
        e.preventDefault()
        this.props.fetchUser(this.state)
    }
   
    render() {
        if(this.props.isAuthenticated){ return <Redirect to="/" /> }
        const{ email, password } = this.state
        return (
            <>
                <div className="container my-5">
                    <h1 className="heading"><span>Login into </span>Tomato Project</h1>
                    <button className="vaidam-btn" onClick={this.modalOn}>Log into Tomato Project</button>
                    <div className="row my-5">
                        <div className="col-sm-12">
                            <p>dummy Text</p>
                            <h3>dummy Text</h3>
                            <p>dummy Text</p>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalOn} className="adminModal"> 
                    <ModalHeader> Login into Tomato Project </ModalHeader>
                    <div className="closeModal" onClick={this.modalOff}>X</div>
                    <ModalBody>
                        <p>Please provide correct information to help us serve you better</p>
                        <form onSubmit={this.submitHandler}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={email} onChange={this.changeHandler} placeholder="Email Please"/>
                                    <label>E-Mail Address</label>
                                </div>
                                <div className="col-sm-6">
                                    <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={password} onChange={this.changeHandler} placeholder="Password Please"/>
                                    <label>Password</label>
                                </div>
                                <div className="my-btn">
                                    <button className="vaidam-btn" type="submit">Login</button>
                                    <Link className="forgot mt-3" to="/forgotPassword">Forgot Password?</Link>
                                </div>
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
    user:               state.admin.user,
    isAuthenticated:    state.admin.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
    fetchUser:        datafile=> dispatch(fetchUser(datafile))
})

export default connect( mapStateToProps, mapDispatchToProps)(Login)