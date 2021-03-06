import React, { Component } from 'react';
import { Link } from 'react-router';

class FotoAtualizacoes extends Component {
  like(event) {
    event.preventDefault();
    this.props.like(this.props.foto.id);
  }

  comenta(event) {
    event.preventDefault();
    this.props.comenta(this.props.foto.id, this.comentario.value);
  }

  render() {
    return (
      <section className='fotoAtualizacoes'>
        <a
          onClick={this.like.bind(this)}
          className={
            this.props.foto.likeada
              ? 'fotoAtualizacoes-like-ativo'
              : 'fotoAtualizacoes-like'
          }
        >
          Like
        </a>
        <form
          className='fotoAtualizacoes-form'
          onSubmit={this.comenta.bind(this)}
        >
          <input
            type='text'
            placeholder='Add a comment...'
            className='fotoAtualizacoes-form-campo'
            ref={input => (this.comentario = input)}
          />
          <input
            type='submit'
            value='Comment!'
            className='fotoAtualizacoes-form-submit'
          />
        </form>
      </section>
    );
  }
}

class FotoInfo extends Component {
  render() {
    const { apaga } = this.props;
    return (
      <div className='foto-in fo'>
        <div className='info-container'>
          <div className='foto-info-likes'>
            {this.props.foto.likers.map(liker => {
              return (
                <Link key={liker.login} href={`/timeline/${liker.login}`}>
                  {liker.login},
                </Link>
              );
            })}
            curtiram
          </div>

          <p className='foto-excluir' onClick={ev => apaga(this.props.foto.id)}>
            {' '}
            Deletar Foto{' '}
          </p>
        </div>

        <p className='foto-info-legenda'>
          <a className='foto-info-autor'>autor </a>
          {this.props.foto.comentario}
        </p>

        <ul className='foto-info-comentarios'>
          {this.props.foto.comentarios.map(comentario => {
            return (
              <li className='comentario' key={comentario.id}>
                <Link
                  to={`/timeline/${comentario.login}`}
                  className='foto-info-autor'
                >
                  {comentario.login}{' '}
                </Link>
                {comentario.texto}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class FotoHeader extends Component {
  render() {
    return (
      <header className='foto-header'>
        <figure className='foto-usuario'>
          <img src={this.props.foto.urlPerfil} alt='picture' />
          <figcaption className='foto-usuario'>
            <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
              {this.props.foto.loginUsuario}
            </Link>
          </figcaption>
        </figure>
        <time className='foto-data'>{this.props.foto.horario}</time>
      </header>
    );
  }
}

export default class FotoItem extends Component {
  render() {
    return (
      <div className='foto'>
        <FotoHeader foto={this.props.foto} />
        <img alt='picture' className='foto-src' src={this.props.foto.urlFoto} />
        <FotoInfo foto={this.props.foto} apaga={this.props.apaga} />
        <FotoAtualizacoes {...this.props} />
      </div>
    );
  }
}
