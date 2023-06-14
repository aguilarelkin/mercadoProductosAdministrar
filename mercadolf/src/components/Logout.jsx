import { useEffect } from "react";
import Swal from "sweetalert2";
import { logout } from "../session/operation.login";

function Logout() {

    useEffect(
        () => {
            logout();
        }, []
    );

    return (<> </>);
}

export default Logout;