import React from "react";
import { withSnackbar } from "notistack";
import auth from "../utils/isAuthenticated";
import { Link } from "react-router-dom";
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }
  signUp = e => {
    e.preventDefault();
    fetch("/signup", {
      method: "post",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.props.enqueueSnackbar(res.error, { variant: "error" });
          return;
        }
        this.props.enqueueSnackbar("Registration Successful", {
          variant: "success"
        });
        auth.authenticate().then(() => {
          this.props.history.push("/");
        });
      });
  };
  render() {
    return (
      <div className="loginForm">
        <h4>Fill out the form to create your account !</h4>
        <form onSubmit={e => this.signUp(e)}>
          <div className="form-group">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="emailHelp"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <h5>
            Already got an account ?{" "}
            <button
              type="button"
              className="buttonlink"
              onClick={() => this.props.page("login")}
            >
              Sign-in instead !
            </button>
          </h5>
          <div className="buttons">
            <button type="submit" className="btn btn-outline-primary btn-lg">
              Create your account !
            </button>
          </div>
        </form>
        <h5>
          By signing up, you accept our{" "}
          <Link to="/privacy">privacy policy </Link>
          agreement !
        </h5>
      </div>
    );
  }
}
export default withSnackbar(Signup);
