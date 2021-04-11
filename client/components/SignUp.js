import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {signup} from '../store'
import {clearError} from '../store/user'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string('Valid email required!')
    .email('Valid email required!')
    .required('Valid email required!'),
  password: yup
    .string()
    .min(8, 'At least 8 chars!')
    .max(20, 'At most 20 chars!')
    .required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match!'),
})

const SignUp = (props) => {
  useEffect(() => {
    return () => {
      props.clearAlert()
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    console.log(data)
    props.handleSubmit(data)
  }

  return (
    <div
      className="container-fluid r4-fullscreen-bg-img px-4 "
      style={{backgroundImage: 'url(/images/background/default.jpg)'}}
    >
      <div className="r4-login-panel ">
        <div className="row">
          <div className="col-12 py-4">
            <h1 className="text-center display-1 text-primary">
              <i className="bi bi-person-plus-fill" />
            </h1>
            <h3 className="text-center text-primary mb-4">User Registration</h3>
            <form
              onSubmit={handleSubmit(submitForm)}
              name="signUpForm"
              className=""
            >
              <div>
                <label htmlFor="email" className="d-none">
                  <small>Email</small>
                </label>
                <input
                  name="email"
                  type="text"
                  className="form-control mb-2"
                  placeholder="email address"
                  {...register('email')}
                />{' '}
                {errors.email && (
                  <p className="text-danger">
                    <i className="bi bi-exclamation-diamond-fill" />
                    &nbsp;
                    {errors.email.message}
                  </p>
                )}
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
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-danger">
                    <i className="bi bi-exclamation-diamond-fill" />
                    &nbsp;
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="passwordConfirm" className="d-none">
                  <small>Password</small>
                </label>
                <input
                  name="passwordConfirm"
                  type="password"
                  className="form-control mb-2"
                  placeholder="confirm password"
                  {...register('passwordConfirm')}
                />
                {errors.passwordConfirm && (
                  <p className="text-danger">
                    <i className="bi bi-exclamation-diamond-fill" />
                    &nbsp;
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="btn btn-primary form-control mb-3"
                  type="submit"
                >
                  Sign Up
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
                &mdash;&mdash;&mdash;&mdash;&mdash; &#8195;Already a
                user?&#8195; &mdash;&mdash;&mdash;&mdash;&mdash;{' '}
              </p>
              <p className="text-center text-secondary mt-3 mb-1 d-block d-sm-none">
                {' '}
                &mdash; &#8195;Already a user?&#8195; &mdash;{' '}
              </p>
            </form>
            {/* <a href="/auth/google">{displayName} with Google</a> */}
            <Link
              to="/login"
              className="btn btn-outline-primary form-control mb-1"
            >
              Login
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
    handleSubmit(validatedData) {
      dispatch(signup(validatedData.email, validatedData.password))
    },
    clearAlert: () => dispatch(clearError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
