// Parse query string
const params = new URLSearchParams(window.location.search);

// Extract values
const reportContent = params;

// Sample dynamic data — replace with actual data from your app
const userDetails = {
    reportContent: reportContent,
};

// Populate the details dynamically
// document.getElementById('userName').textContent = fname;
// document.getElementById('userCompany').textContent = company;
// document.getElementById('userIdType').textContent = idType;
// document.getElementById('verificationTime').textContent = verificationTime;

// Download report functionality
document.getElementById('downloadReportBtn').addEventListener('click', () => {
    // Assume reportContent is ArrayBuffer or Blob containing PDF data
    const pdfBlob = new Blob([userDetails.reportContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Verification_Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});


// Verify another ID button - can be linked or scripted as needed
document.getElementById('verifyAgainBtn').addEventListener('click', () => {
    // Example: redirect to verification page
    window.location.href = "index.html";
});