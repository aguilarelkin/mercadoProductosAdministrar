import { enviroments } from "./enviroments"
import * as CryptoJS from 'crypto-js';

const CHARACTER = 'ABCDEFGHIJKLMNOPQRSTUVWZYZabcdefghijklmnopqrstuvwxyz0123456789'
const authorize_uri = enviroments.authorize_uri;
function oauth() {

    let code_verifier;

    code_verifier = generateCodeVerifier();

    setVerifier(code_verifier);

    return urlAuth(code_verifier);

}

export default function generar() {

    window.location.href = oauth();

}

const urlAuth = (code_verifier) => {
    const code_challenge = generateCodeChallenge(code_verifier);

    const params = {
        client_id: enviroments.client_id,
        redirect_uri: enviroments.redirect_uri,
        scope: enviroments.scope,
        response_type: enviroments.response_type,
        response_mode: enviroments.response_mode,
        code_challenge_method: enviroments.code_challenge_method,
        // code_challenge: enviroments.code_challenge,
    }

    const url =
        `${authorize_uri}client_id=${enviroments.client_id}&redirect_uri=${enviroments.redirect_uri}&scope=${enviroments.scope}&response_type=${enviroments.response_type}&response_mode=${enviroments.response_mode}&code_challenge_method=${enviroments.code_challenge_method}&code_challenge=${code_challenge}`

    return url;
}

const generateCodeVerifier = () => {
    let result = '';
    const char_length = CHARACTER.length;
    for (let i = 0; i < 44; i++) {
        result += CHARACTER.charAt(Math.floor(Math.random() * char_length));
    }
    return result;
}
const setVerifier = (code_verifier) => {

    if (localStorage.getItem('code_verifier') !== null) {
        deleteVerifier();
    }

    const encrypted = CryptoJS.AES.encrypt(code_verifier, enviroments.secret_pkce);

    localStorage.setItem('code_verifier', encrypted.toString());
}
const generateCodeChallenge = (code_verifier) => {
    const codeVerifierHashh = CryptoJS.SHA256(code_verifier).toString(CryptoJS.enc.Base64);
    const code_challenge = codeVerifierHashh.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return code_challenge;
}
export const getVerifier = () => {
    const encrypted = localStorage.getItem('code_verifier');

    const decrypted = CryptoJS.AES.decrypt(encrypted, enviroments.secret_pkce).toString(CryptoJS.enc.Utf8);

    return decrypted;
}
export const deleteVerifier = () => {

    localStorage.removeItem('code_verifier')
}