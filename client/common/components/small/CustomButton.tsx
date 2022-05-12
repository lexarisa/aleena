import styles from '../../../styles/CustomButton.module.css';

interface CustomButtonProp {
  button: String;
  onClick?: React.MouseEventHandler;
  color: String;
  textColor: String;
}

const CustomButton = ({
  button,
  onClick,
  color,
  textColor,
}: CustomButtonProp) => {
  return (
    <button
      onClick={onClick}
      className={styles.container}
      style={{ backgroundColor: color, color: textColor }}
    >
      {button}
    </button>
  );
};

export default CustomButton;
