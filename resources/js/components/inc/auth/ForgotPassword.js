import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { forgotPassword } from '../actions/userActions'

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
             email:         ''
        }
    }

    componentDidMount(){
        const xx = window.location.pathname
        const url = xx.replace(/[.*+?^${}/|[\]\\]/g, '-')
        axios.get('/api/v1/fetchMeta/'+ url)
        .then(response =>{
            document.title = response.data.datax.title,
            document.getElementsByTagName("meta")[0].content=response.data.datax.description,
            document.getElementsByTagName("meta")[1].content=response.data.datax.keyword
        })
        window.scrollTo(0, 0)
        if(this.props.user.role){ this.props.history.push('/') }
    }
    
    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }

    ResetPassword = e =>{
        e.preventDefault()
        const datafile = new FormData()
        datafile.append('email', this.state.email)
        this.props.forgotPassword(datafile)
        this.props.history.push('/')
    }

    render() {
        return (
            <>
                <div className="container my-5">
                    <h1 className="heading"><span>Forgot </span>Password </h1>
                    <div className="row">
                        <div className="col-sm-6">
                            <form onSubmit={this.ResetPassword} className="auth">
                                <div>
                                    <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={this.state.email} onChange={this.onChange} placeholder="Email Please"/>
                                    <label>E-Mail Address</label>
                                </div>
                                <button type="submit" className="vaidam-btn ">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

ForgotPassword.propTypes = {
    forgotPassword : PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    user:       state.admin.user
})

const mapDispatchToProps = dispatch => ({
    forgotPassword:        datafile=> dispatch(forgotPassword(datafile))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)