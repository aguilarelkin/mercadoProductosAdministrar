
let _usuario;
let _token;
let _refresh;

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

export const setToken = () => {
    _token = null;
    _usuario = null;
    _refresh = null;
}

export const getRefresh = () => {
    if (_refresh != null) {
        return _refresh;
    } else if (_refresh == null && sessionStorage.getItem('refresh_token') != null) {
        _refresh = sessionStorage.getItem('refresh_token');
        return _refresh;
    }
    return null;
}