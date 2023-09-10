import { Navigate } from "react-router-dom"

const ProtectedRoute = (props) => {

    return (
        props.loggedIn ? props.children : <Navigate to="/signin" replace />
    )
}

export default ProtectedRoute