import 'dotenv/config';
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// EJS setup
app.set("view engine", "ejs");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// body-parser (as requested)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pages
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// API: log review data (no DB yet)
app.post("/api/reviews", (req, res) => {
  res.sendStatus(200);
});

export default app;

