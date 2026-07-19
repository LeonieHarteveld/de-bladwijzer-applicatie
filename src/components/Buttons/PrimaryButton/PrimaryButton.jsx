import styles from './PrimaryButton.module.scss';

function PrimaryButton({onClick, text, type, size = 'medium', fullWidth = false}) {

    const buttonClass = [
        styles.primaryButton,
        styles[`primaryButton--${size}`],
        fullWidth && styles['primaryButton--fullWidth'],
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button
            className={buttonClass}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default PrimaryButton;