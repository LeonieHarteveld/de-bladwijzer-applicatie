import styles from './AuthFormField.module.scss';
import emailIcon from "../../assets/icons/email-icon.svg";
import passwordIcon from "../../assets/icons/password-icon.svg";

function AuthFormField({id, label, type = 'text', name, placeholder, value, onChange, error,}) {

    const icon =
        type === 'password'
            ? passwordIcon
            : emailIcon;

    return (
        <div className={styles.formField}>
            <label
                className={styles.formField__label}
                htmlFor={id}
            >
                {label}
            </label>

            <div className={styles.formField__inputWrapper}>
                <img
                    className={styles.formField__icon}
                    src={icon}
                    alt="icon"
                />

                <input
                    className={styles.formField__input}
                    id={id}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            </div>


            {error && (
                <p
                    className={styles.formField__error}
                >
                    {error}
                </p>
            )}
        </div>
    );
}

export default AuthFormField;