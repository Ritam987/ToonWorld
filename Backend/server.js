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

// Static assets (serve existing frontend + images from repo root)
const repoRoot = path.join(__dirname, "..");
app.use("/Frontend", express.static(path.join(repoRoot, "Frontend")));
app.use("/images", express.static(path.join(repoRoot, "images")));

// body-parser (as requested)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Pages
app.get("/", (req, res) => {
  res.render("index");
});

// API: log review data (no DB yet)
app.post("/api/reviews", (req, res) => {
  const { name, rating, comment } = req.body || {};

  console.log("New review received:", {
    name,
    rating,
    comment,
    receivedAt: new Date().toISOString(),
    ip: req.ip,
  });

  res.status(200).json({
    ok: true,
    message: "Review received and logged to server console.",
  });
});

app.listen(PORT, () => {
  console.log(`ToonWorld server running at http://localhost:${PORT}`);
});

