import styles from '../../../styles/CustomButton.module.css';
import ICustomButtonProp from '../../types/ICustomButtonProps';

const CustomButton = ({
  button,
  onClick,
  color,
  textColor,
}: ICustomButtonProp) => {
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
