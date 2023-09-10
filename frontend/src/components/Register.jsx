import Header from "./Header"
import { Link } from "react-router-dom"
import { useForm } from "./hooks/useForm"
import AuthorizationForm from "./AuthorizationForm";

export default function Register({ onLogin, buttonText }) {

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
                <Link to='/signin' className="header__link">Вход</Link>

            </Header>

            <div className="login">
                <div className="login__container page__login">
                    <h1 className="login__title">Регистрация</h1>
                    <AuthorizationForm
                        onLogin={onLogin}
                        buttonText={'Зарегистрироваться'}
                    />
                    <p className="login__link-bottom">Уже зарегистрированы? <Link to="/signin" className="login__link-bottom">Войти</Link></p>
                </div>
            </div>
        </>
    )
}