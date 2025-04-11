import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description || "Image"}
        className={styles.image}
      />
    </div>
  );
};

export default ImageCard;
