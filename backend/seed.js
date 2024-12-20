const Book = require("./modules/book/Book");
const Category = require("./modules/category/Category");
const Store = require("./modules/store/Store");
const User = require("./modules/user/User");
const mongoose = require("mongoose");

const connection_string = `mongodb://127.0.0.1:27017/bookstore`;
mongoose.connect(connection_string);

var category_id;
var store_id;
var user_id;

//   User
async function seedUser() {
  // Create a single user
  try {
    const user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "$2a$10$Qe1WLTpyswWQzh1wG9et9eszOyLjsLA3kFhTJ8hvWWDqp.NIJkV/2", // 123456
      role: "user", // Adjust fields based on your User schema
    });

    const res = await user.save();
    user_id = res?._id;
    console.log("User Added Successfully ✅");
    console.log(res);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}
async function seedCategory() {
  try {
    // Create a single category
    const category = new Category({
      name: "Fiction", // Replace with your desired category name
    });

    const res = await category.save(); // Save the category to the database
    category_id = res?._id;
    console.log("Category added successfully  ✅", res);
  } catch (error) {
    console.error("Error adding category:", error);
  }
}
async function seedStore() {
  try {
    // Create a single store
    const store = new Store({
      name: "Book Haven", // Replace with your desired store name
      location: "Dhaka, Bangladesh", // Replace with your desired location
      description: "A cozy store for book lovers", // Optional description
      created_by: user_id, // Replace with a valid User ObjectId
      book_ids: [], // Replace with valid Book ObjectIds
    });

    const res = await store.save(); // Save the store to the database
    store_id = res?._id;
    const user = await User.findById(user_id);
    user.store_id = store._id;
    user.is_store_owner = true; // Ensure this is set to true
    await user.save();

    console.log("Store added successfully  ✅", store);
  } catch (error) {
    console.error("Error adding store:", error);
  }
}
async function seedBooks() {
  try {
    // Array of book data
    console.log(category_id, store_id);
    const books = [
      {
        cover_photo:
          "https://res.cloudinary.com/dmcpfuntl/image/upload/v1734551804/euip6llzmdfiggjntbgq.jpg", // Replace with actual cover photo URL
        category_id: category_id, // Replace with a valid Category ObjectId
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        about:
          "A novel set in the Jazz Age exploring themes of wealth and love.",
        published_date: new Date("1925-04-10"),
        created_by: user_id, // Replace with a valid User ObjectId
        store_id: store_id, // Replace with a valid Store ObjectId
        qty: 10,
        price: 15.99,
        sell_price: 12.99,
        tags: ["classic", "fiction"],
      },
      {
        cover_photo:
          "https://res.cloudinary.com/dmcpfuntl/image/upload/v1734551804/euip6llzmdfiggjntbgq.jpg",
        category_id: category_id,
        title: "1984",
        author: "George Orwell",
        about: "A dystopian novel about totalitarianism.",
        published_date: new Date("1949-06-08"),
        created_by: user_id,
        store_id: store_id,
        qty: 10,
        price: 14.99,
        sell_price: 11.99,
        tags: ["dystopian", "political"],
      },
      {
        cover_photo:
          "https://res.cloudinary.com/dmcpfuntl/image/upload/v1734551804/euip6llzmdfiggjntbgq.jpg",
        category_id: category_id,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        about: "A novel about racial injustice in the Deep South.",
        published_date: new Date("1960-07-11"),
        created_by: user_id,
        store_id: store_id,
        qty: 10,
        price: 18.99,
        sell_price: 14.99,
        tags: ["classic", "law"],
      },
      {
        cover_photo:
          "https://res.cloudinary.com/dmcpfuntl/image/upload/v1734551804/euip6llzmdfiggjntbgq.jpg",
        category_id: category_id,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        about: "A novel about teenage rebellion and alienation.",
        published_date: new Date("1951-07-16"),
        created_by: user_id,
        store_id: store_id,
        qty: 10,
        price: 13.99,
        sell_price: 10.99,
        tags: ["coming-of-age", "fiction"],
      },
      {
        cover_photo:
          "https://res.cloudinary.com/dmcpfuntl/image/upload/v1734551804/euip6llzmdfiggjntbgq.jpg",
        category_id: category_id,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        about:
          "A romantic novel about manners and marriage in 19th-century England.",
        published_date: new Date("1813-01-28"),
        created_by: user_id,
        store_id: store_id,
        qty: 10,
        price: 16.99,
        sell_price: 13.99,
        tags: ["romance", "classic"],
      },
    ];

    // Insert books into the database
    for (const bookData of books) {
      const book = new Book(bookData);
      await book.save();
      console.log("Book added successfully:", book.title);
    }
  } catch (error) {
    console.error("Error adding books:", error);
  }
}

const seedData = async () => {
  //
  await seedUser();
  await seedCategory();
  await seedStore();
  await seedBooks();

  console.log("Seeding data done 👍");
};

seedData();
