import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        className={styles.image}
      />
      <div className={styles.info}>
        <p>Author: {image.user.name}</p>
        <p>Likes: {image.likes}</p>
        {image.description && <p>Description: {image.description}</p>}
      </div>
    </Modal>
  );
};

export default ImageModal;
