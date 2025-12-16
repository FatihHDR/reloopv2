import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Image as ImageIcon, Video, X } from 'lucide-react';
import './ProductReviewPage.css';


const ProductReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [review, setReview] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleStarClick = (star: number) => setRating(star);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setFiles(prev => [...prev, ...Array.from(files)]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        f => f.type.startsWith('image/') || f.type.startsWith('video/')
      );
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (index: number) => setFiles(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        className="review-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="review-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h1>Thank you for your review!</h1>
        </div>
        <p>Your review for {product?.name} has been submitted.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="review-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="review-header">
        <button className="back-button" onClick={() => navigate('/history')}>
          <ArrowLeft size={20} />
        </button>
        <h1>Write Review</h1>
      </div>

      {product && (
        <div className="product-info">
          <img src="https://source.unsplash.com/random/300x300/?product" alt={product.name} className="product-image" />
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>Store: {product.store}</p>
            <p>Price: Rp {product.price.toLocaleString('id-ID')}</p>
          </div>
        </div>
      )}

      <div className="rating-section">
        <h2>Rating</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map(star => (
            <img
              key={star}
              src={star <= (hoveredStar || rating) ? '/src/assets/star-filled.png' : '/src/assets/star-empty.png'}
              alt={`Star ${star}`}
              className="star"
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
            />
          ))}
        </div>
      </div>

      <div className="review-text">
        <h2>Your Review</h2>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
      </div>

      <div className="upload-section">
        <h2>Add Photos or Videos</h2>
        <div
          className={`upload-area ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-label">
            <Upload size={32} />
            <p>Drag & drop or click to upload (Max 5 files)</p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="file-preview">
            {files.map((file, index) => (
              <div key={index} className="file-item">
                {file.type.startsWith('image/') ? <ImageIcon size={20} /> : <Video size={20} />}
                <span>{file.name}</span>
                <button onClick={() => removeFile(index)}><X size={16} /></button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="submit-btn" onClick={handleSubmit}>Submit Review</button>
    </motion.div>
  );
};

export default ProductReviewPage;
