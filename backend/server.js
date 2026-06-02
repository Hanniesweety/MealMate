import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";


dotenv.config({ path: "./backend/.env" });
console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});