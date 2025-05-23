let uploadedFile = null;

function showPreview() {
    // Create the input only when needed
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";

    // Append it temporarily to body
    document.body.appendChild(fileInput);

    // Add change listener
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        uploadedFile = file;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const previewImage = document.querySelector(".preview-image img");
            previewImage.src = e.target.result;
            document.querySelector(".preview-section").classList.add("active");
        };
        reader.readAsDataURL(file);
    });

    // Trigger the input
    fileInput.click();

    // Clean up the input after use
    fileInput.addEventListener("click", () => {
        // Optional: remove after a short delay
        setTimeout(() => {
            fileInput.remove();
        }, 1000);
    });
}

async function submitFile() {
    if (!uploadedFile) {
        alert("Please upload an image first.");
        return;
    }

    const formData = new FormData();
    formData.append("idImage", uploadedFile);

    // replace with your domain and command
    await fetch("http://localhost:8000/api/upload/", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            const queryString = new URLSearchParams(data).toString();
            window.location.href = `success.html?${queryString}`;
            console.log(data);
        })
        .catch(error => {
            window.location.href = `failed.html`;
            console.warn(error);
        });
}

// Handle file input creation and preview display
window.addEventListener("DOMContentLoaded", () => {
    // Create a hidden file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,application/pdf"; // Accept images and PDFs
    fileInput.style.display = "none";
    fileInput.id = "fileInput";

    // Append it to the body
    document.body.appendChild(fileInput);

    // File input trigger (call this on Upload button click)
    window.triggerFileSelect = () => fileInput.click();

    // File change handler
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
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
});

