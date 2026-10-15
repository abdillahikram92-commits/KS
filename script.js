

/* ========================================
   1. BOUTON DU THEME CLAIR / SOMBRE
======================================== */

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("comservice-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const darkIsActive =
        document.body.classList.contains("dark");

    themeButton.textContent = darkIsActive ? "☀️" : "🌙";

    localStorage.setItem(
        "comservice-theme",
        darkIsActive ? "dark" : "light"
    );
});


/* ========================================
   2. BOUTON POUR CHOISIR DES PHOTOS
======================================== */

const browseButton = document.getElementById("browseButton");
const photoInput = document.getElementById("photos");
const photoPreview = document.getElementById("photoPreview");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo

browseButton.addEventListener("click", function () {
    photoInput.click();
});

photoInput.addEventListener("change", function () {
    photoPreview.replaceChildren();

    const chosenFiles = Array.from(photoInput.files);

    for (const file of chosenFiles) {
        const isImage = ["image/jpeg", "image/png"].includes(file.type);

        if (!isImage || file.size > MAX_FILE_SIZE) {
            showMessage(
                "Choisissez des images JPG ou PNG de 10 Mo maximum.",
                "error"
            );

            photoInput.value = "";
            photoPreview.replaceChildren();
            return;
        }

        const name = document.createElement("span");
        name.className = "photo-name";
        name.textContent = "📎 " + file.name;

        photoPreview.appendChild(name);
    }

    if (chosenFiles.length > 0) {
        showMessage(
            chosenFiles.length + " photo(s) sélectionnée(s).",
            "success"
        );
    }
});


/* ========================================
   3. MESSAGES DU FORMULAIRE
======================================== */

const requestForm = document.getElementById("requestForm");
const formMessage = document.getElementById("formMessage");

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message visible " + type;
}


/* ========================================
   4. VALIDATION DU FORMULAIRE
======================================== */

requestForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!requestForm.reportValidity()) {
        return;
    }

    showMessage(
        "Les champs sont valides. Cette page est une démonstration : la demande n'est pas encore envoyée à COMSERVICE.",
        "success"
    );
});
