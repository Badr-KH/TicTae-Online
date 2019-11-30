import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
class Facebook extends Component {
  responseFacebook = res => {
    console.log(res);
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
