import express from "express";
require("dotenv").config();
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

app.listen(PORT, () => {
  console.log(`Backend server is running!`);
});