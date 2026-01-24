import React, { useState, useRef } from "react";
import { FiUploadCloud, FiX, FiStar, FiTrash2, FiMove, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const ImageUploader = ({
  images,
  setImages,
  maxImages = 10,
  theme = "light",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect(e.dataTransfer.files);
    }
  };

  const handleImageSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    if (images.length + validFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      prev.forEach((img) => {
        if (img.id === id) {
          URL.revokeObjectURL(img.preview);
        }
      });
      return updated;
    });
  };

  const handleSort = (index) => {
    if (dragItem.current === index || dragItem.current === null) return;

    const _images = [...images];
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];
    _images.splice(index, 0, draggedItemContent);

    dragItem.current = index;
    setImages(_images);
  };

  const handleMove = (index, direction) => {
    if (direction === 'left' && index > 0) {
      const _images = [...images];
      const temp = _images[index];
      _images[index] = _images[index - 1];
      _images[index - 1] = temp;
      setImages(_images);
    } else if (direction === 'right' && index < images.length - 1) {
      const _images = [...images];
      const temp = _images[index];
      _images[index] = _images[index + 1];
      _images[index + 1] = temp;
      setImages(_images);
    }
  };

  const handleDragStart = (e, index) => {
    dragItem.current = index;
    setDraggingIndex(index);
  };

  const handleDragEnter = (e, index) => {
    e.preventDefault();
    handleSort(index);
  };

  const handleDragEnd = () => {
    dragItem.current = null;
    dragOverItem.current = null;
    setDraggingIndex(null);
  };

  const handleSetCover = (index) => {
    if (index === 0) return; // Already cover
    const _images = [...images];
    const [selectedImage] = _images.splice(index, 1);
    _images.unshift(selectedImage);
    setImages(_images);
  };

  const handleFileInputClick = () => {
    document.getElementById("imageInput").click();
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3
          className={`text-sm font-medium uppercase tracking-wide ${
            theme === "dark" ? "text-slate-300" : "text-gray-700"
          }`}
        >
          IMAGES
        </h3>
        <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
            {images.length > 0 ? "Drag to reorder • First image is cover" : ""}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Upload Area */}
        <div className="flex-shrink-0 w-full md:w-50">
          <div
            className={`w-full md:w-50 h-32 md:h-47 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
              dragActive
                ? "border-orange-400 bg-orange-50"
                : theme === "dark"
                ? "border-gray-500 bg-[#111827]"
                : "border-gray-300 bg-[#F8F8FF] hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleFileInputClick}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center relative ${
                  theme === "dark" ? "bg-[#1f2937]" : "bg-gray-100"
                }`}
              >
                <FiUploadCloud className={`w-6 h-6 md:w-8 md:h-8 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-500'}`} />
              </div>
              <div className="text-center space-y-1 md:space-y-4">
                <p
                  className={`text-xs md:text-sm leading-tight ${
                    theme === "dark" ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  <span className="font-bold text-primary ">
                    Click to upload
                  </span>{" "}
                  <span className="hidden md:inline">or <br /><span className="font-medium">drag and drop</span></span>
                </p>
                <p
                  className={`hidden md:block text-xs mt-1 ${
                    theme === "dark" ? "text-slate-500" : "text-gray-400"
                  }`}
                >
                  Supported formats:
                  <br />
                  JPEG & PNG
                </p>
              </div>
            </div>

            <input
              id="imageInput"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageSelect(e.target.files)}
            />
          </div>
          <p
            className={`text-xs mt-2 text-center ${
              theme === "dark" ? "text-slate-500" : "text-gray-500"
            }`}
          >
            Max {maxImages} pictures
          </p>
        </div>

        {/* Image Grid */}
        <div className="flex-1">
          {images.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative group cursor-move transition-all duration-300 ease-in-out ${
                      draggingIndex === index ? "opacity-40 scale-95" : "opacity-100 scale-100"
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div
                      className={`aspect-square rounded-lg overflow-hidden relative ${
                        theme === "dark" ? "bg-[#111827]" : "bg-gray-100"
                      } ${index === 0 ? "ring-2 ring-amber-500" : ""}`}
                    >
                      <img
                        src={image.preview}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Cover Badge */}
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                          COVER
                        </div>
                      )}

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                         <div className="flex items-center gap-2">
                            {/* Move Left */}
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMove(index, 'left');
                                    }}
                                    title="Move Left"
                                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                                >
                                    <FiChevronLeft className="w-4 h-4" />
                                </button>
                            )}
                            
                             {/* Set Cover Button */}
                             {index !== 0 && (
                                 <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetCover(index);
                                    }}
                                    title="Set as Cover"
                                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-amber-500 hover:text-white transition-colors"
                                 >
                                     <FiStar className="w-4 h-4" />
                                 </button>
                             )}
                             
                             {/* Move Right */}
                             {index < images.length - 1 && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMove(index, 'right');
                                    }}
                                    title="Move Right"
                                    className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                                >
                                    <FiChevronRight className="w-4 h-4" />
                                </button>
                             )}
                         </div>

                         {/* Remove Button */}
                         <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                            }}
                            title="Remove Image"
                            className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-red-500 hover:text-white transition-colors"
                         >
                             <FiTrash2 className="w-4 h-4" />
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p
                className={`text-sm mt-3 ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                {images.length}/{maxImages} images selected
              </p>
            </div>
          ) : (
            <div className={`flex items-center justify-center h-32 text-sm border-2 border-dashed rounded-lg ${theme === 'dark' ? 'border-gray-700 text-gray-500' : 'border-gray-200 text-gray-400'}`}>
              No images selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
