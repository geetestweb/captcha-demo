import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Captcha from "./components/captcha/captcha";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null, // verification result
      options: {
        // captcha config
        product: "float",
        lang: "en",
      },
    };
    this.captcha = React.createRef();
  }

  componentDidMount() {
    this.initCaptcha();
  }

  async initCaptcha() {
    const {
      data: { challenge, gt, new_captcha, success },
    } = await window.axios.get(
      `https://www.geetest.com/demo/gt/register-slide?t=${new Date().getTime()}`
    );
    this.setState({
      options: {
        gt,
        challenge,
        new_captcha,
        offline: !success,
        ...this.state.options,
      },
    });
    
    //Ensure gt, challenge and success are not null
    this.captcha.current.initCaptcha();
  }

  captchaReady = () => {
    console.log("onReady");
  };

  captchaSuccess = (data) => {
    console.log("onSuccess", data);
  };

  captchaReset = () => {
    this.captcha.current.reset();
  };

  render() {
    let { options } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Captcha
            options={options}
            ref={this.captcha}
            onReady={this.captchaReady}
            onSuccess={this.captchaSuccess}
          ></Captcha>
          <button onClick={this.captchaReset}>reset</button>
        </header>
      </div>
    );
  }
}

export default App;
