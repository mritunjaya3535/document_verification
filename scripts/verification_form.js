let uploadedFile = null;

window.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,text/plain"; // ✅ Disallow PDFs
    fileInput.style.display = "none";
    fileInput.id = "fileInput";

    document.body.appendChild(fileInput);

    window.triggerFileSelect = () => fileInput.click();

    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        uploadedFile = file;

        if (!file) return;

        const previewContainer = document.querySelector(".preview-image");
        previewContainer.innerHTML = "";

        if (file.type === "text/plain") {
            const reader = new FileReader();
            reader.onload = function (e) {
                const textBox = document.createElement("pre");
                textBox.textContent = e.target.result;
                previewContainer.appendChild(textBox);
            };
            reader.readAsText(file);
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

    const submitBtn = document.getElementById("submit-button");
    if (submitBtn) {
        submitBtn.addEventListener("click", () => {
            submitFile(uploadedFile);
        });
    } else {
        console.warn("Submit button not found in DOM.");
    }
});

async function submitFile(file) {
    if (!file) {
        alert("Please upload an image or text file first.");
        return;
    }

    console.log("Submitting file:", file);

    const formData = new FormData();
    formData.append("idImage", file); // ✅ Django expects 'idImage'

    try {
        const response = await fetch("http://127.0.0.1:8000/api/upload/", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            const errMsg = await response.text();
            throw new Error(`HTTP ${response.status}: ${errMsg}`);
        }

        const data = await response.json();
        const queryString = new URLSearchParams(data).toString();
        console.log("Upload successful:", data);
        // window.location.href = `success.html?${queryString}`;
    } catch (error) {
        console.log("Upload failed:", error);
        // window.location.href = `failed.html`;
    }
}
