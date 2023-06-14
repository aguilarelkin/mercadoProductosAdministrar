
import Swal from "sweetalert2";
import { setToken } from "../auth/auth.token.user";
import { enviroments } from "../services/enviroments";
import { useNavigate } from "react-router-dom";
import generar from "../services/auth";

export const logout = () => {
    setToken();
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('usuario');
    generar();
    // window.location.href = enviroments.login_url;
    Swal.fire("Login", 'Sessión finalizada', 'warning');
}
export const logoutAuth = () => {

    window.location.href = enviroments.logout_url;

}