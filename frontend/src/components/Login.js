import Form from "./Form";
import Input from "./Input";
import {Link, withRouter} from "react-router-dom";
import React from "react";

class Login extends React.Component {
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
    if (!this.state.email || !this.state.password) {
      return;
    }

    const {password, email} = this.state;
    this.props.onSubmit(password, email)
      .then((res) => {
        if (res.token) {
          this.setState({message: ""}, () => {
            this.props.history.push("/");
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
        <h2 className="title title_theme_dark">Log in</h2>
        <Form
          name='signin'
          className={`sign-page__form`}
          onSubmit={this.handleSubmit}
          submitButtonText='Log in'
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
        <p className='sign-page__text'>Not a member yet? <Link to='/signup' className='sign-page__link'>Sign up
          here!</Link></p>
      </div>
    );
  }
}

export default withRouter(Login);