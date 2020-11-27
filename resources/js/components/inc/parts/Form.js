import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router"

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name:               '',               
            email:              '',
            phone:              '',
            message:            ''
        }
    }

    onChange= (e) => { this.setState({ [e.target.name]: e.target.value }) }
    submitAddHandler = (e) =>{
        e.preventDefault()
        const data={
            name:               this.state.name, 
            email:              this.state.email,
            phone:              this.state.phone,
            message:            this.state.message
        }               
        axios.post('/api/v1/contactForm', data)
            .catch(err=>console.log('err', err)) 
            .then( res=> {
                if(res.data.success){
                    localStorage.setItem('message', 'Form submitted succesfully')
                    this.props.history.push('/thank-you')
                }
            })
    }
    
    render() {
        return (
            <>
                <form encType="multipart/form-data" onSubmit={this.submitAddHandler}>
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" required placeholder="Name Please" value={this.state.name} onChange={this.onChange}/>
                    <label>Email</label>
                    <input className="form-control" type="email" name="email" required placeholder="Email Please" value={this.state.email} onChange={this.onChange}/> 
                    <label>Phone</label>
                    <input className="form-control" type="text" name="phone" required placeholder="Phone Please" value={this.state.phone} onChange={this.onChange}/>
                    <label>Message</label>
                    <textarea type="text" name="message" required className="form-control" placeholder="Message" value={this.state.message} onChange={this.onChange}></textarea>
                    <div className="myBtn">
                        <button className="amitBtn">Submit</button>
                    </div>
                </form>
            </>
        )
    }
}
// export default Form
export default withRouter(Form)