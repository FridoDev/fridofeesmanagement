function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const logoUrl = './logo.png';
  const imgWidth = 50;
  const imgHeight = 40;

  // Centered Logo at the top
  doc.addImage(logoUrl, 'PNG', (doc.internal.pageSize.width - imgWidth) / 2, 10, imgWidth, imgHeight);

  // Title in green, centered
  doc.setFontSize(24);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(0, 153, 51); // Green color
  doc.text("Employee Access Report", doc.internal.pageSize.width / 2, 60, null, null, 'center');

  // Subheading for the description
  doc.setFontSize(12);
  doc.setFont("Arial", "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(
    "This one pager shows an employee access report with details such as employee name, job title, contact details, etc.",
    doc.internal.pageSize.width / 2,
    68,
    { maxWidth: doc.internal.pageSize.width - 40 },
    'center'
  );

  // Fetching table data for Employee Access Report
  const table = document.getElementById("employeeAccessTable");
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

  // Add Employee Access Report Table
  doc.autoTable({
    head: [headers],
    body: tableRows,
    startY: 80,
    styles: { fillColor: [255, 255, 255] }, // White background
    alternateRowStyles: { fillColor: [240, 240, 240] } // Light grey for alternate rows
  });

  // Fetch Employee Details table data
  const detailsTable = document.getElementById("employeeDetailsTable");
  const detailsTableRows = [];
  const detailsHeaders = [];
  const detailsTableHeaderCells = detailsTable.querySelectorAll("thead tr th");
  detailsTableHeaderCells.forEach(headerCell => {
    detailsHeaders.push(headerCell.textContent);
  });
  const detailsTableDataRows = detailsTable.querySelectorAll("tbody tr");
  detailsTableDataRows.forEach(row => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach(cell => {
      rowData.push(cell.textContent);
    });
    detailsTableRows.push(rowData);
  });

  // Add Employee Details Table
  doc.autoTable({
    head: [detailsHeaders],
    body: detailsTableRows,
    startY: doc.lastAutoTable.finalY + 10,
    styles: { fillColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });

  // Fetch Employee Working Hours table data
  const hoursTable = document.getElementById("employeeWorkingHoursTable");
  const hoursTableRows = [];
  const hoursHeaders = [];
  const hoursTableHeaderCells = hoursTable.querySelectorAll("thead tr th");
  hoursTableHeaderCells.forEach(headerCell => {
    hoursHeaders.push(headerCell.textContent);
  });
  const hoursTableDataRows = hoursTable.querySelectorAll("tbody tr");
  hoursTableDataRows.forEach(row => {
    const rowData = [];
    const cells = row.querySelectorAll("td");
    cells.forEach(cell => {
      rowData.push(cell.textContent);
    });
    hoursTableRows.push(rowData);
  });

  // Add Employee Working Hours Table
  doc.autoTable({
    head: [hoursHeaders],
    body: hoursTableRows,
    startY: doc.lastAutoTable.finalY + 10,
    styles: { fillColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] }
  });

  const pdfName = prompt('Name your report ?');
  doc.save(pdfName + '.pdf');
}
