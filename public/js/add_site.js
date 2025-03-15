document.addEventListener("DOMContentLoaded", function () {
    loadSiteTypes();

    document.getElementById("createSiteForm").addEventListener("submit", function (event) {
        event.preventDefault();
        createSite();
    });
});

/**
 * Chargement des types de site
 */
async function loadSiteTypes() {
    try {
        const response = await fetch("https://localhost:7250/Sites/types");
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des types de site");
        }

        const siteTypes = await response.json();

        const selectElement = document.getElementById("siteType");

        siteTypes.forEach(type => {
            let option = document.createElement("option");
            option.value = type.value;
            option.textContent = type.name;
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur:", error);
    }
}

/**
 * Création de site
 */
async function createSite() {
    const siteName = document.getElementById("siteName").value;
    const siteType = document.getElementById("siteType").value;

    if (!siteName || !siteType || isNaN(siteType)) {
        alert("Veuillez remplir tous les champs avec des valeurs valides !");
        return;
    }

    const siteData = {
        siteName: siteName,
        siteType: parseInt(siteType)
    };

    try {
        const response = await fetch("https://localhost:7250/Sites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(siteData)
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création du site");
        }

        alert("Site ajouté avec succès !");
        window.location.href = "/site";
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de l'ajout du site.");
    }
}

/**
 * Redirection vers la page /site
 */
function goSite() {
    window.location.href = "/site";
}
