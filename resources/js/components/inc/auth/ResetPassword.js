import React, { Component } from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../actions/userActions'

class ResetPassword extends Component {
    constructor(props) {
        super(props)        
        this.state = {
            token:                  '',
            email:                  '',
            password:               '',
            confirm_password:       ''
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

    submitHandler = (e) =>{
        e.preventDefault()
        const token = this.props.match.params.token
        const datafile = new FormData()
        datafile.append('token', token)
        datafile.append('email', this.state.email)
        datafile.append('password', this.state.password)
        datafile.append('confirm_password', this.state.confirm_password)
        this.props.resetPassword(datafile)
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container my-5">
                <h1 className="heading"><span>Reset </span>Password </h1>
                <div className="row">
                    <div className="col-sm-6">
                        <form onSubmit={this.submitHandler} className="auth">
                            <div>
                                <input id="emailRegister" type="email" className="form-control" name="email" required autoComplete="email" value={this.state.email} onChange={this.onChange} placeholder="Email Please"/>
                                <label>E-Mail Address</label>
                            </div>
                            <div>
                                <input id="password" type="password" className="form-control" name="password" required autoComplete="new-password" value={this.state.password} onChange={this.onChange} placeholder="Password Please"/>
                                <label>Password</label>
                            </div>
                            <div>
                                <input id="password-confirm" type="password" className="form-control" name="confirm_password" required autoComplete="new-password" value={this.state.confirm_password} onChange={this.onChange} placeholder="Confirm Password"/>
                                <label>Confirm Password</label>
                            </div>
                            <button type="submit" className="vaidam-btn">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    user:       state.admin.user 
})

const mapDispatchToProps = dispatch => ({
    resetPassword:        datafile=> dispatch(resetPassword(datafile))
})

export default connect( mapStateToProps, mapDispatchToProps)(ResetPassword)