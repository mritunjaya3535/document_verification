
// Sample dynamic data — replace with actual data from your app
const failedDetails = {
    name: "John Doe",
    company: "Greenfield University",
    idType: "Student ID Card",
    attemptTime: new Date().toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    }),
    supportEmail: "support@secureidverify.com"
};

// Populate the failed details dynamically
// document.getElementById('failUserName').textContent = failedDetails.name;
// document.getElementById('failUserCompany').textContent = failedDetails.company;
// document.getElementById('failUserIdType').textContent = failedDetails.idType;
// document.getElementById('failAttemptTime').textContent = failedDetails.attemptTime;

// Try again button — redirect to verify page
document.getElementById('tryAgainBtn').addEventListener('click', () => {
    window.location.href = "verification_form.html";
});

// Contact support button — open mail client
document.getElementById('contactSupportBtn').addEventListener('click', () => {
    window.location.href = "index.html";
});
