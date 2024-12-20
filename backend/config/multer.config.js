const multer = require("multer");

const initializeMulter = (app) => {
  const storage = multer.memoryStorage();

  const upload = multer({ storage });

  app.use(
    upload.fields([
      { name: "single", maxCount: 1 },
      { name: "file", maxCount: 1 },
      { name: "multiple", maxCount: 10 },
    ])
  );

  // Custom Multer error handler middleware
  app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ message: err?.message });
    } else {
      next(err);
    }
  });
};

module.exports = { initializeMulter };
