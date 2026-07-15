import styles from "./FormField.module.scss"

function FormField({
                       id,
                       label,
                       type = 'text',
                       name,
                       placeholder,
                       value,
                       onChange,
                   }) {
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
                required
            />
        </div>
    );
}

export default FormField;