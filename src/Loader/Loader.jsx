import { PuffLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <PuffLoader color="#3b5998" size={60} />{" "}
    </div>
  );
};

export default Loader;
