import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { guardarTokenAuth, loginToken } from "../services/token";
import Navigation from "./auxiliarcomponent/Navigation";

function Authorized() {
    const [code, setCode] = useState("");
    const [token, setToken] = useState("");
//13
    useEffect(() => {
        console.log(window.location.href.split("code=")[1])
        setCode(window.location.href.split("code=")[1])
        if (code.length > 0) {
            login()
        }
    }, [code])

    const login = async () => {
        let response = await loginToken(code);
        let json;
        if (response.status === 200) {
            json = await response.json()
            setToken(json.access_token)
            guardarTokenAuth(json.access_token, json.refresh_token);

            console.log(json)
        }
    }

    return <>
    <Navigation/>
    <h1>authorized {code} Token : {token} </h1>
    </>
}
export default Authorized;