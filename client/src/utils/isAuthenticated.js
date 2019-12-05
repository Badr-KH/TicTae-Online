import io from "socket.io-client";
const auth = {
  isAuthenticated: false,
  user: {},
  socket: null,
  async authenticate() {
    const auth = await fetch("/profile");
    const result = await auth.json();
    if (!result.error) {
      this.isAuthenticated = true;
      let { username, stats, photo_url, _id, score } = result;
      this.user = { username, stats, photo_url, _id, score };
      this.socket = io();
    }
  },
  async signout() {
    fetch("/logout");
    this.isAuthenticated = false;
    this.user = {};
  }
};
export default auth;
