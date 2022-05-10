import styles from '../../../styles/CustomButton.module.css';

interface CustomButtonProp {
  button: String;
  onClick?: React.MouseEventHandler;
}

function CustomButton({ button, onClick }: CustomButtonProp) {
  return (
    <button onClick={onClick} className={styles.container}>
      {button}
    </button>
  );
}

export default CustomButton;
