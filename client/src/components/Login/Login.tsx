// libs

import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
type Props = {};
type State = {};
class Login extends React.Component<Props, State> {
  // handleLogin = () => {
  //   console.log("Signing in");
  //   axios({
  //     // make a POST request
  //     method: "get",
  //     // to the Github authentication API, with the client ID, client secret and
  //     // request token
  //     url: "http://localhost:3000/login",
  //     // Set the content type header, so that we get the response in JSOn
  //     headers: {
  //       accept: "application/json"
  //     }
  //   }).then(response => {
  //     console.log("res came", response);
  //   });
  //   // fetch("http://localhost:3000/login")
  //   //   .then(function(response) {
  //   //     return response.json();
  //   //   })
  //   //   .then(function(data: any) {
  //   //     console.log("response");
  //   //     console.log(data);
  //   //     if (data.status == "success") {
  //   //       console.log("login complete");
  //   //     } else {
  //   //       console.log("couldn't log in");
  //   //     }
  //   //   });
  // };
  // render() {
  //   return (
  //     <div>
  //       <a id="login-button" href="http://localhost:3000/login">
  //         Log In With GitHub
  //       </a>
  //     </div>
  //   );
  // }
}

export default Login;
