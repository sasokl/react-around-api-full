import Form from "./Form";
import Input from "./Input";
import {Link, withRouter} from "react-router-dom";
import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {password, email} = this.state;
    this.props.onSubmit(password, email).then((res) => {
      if (res) {
        this.setState({message: ""}, () => {
          this.props.history.push("/signin");
        });
      } else {
        this.setState({
          message: "Something went wrong!",
        });
      }
    })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="sign-page">
        <h2 className="title title_theme_dark">Sign up</h2>
        <Form
          name='signin'
          className={`sign-page__form`}
          onSubmit={this.handleSubmit}
          submitButtonText='Sign up'
          submitButtonClassName="sign-page__submit-button"
          isThemeDark={true}>
          <Input
            type="email"
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            placeholder="Email"
            minLength="1"
            maxLength="30"
            isRequired={true}
            isThemeDark={true}/>
          <Input
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            placeholder="Password"
            minLength="1"
            maxLength="30"
            isRequired={true}
            isThemeDark={true}/>
        </Form>
        <p className='sign-page__text'>Already a member? <Link to='/signin' className='sign-page__link'>Log in
          here!</Link></p>
      </div>
    );
  }
}

export default withRouter(Register);