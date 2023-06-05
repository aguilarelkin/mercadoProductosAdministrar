
let _usuario;
let _token;

export const getToken = () => {
    if (_token != null) {
        return _token;
    } else if (_token == null && sessionStorage.getItem('access_token') != null) {
        _token = sessionStorage.getItem('access_token');
        return _token;
    }
    return null;
}

export const getUsuario = () => {
    if (_usuario != null) {
        return _usuario;
    } else if (_usuario == null && sessionStorage.getItem('usuario') != null) {
        _usuario = JSON.parse(sessionStorage.getItem('usuario'));
        return _usuario;
    }
    return null;
}

export const setToken=()=>{
    _token = null;
    _usuario = null;
}