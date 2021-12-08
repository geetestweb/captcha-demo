import React from "react";

export default class Captcha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.captcha = null
  }

  initGeetest() {
    window.initGeetest(this.props.options, (gt) => {
      gt.appendTo(".gt-captcha-wrap");
      gt.onReady(() => {
        this.props.onReady()
      }).onSuccess(() => {
        let result = gt.getValidate();
        this.props.onSuccess(result)
      }).onError(()=>{
        this.props.onError()
      }).onClose(()=>{
        this.props.onClose()
      })
      this.captcha = gt
    });
  }

  destroy() {
    this.captcha.destroy();
  }
  reset() {
    this.captcha.reset();
  }
  verify() {
    this.captcha.verify();
  }


  render() {
    return (
      <div className="gt-captcha-wrap"></div>
    );
  }
}



Captcha.defaultProps = {
  options: {
    gt: '',
    challenge: '',
    offline: false,
    new_captcha:true
  },
  onReady: () => {},
  onSuccess: () => {},
  onError: () => { },
  onClose: () => {},
};
