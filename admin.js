document.addEventListener('DOMContentLoaded', () => {
  const data = [
    [
      "Department of Computer Science & Engineering", // Department
      "ASSIGNMENT 2", // Assignment Number/Title
      "2026", // Academic Year
      "Introduction to Python Programming", // Subject Name
      "B25PLC25B", // Subject Code
      "Mithun Gowda B", // Student Name
      "1DB25CS109", // USN
      "pyKannada IDE — A Unique IDE", // Project Title
      "Mr. Bharath A" // Professor Name
    ],
    [
      "Department of Artificial Intelligence",
      "ASSIGNMENT 1",
      "2025",
      "Data Structures and Algorithms",
      "CS201",
      "John Doe",
      "1DB24AI001",
      "Graph Traversal Visualizer",
      "Dr. Smith"
    ]
  ];

  const columns = [
    { type: 'text', title: 'Department', width: 250 },
    { type: 'text', title: 'Assignment Num/Title', width: 180 },
    { type: 'text', title: 'Academic Year', width: 120 },
    { type: 'text', title: 'Subject Name', width: 250 },
    { type: 'text', title: 'Subject Code', width: 120 },
    { type: 'text', title: 'Student Name', width: 180 },
    { type: 'text', title: 'USN', width: 120 },
    { type: 'text', title: 'Project Title', width: 250 },
    { type: 'text', title: 'Professor Name', width: 180 }
  ];

  const spreadsheet = jspreadsheet(document.getElementById('spreadsheet'), {
    data: data,
    columns: columns,
    search: true,
    pagination: 10,
    allowInsertRow: true,
    allowManualInsertRow: true,
    allowInsertColumn: false,
    allowManualInsertColumn: false,
    allowDeleteRow: true,
    allowDeleteColumn: false,
    wordWrap: true,
  });

  document.getElementById('btn-generate-selected').addEventListener('click', () => {
    // Get selected row
    const selectedCell = spreadsheet.selectedCell;
    if (!selectedCell || selectedCell.length === 0) {
      alert("Please select a row first.");
      return;
    }

    // jSpreadsheet selectedCell returns [x1, y1, x2, y2]
    const rowIndex = selectedCell[1];
    const rowData = spreadsheet.getRowData(rowIndex);

    // Build query params
    const params = new URLSearchParams({
      department: rowData[0] || "",
      assignment: rowData[1] || "",
      year: rowData[2] || "",
      subjectName: rowData[3] || "",
      subjectCode: rowData[4] || "",
      studentName: rowData[5] || "",
      usn: rowData[6] || "",
      projectTitle: rowData[7] || "",
      professor: rowData[8] || ""
    });

    // Navigate to index.html with query params
    window.location.href = `index.html?${params.toString()}`;
  });

  document.getElementById('btn-add-row').addEventListener('click', () => {
    spreadsheet.insertRow();
  });

  document.getElementById('btn-export-csv').addEventListener('click', () => {
    spreadsheet.download();
  });
});
