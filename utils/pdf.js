const path = require("path");
const PDFDocument = require("pdfkit");

function buildPDF(dataCallback, endCallback, text) {
  const doc = new PDFDocument({ bufferPages: true, font: "Courier" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.fontSize(20).text(text);
  doc.addPage().fontSize(25).text("Here is some vector graphics...", 100, 100);

  doc
    .fontSize(12)
    .text(
      `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores, saepe.`
    );
  doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");
  // Apply some transforms and render an SVG path with the 'even-odd' fill rule
  doc
    .scale(0.6)
    .translate(470, -380)
    .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
    .fill("red", "even-odd")
    .restore();

  // Add some text with annotations
  doc
    .addPage()
    .fillColor("blue")
    .text("Here is a link!", 100, 100)
    .underline(100, 100, 160, 27, { color: "#0000FF" })
    .link(100, 100, 160, 27, "http://google.com/");

  doc.end();
}

module.exports = { buildPDF };
