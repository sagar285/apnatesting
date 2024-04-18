const app = require("./app");
const connectDatabase = require("./src/config/database.js");
const AWS = require("aws-sdk");


const s3 = new AWS.S3();

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:8000`);
});

// Corrected Async IIFE
// (async () => {
//   try {
//     await s3.putObject({
//       Body: "Helloworld",
//       Bucket: "survey-sci-sync",
//       Key: "file.txt" 
//     }).promise();
//     console.log("Uploaded to S3 successfully");
//   } catch (error) {
//     console.error("Error uploading to S3:", error.message);
//   }
// })(); // Ensured the function is immediately invoked

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
