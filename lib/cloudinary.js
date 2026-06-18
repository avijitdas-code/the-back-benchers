import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(fileBuffer, fileName) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "backbenchers",
        public_id: fileName.replace(".pdf", ""),
        format: "pdf",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            fileId: result.public_id,

            viewLink: result.secure_url,

            downloadLink: result.secure_url.replace(
              "/upload/",
              "/upload/fl_attachment/"
            ),
          });
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId) {
  // Materials were uploaded with resource_type "raw", so deletion must match.
  return cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
}
