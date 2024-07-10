import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./style.css";

export default function ImageSlider({ url, limit = 10, page = 1 }) {
  const [images, setImages] = useState();
  const [slide, setSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") fetchImages(url);
  }, [url]);
  // console.log(images);
  if (loading) {
    return <div>Loading...Data is on the way.</div>;
  }

  if (error !== null) {
    return <div> Error occured</div>;
  }

  // console.log(error);

  function handlePrevious() {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  }

  function handleNext() {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  }

  function setCurrentSlide(getIndex){
    setSlide(getIndex);
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.url}
              src={imageItem.download_url}
              className={
                slide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  slide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={()=> setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
} 
