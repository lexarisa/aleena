import styles from '../../styles/Modal.module.css';
import ModalProp from '../types/ModalProp';

const Modal = ({ children }: ModalProp) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Modal;
