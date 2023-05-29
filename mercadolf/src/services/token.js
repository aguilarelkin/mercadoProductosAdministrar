import { logoutAuth } from "../session/operation.login";
import { enviroments } from "./enviroments";

const API_LOGIN = enviroments.token_url;
let _refresh;
let _token;

export const loginToken = async (code) => {

    try {
        let response = await fetch(API_LOGIN, {
            method: "POST",
            body: paramLogin(code),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + credentialsLogin()
            }
        })

        return response;
    } catch (error) {

    }
}
const paramLogin = (code) => {
    const datosLogin = new URLSearchParams();

    datosLogin.set('grant_type', enviroments.grant_type)
    datosLogin.set('client_id', enviroments.client_id)
    datosLogin.set('redirect_uri', enviroments.redirect_uri)
    datosLogin.set('scope', enviroments.scope)
    datosLogin.set('code_verifier', enviroments.code_verifier)
    datosLogin.set('code', code)

    return datosLogin.toString();
}

const credentialsLogin = () => {
    return btoa('oidc-client' + ':' + 'secret');
}

export const guardarTokenAuth = (access, refresh) => {
    sessionStorage.removeItem('access_token');
    sessionStorage.setItem('access_token', access);
    sessionStorage.removeItem('refresh_token')
    sessionStorage.setItem('refresh_token', refresh);

}

export const findByUser = async (dato) => {
    try {
        let response = await fetch(enviroments.resource_url + "/user", {
            method: "GET",
            headers: authorizationAu()
        })
        return response;
    } catch (error) {

    }
}

export const findByAdmin = async (dato) => {
    try {
        let response = await fetch(enviroments.resource_url + "/admin", {
            method: "GET",
            headers: authorizationAu()
        })
        return response;
    } catch (error) {

    }
}
export const authorizationAu = () => {
    let tokens = getTokenAu();

    if (tokens !== null) {
        let header = new Headers({ "Authorization": "Bearer " + tokens });
        //header.append('Authorization','Bearer '+tokens)
        return header;
    } else {
        return new Headers();
    }
}
export const getTokenAu = () => {
    if (_token != null) {
        return _token;
    } else if (_token == null && sessionStorage.getItem('access_token') != null) {
        _token = sessionStorage.getItem('access_token');
        return _token;
    }
    return null;
}
export const getRefreshAu = () => {
    if (_refresh != null) {
        return _refresh;
    } else if (_refresh == null && sessionStorage.getItem('refresh_token') != null) {
        _refresh = sessionStorage.getItem('refresh_token');
        return _refresh;
    }
    return null;
}
export const isAutenticatedAu = () => {
    let payload = obtenerDatoTokenA(getTokenAu());
   // console.log(payload)
    if (!isTokenExpiredA()) {
        if (payload !== null && payload.sub && payload.sub.length > 0) {

            return true;
        } else {
            return false;
        }
    } else {
        logoutAuth();
    }
}
export const obtenerDatoTokenA = (token) => {
    if (token !== null) {
        return JSON.parse(atob(token.split(".")[1]))
    }
    return null;
}

const isTokenExpiredA = () => {
    let payload = obtenerDatoTokenA(getTokenAu());
  
    let nowDate = new Date().getTime() / 1000;
   
    if (payload !== null) {
        if (payload.exp < nowDate) {
            
            return true;
        }
        return false;
    }
    return false;

}
export const hasRoleAu = () => {
    let payload = obtenerDatoTokenA(getTokenAu());

    if (payload !== null) {
        return payload.roless;
    }
    return [];


}