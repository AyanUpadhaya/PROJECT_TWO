const cloudinary = require("../config/cloudinary.config")

const getDataUri = require("./datauri");

const uploadToCloudinary = async (req) => {
  if (!req.files || !req.files.file || req.files.file.length === 0) {
    throw new Error("No file uploaded");
  }
  const fileName = req.files.file[0].filename;
  try {
    const file = req.files.file[0];
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const finalOuput = cloudResponse.secure_url;
    return [finalOuput, fileName];
  } catch (error) {
    console.log(error);
    logger.error(error.message || "Failed to upload cloudinary");
  }
};

module.exports = uploadToCloudinary;
