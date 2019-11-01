import {
  listagem,
  comentario,
  like,
  notifica,
  apaga
} from '../actions/actionCreator';
import 'isomorphic-fetch';

export default class TimelineApi {
  static lista(urlPerfil) {
    return dispatch => {
      return fetch(urlPerfil)
        .then(response => response.json())
        .then(fotos => {
          dispatch(listagem(fotos));
          return fotos;
        });
    };
  }

  static apaga(fotoId) {
    return dispatch => {
      const requestInfo = {
        method: 'DELETE',
        headers: new Headers({
          'Content-type': 'application/json',
          'X-AUTH-TOKEN': localStorage.getItem('auth-token')
        }),
      };

      fetch(`http://localhost:8080/api/fotos/${fotoId}`, requestInfo)
        .then(() => {
          dispatch(apaga(fotoId));
          dispatch(notifica('Picture was deleted'));
        })
        .catch(err => dispatch(notifica('Unable to delete picture')));
    };
  }

  static comenta(fotoId, textoComentario) {
    return dispatch => {
      const requestInfo = {
        method: 'POST',
        body: JSON.stringify({ texto: textoComentario }),
        headers: new Headers({
          'Content-type': 'application/json'
        })
      };

      fetch(
        `http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem(
          'auth-token'
        )}`,
        requestInfo
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Unable to comment');
          }
        })
        .then(novoComentario => {
          dispatch(comentario(fotoId, novoComentario));
          return novoComentario;
        });
    };
  }

  static like(fotoId) {
    return dispatch => {
      fetch(
        `http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem(
          'auth-token'
        )}`,
        { method: 'POST' }
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Unable to like the picture');
          }
        })
        .then(liker => {
          dispatch(like(fotoId, liker));
          return liker;
        });
    };
  }

  static pesquisa(login) {
    return dispatch => {
      fetch(`http://localhost:8080/api/public/fotos/${login}`)
        .then(response => response.json())
        .then(fotos => {
          if (fotos.length === 0) {
            dispatch(notifica('User not found'));
          } else {
            dispatch(notifica('User found'));
          }

          dispatch(listagem(fotos));
          return fotos;
        });
    };
  }
}
