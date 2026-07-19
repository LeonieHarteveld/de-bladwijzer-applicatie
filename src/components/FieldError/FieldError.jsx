import styles from './AddBook.module.scss';

function FieldError({message}) {
    if (!message) {
        return null;
    }

    return (
        <p className={styles.addBookForm__error}>
            {message}
        </p>
    );
}

export default FieldError;