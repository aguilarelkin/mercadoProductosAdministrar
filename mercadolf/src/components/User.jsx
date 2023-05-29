import { useEffect } from "react";
import { findByUser, hasRoleAu, isAutenticatedAu } from "../services/token";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function User() {
const [mensaje, setMensaje] = useState("");

const [sesiona, setSesiona] = useState(false);
const history = useNavigate();
    useEffect(() => {
        setSesiona(isAutenticatedAu());
        if (!isAutenticatedAu()) {
            Swal.fire('Login', 'Login', 'warning')
            history("/")
        } else {
            if (hasRoleAu().length > 0 && hasRoleAu().indexOf('ROLE_USER') !== -1) {
                dat()
            } else {
                Swal.fire('Acceso denegado', 'No tienes permisos', 'warning')
                history("/")
            }
        }



    }, [mensaje]);

    const dat = async () => {
        let response = await findByUser();
        let json
        if (response.status === 200) {
            json = await response.json();
            setMensaje(json.mensaje);
        }
    }
    return <h1>User {mensaje}</h1>
}

export default User;