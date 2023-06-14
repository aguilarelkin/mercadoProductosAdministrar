import { useState } from "react";
import { useEffect } from "react";
import generar, { deleteVerifier } from "../services/auth";
import { isAutenticated } from "../auth/auth.authenticated";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { loginToken } from "../services/productApi";
import { guardarTokenAuth } from "../auth/token.login";

function Authorized() {
    const [code, setCode] = useState("");
    // const [token, setToken] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [sesion, setSesion] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        if (isAutenticated()) {
            setSesion(isAutenticated());
            Swal.fire('Login', `Estás autenticado`, 'info')
            history("/home")
        }
        setCode(window.location.href.split("code=")[1])

        if (code.length > 0) {
            login()
        }

    }, [code, mensaje])

    const login = async () => {
        try {      
            let response = await loginToken(code);
            let json;
            if (response.status === 200) {
                json = await response.json()
                // setToken(json.access_token)
                guardarTokenAuth(json.access_token, json.refresh_token);
                deleteVerifier();
                history("/home")
            }else {
                setMensaje("Error")
                generar();
            }
        } catch (error) {
            setMensaje("Error")
            //generar();
        }
    }

    return <>
        <h1>CARGANDO</h1>
    </>
}
export default Authorized;