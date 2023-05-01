
import Swal from "sweetalert2";
import { setToken } from "../auth/auth.token.user";

export const logout = () => {
    setToken();
    sessionStorage.clear();
    Swal.fire("Login", 'Sessión finalizada', 'warning');
}