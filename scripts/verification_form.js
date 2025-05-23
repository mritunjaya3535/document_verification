let uploadedFile = null;

window.addEventListener("DOMContentLoaded", () => {
    // Create a hidden file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,application/pdf"; // Accept images and PDFs
    fileInput.style.display = "none";
    fileInput.id = "fileInput";

    document.body.appendChild(fileInput);

    // Trigger file selection on Upload button click
    window.triggerFileSelect = () => fileInput.click();

    // Handle file selection and preview
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        uploadedFile = file; // 🔑 Save to global variable

        if (!file) return;

        const previewContainer = document.querySelector(".preview-image");
        previewContainer.innerHTML = ""; // Clear previous preview

        // Show preview based on file type
        if (file.type === "application/pdf") {
            const iframe = document.createElement("iframe");
            iframe.src = URL.createObjectURL(file);
            iframe.width = "100%";
            iframe.height = "400px";
            iframe.style.border = "1px solid #ccc";
            iframe.onload = () => URL.revokeObjectURL(iframe.src); // Clean up
            previewContainer.appendChild(iframe);
        } else if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100%";
                img.style.height = "auto";
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else {
            previewContainer.textContent = "Unsupported file type.";
        }

        document.querySelector(".preview-section").classList.add("active");
    });

    // ✅ Submit button event handler — placed inside DOMContentLoaded
    const submitBtn = document.getElementById("submit-button");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            submitFile(uploadedFile);
        });
    } else {
        console.warn("Submit button not found in DOM.");
    }
});

// 🔄 Upload the file to Django backend
async function submitFile(file) {
    if (!file) {
        alert("Please upload an image or PDF first.");
        return;
    }

    const formData = new FormData();
    formData.append("idImage", file); // Ensure Django expects 'idImage'

    try {
        const response = await fetch("http://127.0.0.1:8000/api/upload/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const queryString = new URLSearchParams(data).toString();
        window.location.href = `success.html?${queryString}`;
    } catch (error) {
        console.warn("Upload failed:", error);
        window.location.href = `failed.html`;
    }
}
