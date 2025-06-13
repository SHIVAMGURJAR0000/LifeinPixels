const express = require("express");
const multer = require("multer");
const path = require("path");
const chatController = require("./controllers/chatController");
// chat parser
const app = express();
const Port = 3000;

//configure multer to store upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

app.use(express.json());

//upload route
app.post("/upload", upload.single("chat"), chatController.parseChatFile);

app.listen(Port, () => {
  console.log(`server running at port ${Port}`);
});
