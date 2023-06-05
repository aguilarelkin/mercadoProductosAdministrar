import { obtenerDatoToken } from "./auth.authenticated";

export const guardarUser = (datos) => {
    let payload = obtenerDatoToken (datos);

    //let id = payload.id;
   // let nombre = payload.nombre;
    //let apellido = payload.apellido;
    //let email = payload.email;
    let username = payload.sub;
    let roles = payload.roless;

    let dato = JSON.stringify({
        //id, nombre, apellido, email, 
        username, roles
    });

    console.log(payload.authorities);
    sessionStorage.setItem('usuario', dato);

}
export const guardarToken = (datos) => {
    sessionStorage.setItem('token', datos);
}