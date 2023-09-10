import Header from "./Header"
import { Link } from "react-router-dom"
import AuthorizationForm from "./AuthorizationForm";

export default function Login({ onLogin }) {

    
    /* function handleSubmit(event) {

        event.preventDefault();
        onLogin({
            email: values.email,
            password: values.password
        });
    } */

    return (

        <>
            <Header>
                <Link to='/signup' className="header__link">Регистрация</Link>

            </Header>

            <div className="login__container page__login">
                <h1 className="login__title">Вход</h1>
                <AuthorizationForm
                    onLogin={onLogin}
                    buttonText={'Войти'}
                />
                
            </div>
        </>

    )
}