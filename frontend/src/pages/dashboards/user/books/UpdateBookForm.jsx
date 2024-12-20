import React from "react";
import CategoryDropdown from "./CategoryDropdown";

const UpdateBookForm = ({
  handleSubmit,
  bookDetails,
  handleChange,
  categories,
  handleCategoryChange,
  handleFileChange,
  isBookPosting,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-2 max-w-lg mx-auto"
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={bookDetails.title}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>

        {categories.length > 0 && (
          <CategoryDropdown
            categories={categories}
            selectedCategory={bookDetails.category_id}
            onCategoryChange={handleCategoryChange}
          />
        )}
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Author"
            value={bookDetails.author}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>
        <div>
          <label htmlFor="language">Language</label>
          <input
            type="text"
            name="language"
            id="language"
            placeholder="language"
            value={bookDetails.language}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>

        <div>
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            id="about"
            placeholder="About the Book"
            value={bookDetails.about}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded form-control"
          ></textarea>
        </div>

        <div>
          <label htmlFor="">Published date</label>
          <input
            type="date"
            name="published_date"
            value={bookDetails.published_date}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>

        <div>
          <label htmlFor="qty">Qty</label>
          <input
            type="number"
            name="qty"
            id="qty"
            placeholder="Quantity"
            value={bookDetails.qty}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={bookDetails.price}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>

        <div>
          <label htmlFor="sell_price">Sale Price</label>
          <input
            type="number"
            name="sell_price"
            id="sell_price"
            placeholder="Sell Price"
            value={bookDetails.sell_price}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>

        <div>
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Tags (comma separated)"
            value={bookDetails.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>
        <div>
          <label htmlFor="file">Book cover photo</label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded form-control"
          />
        </div>

        <div>
          <button
            disabled={isBookPosting}
            type="submit"
            className="btn btn-primary max-w-max "
          >
            {isBookPosting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateBookForm;
