import { useForm } from "./hooks/useForm";

export default function AuthorizationForm({onLogin, buttonText}) {

    const { values, handleChange, setValues } = useForm({email: "", password: ""});

    function handleSubmit(event) {

        event.preventDefault();
        onLogin({
            email: values.email,
            password: values.password
        });
    }
    
    return (

        <form className="popup__form" onSubmit={handleSubmit}>
            <input id="email" type="email" name="email" className="popup__input popup__input_type_login"
                placeholder="Email"
                minLength={2}
                maxLength={30}
                value={values.email}
                onChange={handleChange}
                required
            />
            <input id="password" type="password" name="password" className="popup__input popup__input_type_login"
                placeholder="Пароль"
                minLength={2}
                maxLength={30}
                value={values.password}
                onChange={handleChange}
                required
            />
            <button type="submit" className="popup__submit popup__submit-login">{buttonText}</button>
        </form>
    )


}