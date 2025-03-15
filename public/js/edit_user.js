document.addEventListener("DOMContentLoaded", async function () {
    const userId = new URLSearchParams(window.location.search).get('id');
    if (!userId) {
        alert("Utilisateur non trouvé");
        window.location.href = "/home";
        return;
    }

    try {
        const userResponse = await fetch(`https://localhost:7250/Users/${userId}`);
        if (!userResponse.ok) throw new Error("Erreur lors du chargement des données utilisateur");
        const userData = await userResponse.json();

        document.getElementById("employeeName").textContent = `${userData.firstName} ${userData.lastName}`;
        document.getElementById("userLastname").value = userData.lastName;
        document.getElementById("userFirstname").value = userData.firstName;
        document.getElementById("userLandline").value = userData.landline;
        document.getElementById("userMobile").value = userData.mobile;
        document.getElementById("userEmail").value = userData.email;
        document.getElementById("userPassword").value = '';

        await loadRoles(userData.role.id);

        await loadSites(userData.site.id);

        await loadServices(userData.service.id);

        /**
         * Gestion du formulaire de modification d'user
         */
        const form = document.getElementById("editUserForm");
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = document.getElementById("userEmail").value;
            
            if (!validateEmail(email)) {
                alert("Veuillez entrer un email valide.");
                return;
            }

            // Récupérationd des données modifiées
            const updatedUser = {
                LastName: document.getElementById("userLastname").value,
                FirstName: document.getElementById("userFirstname").value,
                LandlinePhone: document.getElementById("userLandline").value,
                MobilePhone: document.getElementById("userMobile").value,
                Email: email,
                Password: document.getElementById("userPassword").value || userData.password,
                Role: parseInt(document.getElementById("userRole").value),
                SiteId: parseInt(document.getElementById("userSite").value),
                ServiceId: parseInt(document.getElementById("userService").value),
            };

            try {
                // Envoi des modifications
                const response = await fetch(`https://localhost:7250/Users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedUser),
                });

                if (response.ok) {
                    alert("Employé modifié avec succès.");
                    window.location.href = "/home";
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

/**
 * Chargement des sites
 */
async function loadSites(selectedSiteId) {
    const response = await fetch("https://localhost:7250/Sites");
    const sites = await response.json();
    const siteSelect = document.getElementById("userSite");
    sites.forEach(site => {
        const option = document.createElement("option");
        option.value = site.id;
        option.textContent = site.siteName;
        if (site.id === selectedSiteId) option.selected = true;
        siteSelect.appendChild(option);
    });
}

/**
 * Chargement des services
 */
async function loadServices(selectedServiceId) {
    const response = await fetch("https://localhost:7250/Services");
    const services = await response.json();
    const serviceSelect = document.getElementById("userService");
    services.forEach(service => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = service.serviceName;
        if (service.id === selectedServiceId) option.selected = true;
        serviceSelect.appendChild(option);
    });
}

/**
 * Chargement des rôles
 */
async function loadRoles(selectedRoleId) {
    const response = await fetch("https://localhost:7250/Users/roles");
    const roles = await response.json();
    const roleSelect = document.getElementById("userRole");
    roles.forEach(role => {
        const option = document.createElement("option");
        option.value = role.id;
        option.textContent = role.name;
        if (role.id === selectedRoleId) option.selected = true;
        roleSelect.appendChild(option);
    });
}

/**
 * Validation du format de l'email
 * @param email l'email
 * @returns la validité de l'email
 */
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

/**
 * Redirection vers /accueil
 */
function goHome() {
    window.location.href = "/accueil";
}
