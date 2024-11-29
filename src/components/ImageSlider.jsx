import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

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

  if (loading) {
    return <div>Loading... Data is on the way.</div>;
  }

  if (error !== null) {
    return <div>Error occurred</div>;
  }

  function handlePrevious() {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  }

  function handleNext() {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  }

  function setCurrentSlide(getIndex) {
    setSlide(getIndex);
  }

  return (
    <div className="relative flex justify-center items-center w-[600px] h-[450px] mx-auto">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="absolute left-4 w-8 h-8 text-white drop-shadow-md cursor-pointer"
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.url}
              src={imageItem.download_url}
              className={`rounded-lg shadow-md w-full h-full ${
                slide === index ? "block" : "hidden"
              }`}
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="absolute right-4 w-8 h-8 text-white drop-shadow-md cursor-pointer"
      />
      <span className="flex absolute bottom-4 space-x-2">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={`h-4 w-4 rounded-full outline-none border-none ${
                  slide === index ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
