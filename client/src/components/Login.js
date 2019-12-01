import React from "react";
import Facebook from "./Facebook";
class Login extends React.Component {
  render() {
    return (
      <div className="loginForm">
        <h4>Sign-in with the form below or connect with facebook !</h4>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              className="form-control"
              id="password"
              aria-describedby="emailHelp"
            />
          </div>
          <h5>
            Don't have an account ?{" "}
            <button
              type="button"
              className="buttonlink"
              onClick={() => this.props.page("signup")}
            >
              Create one today !
            </button>
          </h5>
          <div className="buttons">
            <button type="button" className="btn btn-outline-primary btn-lg">
              Sign-in !
            </button>
            <Facebook
              page={page => this.props.page(page)}
              login={login => this.props.login(login)}
            />
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
