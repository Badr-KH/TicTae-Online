import React from "react";
import Facebook from "./Facebook";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onSubmitForm = e => {
    e.preventDefault();
    fetch("/login", {
      method: "post",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) this.props.history.push("/");
      });
  };
  render() {
    return (
      <div className="loginForm">
        <h4>Sign-in with the form below or connect with facebook !</h4>
        <form onSubmit={e => this.onSubmitForm(e)}>
          <div className="form-group">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
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
              required
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
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
            <button type="submit" className="btn btn-outline-primary btn-lg">
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
