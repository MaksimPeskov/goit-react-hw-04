import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "../services/api";
import styles from "./App.module.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { results: newImages, totalPages } = await fetchImages(
          query,
          page,
          controller.signal
        );

        if (!totalPages) {
          setIsEmpty(true);
          return;
        }

        setTotalPages(totalPages);
        setImages((prevImages) => {
          return page === 1 ? newImages : [...prevImages, ...newImages];
        });

        if (newImages.length === 0 && page > 1) {
          toast("No more images to load.");
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        setError("Failed to fetch images. Please try again later.");
        toast.error("Failed to fetch images. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  const handleSearch = (newQuery) => {
    if (!newQuery.trim()) {
      toast.error("Please enter a search term!");
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setError(null);
    setTotalPages(0);
    setIsEmpty(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {isEmpty && <ErrorMessage message="No images found for your query." />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={!!selectedImage}
        onClose={closeModal}
        image={selectedImage}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
