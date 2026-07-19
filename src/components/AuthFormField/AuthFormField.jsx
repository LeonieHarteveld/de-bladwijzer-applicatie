import styles from './AuthFormField.module.scss';

function AuthFormField({id, label, type = 'text', name, placeholder, value, onChange, error,}) {
    return (
        <div className={styles.formField}>
            <label
                className={styles.formField__label}
                htmlFor={id}
            >
                {label}
            </label>

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