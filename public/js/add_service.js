document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("createServiceForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page
        createService();
    });
});

/**
 * Création d'un service
 */
async function createService() {
    const serviceName = document.getElementById("serviceName").value;

    if (!serviceName) {
        alert("Veuillez remplir tous les champs avec des valeurs valides !");
        return;
    }

    const serviceData = {
        serviceName: serviceName,
    };

    try {
        const response = await fetch("https://localhost:7250/Services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(serviceData)
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la création du service");
        }

        alert("Service ajouté avec succès !");
        window.location.href = "/service";
    } catch (error) {
        alert("Une erreur est survenue lors de l'ajout du service.");
    }
}

/**
 * Redirection vers la page /service
 */
function goService() {
    window.location.href = "/service";
}
