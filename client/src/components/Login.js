import React from "react";
class Login extends React.Component {
  render() {
    return (
      <div className="loginForm">
        <h4>Sign-in with the form below or connect with facebook !</h4>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username : </label>
            <input
              type="email"
              className="form-control"
              id="username"
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
            <button type="button" className="btn btn-primary btn-lg">
              Connect with facebook !
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Login;
