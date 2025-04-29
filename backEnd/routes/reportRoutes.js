const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", reportController.getAllReports);

router.get("/:id", reportController.getReportById);

router.post("/", upload.single("image"), reportController.createReport);

router.get("/image/:id", reportController.getReportImage);

router.put("/:id", reportController.updateReport);

router.delete("/:id", reportController.deleteReport);


module.exports = router;