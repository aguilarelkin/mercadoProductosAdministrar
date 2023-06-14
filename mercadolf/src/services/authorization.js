import { getToken } from "../auth/auth.token.user";
import { getVerifier } from "./auth";
import { enviroments } from "./enviroments";

export const authorization = () => {
    let tokens = getToken();

    if (tokens !== null) {
        let header = new Headers({ "Authorization": "Bearer " + tokens });
        //header.append('Authorization','Bearer '+tokens)
        return header;
    } else {
        return new Headers();
    }
}

export const authorizationCreate = () => {

    const tokens = getToken();

    if (tokens !== null) {
        return new Headers({ "Content-Type": "application/json", "Authorization": "Bearer " + tokens });
        //header.append("Content-Type","application/json")
    } else {
        return new Headers();
    }
}
export const authorizationCreateCliente = () => {

   // const tokens = getToken();

    //if (tokens !== null) {
        return new Headers({ "Content-Type": "application/json" });
        //header.append("Content-Type","application/json")
    //} else {
      //  return new Headers();
    //}
}
/*export const paramsLogin = (username, password) => {
    const datosLogin = new URLSearchParams();
    console.log(username)
   // datosLogin.set('_csrf', '-li7b8QC61od916GSFYhQ8rJ7RXakteIuiudZ-rSE9y9anPQzmvYV_Iw3WkwkjiyfnsVIP6rwHS8q7WliUqqBIuxJOmFCUe0')
    datosLogin.set('username', username)
    datosLogin.set('password', password)

    return datosLogin.toString();
}*/

export const paramLogin = (code) => {
    const datosLogin = new URLSearchParams();
    datosLogin.set('grant_type', enviroments.grant_type)
    datosLogin.set('client_id', enviroments.client_id)
    datosLogin.set('redirect_uri', enviroments.redirect_uri)
    datosLogin.set('scope', enviroments.scope)
    datosLogin.set('code_verifier', getVerifier())
    datosLogin.set('code', code)

    return datosLogin.toString();
}

export const credentialsLogin = () => {
    return btoa('oidc-client' + ':' + 'secret');
}
