import React, { Component } from "react";

export class RegisterOtp extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.check_otp_and_register();
  };

  onChange = e => {
    this.props.handle_on_change(e.target.name, e.target.value);
  };
  render() {
    const { otp, email, wrong_otp } = this.props;
    return (
      <div className="ms-form-align ms-register-form">
        <form onSubmit={this.onSubmit} className="ms-form">
          {wrong_otp ? (
            <div className="text-danger">
              <strong>
                Please enter the correct OTP that we sent to your email address{" "}
                <span className="text-success">'{email}'.</span>
              </strong>
            </div>
          ) : (
            <div />
          )}
          <br />
          <input
            name="otp"
            placeholder="OTP"
            type="password"
            value={otp}
            onChange={this.onChange}
            className="ms-form-input"
          />
          <br /> <br /> <br />
          <input
            value="Sign up"
            type="submit"
            className="ms-form-button"
          />{" "}
          <br /> <br />
          <p>
            {" "}
            <strong>Didn't received OTP?</strong>{" "}
            <span className="text-primary"> Resend</span>
          </p>
        </form>
      </div>
    );
  }
}

export default RegisterOtp;
