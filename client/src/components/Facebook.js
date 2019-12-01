import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
class Facebook extends Component {
  responseFacebook = res => {
    if (!res.status) {
      fetch("/login/facebook", {
        method: "post",
        body: JSON.stringify({ id: res.id }),
        headers: new Headers({ "content-type": "application/json" })
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            this.props.login(res);
            this.props.page("username");
            return;
          }
          console.log(res);
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

export default Facebook;
