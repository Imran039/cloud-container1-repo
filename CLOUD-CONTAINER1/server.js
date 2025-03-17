const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const app = express();
app.use(express.json());

const STORAGE_DIR = "/persistent_data_dir/"; // Persistent Volume Directory
const CONTAINER2_URL = "http://cloud-container2-service:9090/calculate"; // Kubernetes Service for Container 2

// POST API to store a file
app.post("/store-file", (req, res) => {
  const { file, data } = req.body;

  if (!file || !data) {
    return res.status(400).json({ file: null, error: "Invalid JSON input." });
  }

  const filePath = path.join(STORAGE_DIR, file);

  try {
    fs.writeFileSync(filePath, data);
    return res.json({ file, message: "Success." });
  } catch (error) {
    return res
      .status(500)
      .json({ file, error: "Error while storing the file to the storage." });
  }
});

// POST API to forward request to Container 2 for calculation
app.post("/calculate", async (req, res) => {
  try {
    const response = await axios.post(CONTAINER2_URL, req.body);
    return res.json(response.data);
  } catch (error) {
    return res
      .status(error.response?.status || 500)
      .json(
        error.response?.data || {
          error: "Error communicating with Container 2.",
        }
      );
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Container 1 listening on port ${PORT}`);
});
