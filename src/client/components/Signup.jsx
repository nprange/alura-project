import React, { Component } from 'react';
import SignupApi from '../logicas/SignupApi'
import { browserHistory } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
      senha: null,
      confirmaSenha: null,
      urlPerfil: null,
      errorSenha: null,
      errorLogin: null,
      errorApi: null,
      showErrors: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleValidation = this.handleValidation.bind(this)
  }
   
 handleValidation(){
    let errors = [];
      if (this.state.senha !== this.state.confirmaSenha){
        errors = [...errors, 'Incorrect password']
        this.setState({ errorSenha: 'Incorrect password' });
      } else {
        this.setState({ errorSenha: '' });
      } 

      if (this.state.login === this.state.senha) {
        errors = [...errors, 'Password equals to username']
        this.setState({ errorLogin: 'Password equals to username' });
      } else {
        this.setState({ errorLogin: '' });
      }

      return errors
  }

  handleSubmit (){
    const hasErrors = this.handleValidation().length > 0

    if (!hasErrors){
      SignupApi.postSignup(this.state.login, this.state.senha, this.state.urlPerfil)
      .then(() => {
        this.setState({errorApi: ''})
        browserHistory.push('/')
      })
      .catch(err => {
        this.setState({errorApi: 'Unable to register'})
        this.setState({login: '', senha: '', confirmaSenha: '', urlPerfil: ''})
      })
    }
}
  
  render() {
    const { errorSenha, errorLogin, errorApi, showErrors } = this.state;
    return (
      <section className='signup-section'>
        <h1 className='header-logo'>Instalura</h1>
        <h2 className='signup-subtitle' style={{fontSize: '1.25rem'}, {textAlign: 'center'}}> Create your account. It's easy 👍 </h2>
        <form onSubmit={(ev) => {
          ev.preventDefault()
          this.handleSubmit()
          this.setState({showErrors: true})
        }}
          className='signup-form'>
          <div className='login-container'>
            <label className='signup-label' htmlFor='login'>
              {' '}
              Login{' '}
            </label>
            <input
              id='login'
              type='text'
              required='true'
              title='Mandatory login'
              placeholder='Enter your login'
              onChange={ev => this.setState({login: ev.target.value})}
              value={this.state.login}
            />
          </div>
          <div className='senha-container'>
            <label className='signup-label' htmlFor='password'>
              {' '}
              Password{' '}
            </label>
            <input
              id='senha'
              type='password'
              required='true'
              title='Mandatory password'
              placeholder='Enter you password'
              onChange={ev => this.setState({senha: ev.target.value})}
              value={this.state.senha}
            />
          </div>
          <div className='confirmacao-container'>
            <label className='signup-label' htmlFor='password-confirmation'>
              {' '}
              Password confirmation{' '}
            </label>
            <input
              id='confirma-senha'
              type='password'
              required='true'
              placeholder='Enter your password again'
              onChange={ev => this.setState({confirmaSenha: ev.target.value})}
              value={this.state.confirmaSenha}
            />
          </div>
          <div className='url-container'>
            <label className='signup-label' htmlFor='url'>
              {' '}
              Profile url{' '}
            </label>
            <input
              id='url'
              type='text'
              required='true'
              placeholder='Enter your profile url'
              pattern='^(ftp|http|https):\/\/[^ "]+$'
              title='Invalid url'
              onChange={ev => this.setState({urlPerfil: ev.target.value})}
              value={this.state.urlPerfil}
            />
          </div>
          <button type='submit' className='button-submit'>
            Sign up
          </button>
          {(errorLogin ||
            errorSenha || errorApi) && showErrors && (
              <ul className='errors-list'>
                {errorLogin && <li> {errorLogin} </li>}
                {errorSenha && <li> {errorSenha} </li>}
                {errorApi && <li> {errorApi} </li>}
              </ul>
            )}
            
        </form>
      </section>
    );
  }
}

export default Signup;
