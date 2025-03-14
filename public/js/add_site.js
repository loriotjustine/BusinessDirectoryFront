document.addEventListener("DOMContentLoaded", function () {
    loadSiteTypes(); // Charger les types de site au chargement de la page

    document.getElementById("createSiteForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        createSite();
    });
});

// Fonction pour charger les types de site depuis l'API
async function loadSiteTypes() {
    try {
        const response = await fetch("https://localhost:7250/Sites/types"); // Récupérer les types de site
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des types de site");
        }

        const siteTypes = await response.json(); // Récupérer la liste des types de site

        console.log("Types de site récupérés : ", siteTypes); // Déboguer

        const selectElement = document.getElementById("siteType");

        // Remplir la liste déroulante avec les types de site
        siteTypes.forEach(type => {
            let option = document.createElement("option");
            option.value = type.value;  // Utiliser la valeur numérique de l'énumération
            option.textContent = type.name;  // Utiliser le nom du type
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur:", error);
    }
}

// Fonction pour créer un site via l'API
async function createSite() {
    const siteName = document.getElementById("siteName").value;
    const siteType = document.getElementById("siteType").value;  // Cette fois-ci, c'est une valeur numérique

    // Validation des données
    if (!siteName || !siteType || isNaN(siteType)) {
        alert("Veuillez remplir tous les champs avec des valeurs valides !");
        return;
    }

    const siteData = {
        siteName: siteName,
        siteType: parseInt(siteType)  // Assurez-vous d'envoyer un entier ici
    };

    console.log("Données envoyées à l'API: ", siteData);

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
        window.location.href = "/site";  // Rediriger vers la page des sites après l'ajout
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de l'ajout du site.");
    }
}

// Fonction pour rediriger vers la page site
function goSite() {
    window.location.href = "/site";
}
