import { getToken } from "../auth/auth.token.user";

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
export const paramsLogin = (username, password) => {
    const datosLogin = new URLSearchParams();

    datosLogin.set('grant_type', 'password')
    datosLogin.set('username', username)
    datosLogin.set('password', password)

    return datosLogin.toString();
}

export const credentialsLogin = () => {
    return btoa('reactapp' + ':' + '12345');
}
