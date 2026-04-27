# DBIT Front Page Generator

A sleek, responsive web application for students of Don Bosco Institute of Technology (DBIT) to easily generate, preview, and download customized assignment front pages. 

## Features
- **Live Preview**: Instantly see how your front page looks as you type.
- **Export to PDF**: Native A4 formatted PDF generation.
- **Export to PNG**: High-resolution image export for easy sharing.
- **Responsive Design**: Works perfectly on both desktop and mobile devices.
- **Admin Dashboard**: View PDF/PNG generation logs and usage stats from Google Sheets at `/admin.html`.

## Getting Started
To use this generator locally without encountering canvas export restrictions, we recommend running a local server.
1. Clone this repository.
2. Run a local server:
   - Python: `python -m http.server`
   - Node.js: `npx serve`
3. Open `localhost:8000` (or the provided port) in your browser.

*Note: If hosted on GitHub Pages or Vercel, the PNG export works automatically without a local server!*

## Admin Dashboard
Open `admin.html` to view usage analytics. The dashboard uses the same Google Apps Script endpoint configured in `script.js` and `admin.html`.

The admin password is currently defined in `admin.html`. This is a client-side gate only, so do not treat it as secure authentication.

## Built With
- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)
- [html2canvas](https://html2canvas.hertzen.com/)

---
**Created by [Mithun Gowda B](https://github.com/mithun50)**
