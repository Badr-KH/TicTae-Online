import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { withSnackbar } from "notistack";
class Facebook extends Component {
  responseFacebook = res => {
    if (!res.status) {
      fetch("/login/facebook", {
        method: "post",
        body: JSON.stringify({ id: res.id }),
        headers: new Headers({ "content-type": "application/json" })
      })
        .then(result => result.json())
        .then(result => {
          console.log(res);
          if (result.error) {
            this.props.login(res);
            this.props.page("username");
            return;
          }
          this.props.enqueueSnackbar("Successfully logged in with facebook !", {
            variant: "success"
          });
          this.props.auth.authenticate().then(() => {
            this.props.history.push("/");
          });
        });
    }
  };
  render() {
    return (
      <div>
        <FacebookLogin
          appId="936105833450555"
          fields="name,email,picture"
          callback={this.responseFacebook}
          cssClass="btn btn-outline-primary btn-lg"
          textButton=" Continue with Facebook !"
          icon="fa-facebook"
          version="5.0"
        />
      </div>
    );
  }
}

export default withSnackbar(Facebook);
