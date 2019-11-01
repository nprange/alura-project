import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { msg: this.props.location.query.msg };
  }

  envia(event) {
    event.preventDefault();

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: this.login.value,
        senha: this.senha.value
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch('http://localhost:8080/api/public/login', requestInfo)
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Unable to login');
        }
      })
      .then(token => {
        localStorage.setItem('auth-token', token);
        document.cookie = `auth-token=${token}`;
        browserHistory.push('/timeline');
      })
      .catch(error => {
        this.setState({ msg: 'Unable to login. Try again.' });
      });
  }

  render() {
    return (
      <div className='login-box'>
        <h1 className='header-logo'>Instalura</h1>
        <span style={{color: 'red'}}>{this.state.msg}</span>
        <form className='signup-form' onSubmit={this.envia.bind(this)}>
          <label htmlFor='login' className='signup-label' htmlFor='url'>
            Login
          </label>
          <input
            id='login'
            type='text'
            placeholder='Enter your login'
            ref={input => (this.login = input)}
          />
          <label htmlFor='password' className='signup-label' htmlFor='url'>
            Password
          </label>
          <input
            id='senha'
            type='password'
            placeholder='Enter your password'
            ref={input => (this.senha = input)}
          />
          <button className='button-submit' type='submit'>
            {' '}
            Login{' '}
          </button>
          <p className='create-account-msg'>
            {' '}
            Don't have an account? <Link to='/signup'>Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
