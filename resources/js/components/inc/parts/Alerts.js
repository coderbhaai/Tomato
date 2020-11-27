import React, { Component, Fragment } from "react"
import { withAlert } from "react-alert"
import { connect } from "react-redux"

export class Alerts extends Component {
  
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg)               alert.error(error.msg);
    }
    
    if (message !== prevProps.message) {
      if (message.tutorProfileCreate)       alert.success(message.tutorProfileCreate)
      if (message.tutorProfileUpdate)       alert.success(message.tutorProfileUpdate)
      if (message.mailFromTutor)            alert.success(message.mailFromTutor)


      if (message.mailTutor)                alert.success(message.mailTutor)
      if (message.addVideo)                 alert.success(message.addVideo)
      if (message.updateVideo)              alert.success(message.updateVideo)
      if (message.counselling)              alert.success(message.counselling)
      if (message.postRequirement)          alert.success(message.postRequirement)
      if (message.fetchNumber)              alert.success(message.fetchNumber)
      if (message.addBasic)                 alert.success(message.addBasic)
      if (message.updateBasic)              alert.success(message.updateBasic)
      if (message.addTutorial)              alert.success(message.addTutorial)
      if (message.updateTutorial)           alert.success(message.updateTutorial)
      if (message.addTestPaper)             alert.success(message.addTestPaper)
      if (message.updateTestPaper)          alert.success(message.updateTestPaper)
      if (message.fetchPaper)               alert.success(message.fetchPaper)
      if (message.addMeta)                  alert.success(message.addMeta)
      if (message.updateMeta)               alert.success(message.updateMeta)
      if (message.addBlogMeta)              alert.success(message.addBlogMeta)
      if (message.updateBlogMeta)           alert.success(message.updateBlogMeta)
      if (message.addBlog)                  alert.success(message.addBlog)
      if (message.updateBlog)               alert.success(message.updateBlog)
      if (message.addContactForm)           alert.success(message.addContactForm)
      if (message.addComment)               alert.success(message.addComment)
      if (message.updateComment)            alert.success(message.updateComment)
      if (message.submitWorksheet)          alert.success(message.submitWorksheet)
      if (message.updateWorksheet)          alert.success(message.updateWorksheet)
      if (message.register)                 alert.error(message.register);
      if (message.login)                    alert.error(message.login);
      if (message.logOut)                   alert.error(message.logOut);
      if (message.forgotPassword)           alert.error(message.forgotPassword);
      if (message.resetPassword)            alert.error(message.resetPassword);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alerts));