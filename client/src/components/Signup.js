import React from "react";
class Signup extends React.Component {
  render() {
    return (
      <div className="loginForm">
        <h4>Fill out the form to create your account !</h4>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
            />
          </div>
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
            <button type="button" className="btn btn-outline-primary btn-lg">
              Create your account !
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default Signup;
