import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../store";

const SignUp = (props) => {
  return (
    <div className="container">
      <form onSubmit={props.handleSubmit} name="signUpForm">
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">
            Sign Up
          </button>
        </div>
        {props.error && props.error.response && (
          <div> {props.error.response.data} </div>
        )}
      </form>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(signup(email, password));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
