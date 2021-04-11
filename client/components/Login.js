import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {login} from '../store'
import {clearError} from '../store/user'
import {useEffect} from 'react'

const Login = (props) => {
  useEffect(() => {
    return () => {
      props.clearAlert()
    }
  }, [])

  return (
    <div
      className="container-fluid r4-fullscreen-bg-img px-4 "
      style={{backgroundImage: 'url(/images/background/default.jpg)'}}
    >
      <div className="r4-login-panel ">
        <div className="row">
          <div className="col-12 py-4">
            {' '}
            <h1 className="text-center display-1 text-primary">
              <i className="bi bi-person-fill" />
            </h1>
            <h3 className="text-center text-primary mb-4">User Login</h3>
            <form onSubmit={props.handleSubmit} name="loginForm" className="">
              <div>
                <label htmlFor="email" className="d-none">
                  <small>Email</small>
                </label>
                <input
                  name="email"
                  type="text"
                  className="form-control mb-2"
                  placeholder="email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="d-none">
                  <small>Password</small>
                </label>
                <input
                  name="password"
                  type="password"
                  className="form-control mb-2"
                  placeholder="password"
                />
              </div>
              <div>
                <button
                  className="btn btn-primary form-control mb-3"
                  type="submit"
                >
                  Login
                </button>
              </div>
              {props.error && props.error.response && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <i className="bi bi-exclamation-diamond-fill" />
                  &nbsp;
                  {props.error.response.data}{' '}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={props.clearAlert}
                  />{' '}
                </div>
              )}
              <p className="text-center text-secondary mt-3 mb-1 d-none d-sm-block">
                {' '}
                &mdash;&mdash;&mdash;&mdash;&mdash; &#8195;Not a user?&#8195;
                &mdash;&mdash;&mdash;&mdash;&mdash;{' '}
              </p>
              <p className="text-center text-secondary mt-3 mb-1 d-block d-sm-none">
                {' '}
                &mdash;&mdash; &#8195;Not a user?&#8195; &mdash;&mdash;{' '}
              </p>
            </form>
            {/* <a href="/auth/google">{displayName} with Google</a> */}
            <Link
              to="/signup"
              className="btn btn-outline-primary form-control mb-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(login(email, password))
    },
    clearAlert: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
