document.addEventListener('DOMContentLoaded', () => {
  // Analytics Config
  // Uses the same Google Apps Script endpoint pattern as the Chemistry FPG admin panel.
  const SHEET_LOG_URL = 'https://script.google.com/macros/s/AKfycbyQg9zBCq2kz05p4BLLKNmEufvzjh6CAj90u_pIkvMroZuF3kndgvxmpsu43D1Jw_hkYA/exec';

  // Input fields
  const fDepartment = document.getElementById('f-department');
  const fAssignmentNum = document.getElementById('f-assignment-num');
  const fSubjectName = document.getElementById('f-subject-name');
  const fSubjectCode = document.getElementById('f-subject-code');
  const fStudentName = document.getElementById('f-student-name');
  const fUsn = document.getElementById('f-usn');
  const fProjectTitle = document.getElementById('f-project-title');
  const fProfessor = document.getElementById('f-professor');
  const fAcademicYear = document.getElementById('f-academic-year');

  // Template fields
  const tDepartment = document.getElementById('t-department');
  const tAssignmentNum = document.getElementById('t-assignment-num');
  const tSubjectName = document.getElementById('t-subject-name');
  const tSubjectCode = document.getElementById('t-subject-code');
  const tStudentName = document.getElementById('t-student-name');
  const tUsn = document.getElementById('t-usn');
  const tSubjectNameTd = document.getElementById('t-subject-name-td');
  const tSubjectCodeTd = document.getElementById('t-subject-code-td');
  const tProjectTitle = document.getElementById('t-project-title');
  const tProfessor = document.getElementById('t-professor');
  const tAcademicYear = document.getElementById('t-academic-year');
  const tFooterSubject = document.getElementById('t-footer-subject');
  const tFooterCode = document.getElementById('t-footer-code');

  async function logGeneration(type) {
    if (!SHEET_LOG_URL || SHEET_LOG_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL') return;

    try {
      await fetch(SHEET_LOG_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          department: fDepartment.value || '',
          assignment: fAssignmentNum.value || '',
          studentName: fStudentName.value || '',
          usn: fUsn.value || '',
          subject: fSubjectName.value || '',
          subjectCode: fSubjectCode.value || '',
          topic: fProjectTitle.value || '',
          projectTitle: fProjectTitle.value || '',
          professor: fProfessor.value || '',
          academicYear: fAcademicYear.value || ''
        })
      });
    } catch (_) {
      // Logging should never block page generation.
    }
  }

  // Listeners for live update
  fDepartment.addEventListener('input', (e) => { tDepartment.textContent = e.target.value; });
  fAssignmentNum.addEventListener('input', (e) => { tAssignmentNum.textContent = e.target.value; });
  fSubjectName.addEventListener('input', (e) => {
    tSubjectName.textContent = e.target.value;
    tSubjectNameTd.textContent = e.target.value;
    tFooterSubject.textContent = e.target.value;
  });
  fSubjectCode.addEventListener('input', (e) => {
    tSubjectCode.textContent = e.target.value;
    tSubjectCodeTd.textContent = e.target.value;
    tFooterCode.textContent = e.target.value;
  });
  fStudentName.addEventListener('input', (e) => { tStudentName.textContent = e.target.value; });
  fUsn.addEventListener('input', (e) => { tUsn.textContent = e.target.value; });
  fProjectTitle.addEventListener('input', (e) => { tProjectTitle.textContent = e.target.value; });
  fProfessor.addEventListener('input', (e) => { tProfessor.textContent = e.target.value; });
  fAcademicYear.addEventListener('input', (e) => { tAcademicYear.textContent = e.target.value; });

  // Zoom logic
  const templateRoot = document.getElementById('template-root');
  const btnZoomIn = document.getElementById('btn-zoom-in');
  const btnZoomOut = document.getElementById('btn-zoom-out');
  const zoomLevelLabel = document.getElementById('zoom-level');
  const previewWrapper = document.querySelector('.preview-wrapper');

  let currentZoom = 0.8; // default zoom level 80% to fit screen
  
  function updateZoom() {
    templateRoot.style.transform = `scale(${currentZoom})`;
    zoomLevelLabel.textContent = Math.round(currentZoom * 100) + '%';
  }

  // Initial fit to screen roughly
  function fitToScreen() {
    // 794 is the page width. We want it to fit in the preview wrapper.
    const wrapperWidth = previewWrapper.clientWidth - 80; // 40px padding on each side
    if (wrapperWidth > 0 && wrapperWidth < 794) {
      currentZoom = (wrapperWidth / 794).toFixed(2);
    } else {
      currentZoom = 0.8;
    }
    updateZoom();
  }

  // Resize observer to adjust zoom dynamically on window resize
  window.addEventListener('resize', () => {
    // Optionally auto-fit on resize: fitToScreen();
  });

  fitToScreen();

  btnZoomIn.addEventListener('click', () => {
    if (currentZoom < 2.0) {
      currentZoom = parseFloat(currentZoom) + 0.1;
      updateZoom();
    }
  });

  btnZoomOut.addEventListener('click', () => {
    if (currentZoom > 0.3) {
      currentZoom = parseFloat(currentZoom) - 0.1;
      updateZoom();
    }
  });

  // Print Logic
  const btnPrint = document.getElementById('btn-print');
  btnPrint.addEventListener('click', () => {
    logGeneration('PDF');
    window.print();
  });

  // PNG Export Logic
  const btnExportPng = document.getElementById('btn-export-png');
  btnExportPng.addEventListener('click', () => {
    // Save current original button text to show loading state
    const originalText = btnExportPng.innerHTML;
    btnExportPng.innerHTML = "Generating...";
    btnExportPng.disabled = true;

    // Temporarily reset zoom so html2canvas captures full quality
    const previousZoom = currentZoom;
    currentZoom = 1;
    updateZoom();

    // Give DOM a moment to update scale before capturing
    setTimeout(() => {
      // Capture the .page element specifically
      const pageElement = templateRoot.querySelector('.page');
      
      html2canvas(pageElement, {
        scale: 2 // High resolution
      }).then(canvas => {
        // Create an image and trigger download
        const link = document.createElement('a');
        link.download = `front-page-${fUsn.value || 'export'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        logGeneration('PNG');
        
        // Restore zoom and button state
        currentZoom = previousZoom;
        updateZoom();
        
        btnExportPng.innerHTML = originalText;
        btnExportPng.disabled = false;
      }).catch(err => {
        console.error("Error exporting PNG:", err);
        currentZoom = previousZoom;
        updateZoom();
        btnExportPng.innerHTML = originalText;
        btnExportPng.disabled = false;
        alert("Failed to export as PNG.");
      });
    }, 100);
  });
});
