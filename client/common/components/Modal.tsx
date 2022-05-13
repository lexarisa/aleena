import styles from '../../styles/Modal.module.css';
import { useState } from 'react';
interface ModalProp {
  children: React.ReactNode;
}
const Modal = ({ children }: ModalProp) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default Modal;
