const express = require("express");
const cors = require("cors");

const pdfService = require("./utils/pdf");
const app = express();
const PORT = 5000

app.use(express.json());
// Config
app.use(cors());

app.get("/", (req, res) => {
  const name = "bebba";
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment;filename=${name}.pdf`,
  });
  //const text = "bebba";
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    (text = "test")
  );
});
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
