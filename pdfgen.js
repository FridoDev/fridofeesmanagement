function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const logoUrl = './logo.png';
  const imgWidth = 50;
  const imgHeight = 40;

  // Centered Logo at the top
  doc.addImage(logoUrl, 'PNG', (doc.internal.pageSize.width - imgWidth) / 2, 10, imgWidth, imgHeight);

  // Title in blue, centered
  doc.setFontSize(24);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(0, 51, 153); // Blue color
  doc.text("EYN LCC NO.2 GASHALA", doc.internal.pageSize.width / 2, 60, null, null, 'center');

  // Subheading in italic
  doc.setFontSize(16);
  doc.setFont("Arial", "italic");
  doc.setTextColor(0, 0, 0);
  doc.text("School Fees Report for:", doc.internal.pageSize.width / 2, 68, null, null, 'center');

  // Fetching table data
  const table = document.getElementById("reportTable");
  const tableRows = [];
  const headers = [];
  const tableHeaderCells = table.querySelectorAll("thead tr th");
  tableHeaderCells.forEach(headerCell => {
    headers.push(headerCell.textContent);
  });
  const tableDataRows = table.querySelectorAll("tbody tr");
  tableDataRows.forEach(row => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach(cell => {
      rowData.push(cell.textContent);
    });
    tableRows.push(rowData);
  });

  // Styled table with alternate row colors
  doc.autoTable({
    head: [headers],
    body: tableRows,
    startY: 80,
    styles: { fillColor: [255, 255, 255] }, // White background
    alternateRowStyles: { fillColor: [240, 240, 240] } // Light grey for alternate rows
  });

  const pdfName = prompt('Name your report ?');
  doc.save(pdfName + '.pdf');
}
