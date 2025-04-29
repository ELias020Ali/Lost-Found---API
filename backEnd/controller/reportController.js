const Report = require("../models/reportModel");

exports.getAllReports = async (req, res) => {
  try {
    const { created_by } = req.query;
    const query = created_by ? { created_by } : {}; 
    const reports = await Report.find(query); 


    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReport = async (req, res) => {
  const { item_name, item_type, description, location, contact, created_by } = req.body;

  const reportData = {
    item_name,
    item_type,
    description,
    location,
    contact,
    created_by,
    posted_date: new Date(),
  };

  if (req.file) {
    reportData.image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };
  }

  const report = new Report(reportData);

  try {
    const newReport = await report.save();
    res.status(201).json(newReport);
  } catch (err) {
    console.error("Error creating report:", err);
    res.status(400).json({ message: err.message });
  }
};

exports.getReportImage = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report || !report.image || !report.image.data) {
      return res.status(404).send("Image not found.");
    }

    res.setHeader("Content-Type", report.image.contentType);
    res.send(report.image.data);
  } catch (err) {
    console.error("Error fetching image:", err);
    res.status(500).send("Failed to retrieve image.");
  }
};


exports.updateReport = async (req, res) => {
  try {
    const { item_name, item_type, description, location, contact, image } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { item_name, item_type, description, location, contact, image }, 
      { new: true }
    );

    if (!updatedReport) return res.status(404).json({ message: "Report not found" });
    res.json(updatedReport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const deletedReport = await Report.findByIdAndDelete(req.params.id);
    if (!deletedReport) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};