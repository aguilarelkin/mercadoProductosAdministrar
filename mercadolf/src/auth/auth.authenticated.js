import { logout } from "../session/operation.login";
import { getToken, getUsuario } from "./auth.token.user";

export const isAutenticated = () => {
    let payload = obtenerDatoToken(getToken());

    if (!isTokenExpired()) {
        if (payload !== null && payload.sub && payload.sub.length > 0) {
         
            return true;
           
        } else {
          
            return false;
        }
        
    } else {
       
        logout();
    }
}

const isTokenExpired = () => {
    let payload = obtenerDatoToken(getToken());
    let nowDate = new Date().getTime() / 1000;
    if (payload !== null) {
        if (payload.exp < nowDate) {
            return true;
        }
        return false;
    }
    return false;

}

export const obtenerDatoToken = (token) => {
    if (token !== null) {
        return JSON.parse(atob(token.split(".")[1]))
    }
    return null;
}

export const hasRole = () => {
    let user = getUsuario();
    if (user !== null && user.roles.length > 0) {
        return user.roles;
    }
    return [];


}