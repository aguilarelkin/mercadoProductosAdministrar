import { Navigate, Outlet } from "react-router-dom"
import { hasRole } from "../auth/auth.authenticated"

export const Protected = ({ user, sesion, children, redirectTo = "/" }) => {

    if (sesion && user !== "") {
        let roles = hasRole();
        if (roles.includes(user)) {
            return <Navigate to={redirectTo} />
        }
    }
    return children ? children : <Outlet />
} 