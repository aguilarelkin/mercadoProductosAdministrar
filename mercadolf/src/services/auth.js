import { enviroments } from "./enviroments"

function oauth() {
    const authorize_uri = enviroments.authorize_uri;

    const params = {
        client_id: enviroments.client_id,
        redirect_uri: enviroments.redirect_uri,
        scope: enviroments.scope,
        response_type: enviroments.response_type,
        response_mode: enviroments.response_mode,
        code_challenge_method: enviroments.code_challenge_method,
        code_challenge: enviroments.code_challenge,
    }

    const url =
        `${authorize_uri}client_id=${enviroments.client_id}&redirect_uri=${enviroments.redirect_uri}&scope=${enviroments.scope}&response_type=${enviroments.response_type}&response_mode=${enviroments.response_mode}&code_challenge_method=${enviroments.code_challenge_method}&code_challenge=${enviroments.code_challenge}`
    return url;
}

function generar() {

    window.location.href= oauth();

}

export default generar;
