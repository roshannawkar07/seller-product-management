const PDFDocument = require("pdfkit");

const generateProductPDF = (product, res) => {
  const doc = new PDFDocument();

  // response headers
  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `inline; filename=${product.productName}.pdf`,
  );

  doc.pipe(res);

  // Title
  doc.fontSize(20).text("Product Details PDF", {
    align: "center",
  });

  doc.moveDown();

  // Product Details
  doc.fontSize(14).text(`Product Name: ${product.productName}`);
  doc.text(`Description: ${product.productDescription}`);

  doc.moveDown();

  // Brands
  doc.fontSize(16).text("Brands:");

  let totalPrice = 0;

  product.brands.forEach((brand, index) => {
    totalPrice += brand.price;

    doc.moveDown();
    doc.fontSize(13).text(`${index + 1}. Brand Name: ${brand.brandName}`);
    doc.text(`Detail: ${brand.detail}`);
    doc.text(`Price: ₹${brand.price}`);
    doc.text(`Image URL: ${brand.image}`);
  });

  doc.moveDown();

  // Total Price
  doc.fontSize(16).text(`Total Price: ₹${totalPrice}`, {
    underline: true,
  });

  doc.end();
};

module.exports = generateProductPDF;
