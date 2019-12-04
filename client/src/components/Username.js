import React from "react";
import { withSnackbar } from "notistack";
class Username extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  onSubmitForm = e => {
    e.preventDefault();
    fetch("/signup/facebook", {
      method: "post",
      body: JSON.stringify({
        ...this.props.userLogin,
        username: this.state.value
      }),
      headers: new Headers({ "content-type": "application/json" })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.props.enqueueSnackbar(res.error, { variant: "error" });
          return;
        }
        this.props.callBack(true);
      });
  };
  render() {
    return (
      <div className="loginForm">
        <h4>Pick a username to continue !</h4>
        <form onSubmit={e => this.onSubmitForm(e)}>
          <div className="form-group">
            <label htmlFor="email">Username : </label>
            <input
              type="text"
              className="form-control"
              id="Username"
              aria-describedby="emailHelp"
              required
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </div>
          <div className="buttons">
            <button type="submit" className="btn btn-outline-primary btn-lg">
              Continue !
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default withSnackbar(Username);
