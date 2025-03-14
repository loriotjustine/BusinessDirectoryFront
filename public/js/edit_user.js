// Fonction pour valider l'email avec une expression régulière
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", async function () {
    const userId = new URLSearchParams(window.location.search).get('id'); // Récupérer l'ID de l'URL
    if (!userId) {
        alert("Utilisateur non trouvé");
        window.location.href = "/home"; // Rediriger vers la page d'accueil si pas d'ID
        return;
    }

    try {
        // Récupérer les données de l'utilisateur via l'API
        const userResponse = await fetch(`https://localhost:7250/Users/${userId}`);
        if (!userResponse.ok) throw new Error("Erreur lors du chargement des données utilisateur");
        const userData = await userResponse.json();

        // Log des données utilisateur
        console.log("Données utilisateur récupérées:", userData);

        // Pré-remplir le formulaire avec les données de l'utilisateur
        document.getElementById("employeeName").textContent = `${userData.firstName} ${userData.lastName}`;
        document.getElementById("userLastname").value = userData.lastName;
        document.getElementById("userFirstname").value = userData.firstName;
        document.getElementById("userLandline").value = userData.landline;
        document.getElementById("userMobile").value = userData.mobile;
        document.getElementById("userEmail").value = userData.email;
        document.getElementById("userPassword").value = ''; // On ne pré-remplie pas le mot de passe pour des raisons de sécurité

        // Charger les rôles
        await loadRoles(userData.role.id);

        // Charger les sites
        await loadSites(userData.site.id);

        // Charger les services
        await loadServices(userData.service.id);

        // Soumission du formulaire de modification
        const form = document.getElementById("editUserForm");
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("userEmail").value;
            
            // Validation de l'email avant de soumettre
            if (!validateEmail(email)) {
                alert("Veuillez entrer un email valide.");
                return; // Empêche l'envoi du formulaire si l'email est invalide
            }

            const updatedUser = {
                LastName: document.getElementById("userLastname").value,
                FirstName: document.getElementById("userFirstname").value,
                LandlinePhone: document.getElementById("userLandline").value,
                MobilePhone: document.getElementById("userMobile").value,
                Email: email,
                // Si le mot de passe est vide, garder l'ancien mot de passe
                Password: document.getElementById("userPassword").value || userData.password,
                Role: parseInt(document.getElementById("userRole").value),
                SiteId: parseInt(document.getElementById("userSite").value),
                ServiceId: parseInt(document.getElementById("userService").value),
            };

            // Log des données envoyées
            console.log("Données envoyées à l'API:", updatedUser);

            try {
                const response = await fetch(`https://localhost:7250/Users/${userId}`, {
                    method: "PUT", // Mise à jour de l'utilisateur
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedUser),
                });

                // Vérifier la réponse de l'API
                if (response.ok) {
                    console.log("Réponse OK:", await response.json());
                    alert("Employé modifié avec succès.");
                    window.location.href = "/home"; // Rediriger vers la page d'accueil
                } else {
                    const errorData = await response.json();
                    console.log("Erreur de la mise à jour:", errorData);
                    alert(`Erreur: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Erreur lors de la modification de l'utilisateur:", error);
                alert("Une erreur est survenue.");
            }
        });
    } catch (error) {
        console.error("Erreur lors du chargement des données utilisateur:", error);
        alert("Impossible de charger les données utilisateur.");
    }
});

// Charger les sites
async function loadSites(selectedSiteId) {
    const response = await fetch("https://localhost:7250/Sites");
    const sites = await response.json();
    console.log("Sites chargés:", sites); // Log des sites
    const siteSelect = document.getElementById("userSite");
    sites.forEach(site => {
        const option = document.createElement("option");
        option.value = site.id;
        option.textContent = site.siteName;
        if (site.id === selectedSiteId) option.selected = true;
        siteSelect.appendChild(option);
    });
}

// Charger les services
async function loadServices(selectedServiceId) {
    const response = await fetch("https://localhost:7250/Services");
    const services = await response.json();
    console.log("Services chargés:", services); // Log des services
    const serviceSelect = document.getElementById("userService");
    services.forEach(service => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = service.serviceName;
        if (service.id === selectedServiceId) option.selected = true;
        serviceSelect.appendChild(option);
    });
}

// Charger les rôles
async function loadRoles(selectedRoleId) {
    const response = await fetch("https://localhost:7250/Users/roles");
    const roles = await response.json();
    console.log("Rôles chargés:", roles); // Log des rôles
    const roleSelect = document.getElementById("userRole");
    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role.id;
        option.textContent = role.name;
        if (role.id === selectedRoleId) option.selected = true;
        roleSelect.appendChild(option);
    });
}

// Fonction pour rediriger vers la page d'accueil
function goHome() {
    window.location.href = "/accueil"; // Redirige vers la page d'accueil
}
