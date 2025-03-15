document.addEventListener("DOMContentLoaded", async function () {
    await loadSites();
    await loadServices();
    await loadRoles();
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("createUserForm").addEventListener("submit", async function (event) {
        event.preventDefault();
        await createUser();
    });
});

/**
 * Validation du mot de passe
 * @param password le mot de passe
 * @returns la validité du mot de passe
 */
function isValidPassword(password) {
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[.+*?!:;,^@/$(){}|]).{8,15}$/;
    return passwordRegex.test(password);
}

/**
 * Création d'un user
 */
async function createUser() {
    const userPassword = document.getElementById("userPassword").value;

    if (!isValidPassword(userPassword)) {
        alert("Le mot de passe doit contenir entre 8 et 15 caractères, avec au moins une majuscule, une minuscule, un chiffre et un symbole.");
        return;
    }

    const userData = {
        LastName: document.getElementById("userLastname").value.trim(),
        FirstName: document.getElementById("userFirstname").value.trim(),
        Email: document.getElementById("userEmail").value.trim(),
        LandlinePhone: document.getElementById("userLandline").value.trim(),
        MobilePhone: document.getElementById("userMobile").value.trim(),
        SiteId: parseInt(document.getElementById("userSite").value),
        ServiceId: parseInt(document.getElementById("userService").value),
        Role: parseInt(document.getElementById("userRole").value),
        Password: userPassword
    };

    try {
        const response = await fetch("https://localhost:7250/Users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Erreur serveur:", errorText);
            throw new Error("Erreur lors de l'ajout de l'employé");
        }

        alert("Employé ajouté avec succès !");
        window.location.href = "/home";
    } catch (error) {
        console.error("Erreur:", error);
        alert("Une erreur est survenue lors de l'ajout de l'employé.");
    }
}

/**
 * Chargement des sites
 */
async function loadSites() {
    try {
        const response = await fetch("https://localhost:7250/Sites");
        if (!response.ok) throw new Error("Erreur lors du chargement des sites");

        const sites = await response.json();
        const selectSite = document.getElementById("userSite");
        selectSite.innerHTML = '<option value="">Sélectionner un site</option>';

        sites.forEach(site => {
            let option = document.createElement("option");
            option.value = site.id;
            option.textContent = site.siteName;
            selectSite.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur chargement sites:", error);
    }
}

/**
 * Chargement des services
 */
async function loadServices() {
    try {
        const response = await fetch("https://localhost:7250/Services");
        if (!response.ok) throw new Error("Erreur lors du chargement des services");

        const services = await response.json();
        const selectService = document.getElementById("userService");

        services.forEach(service => {
            let option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.serviceName;
            selectService.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur chargement services:", error);
    }
}

/**
 * Chargement des rôles
 */
async function loadRoles() {
    try {
        const response = await fetch("https://localhost:7250/users/roles");
        if (!response.ok) throw new Error("Erreur lors du chargement des rôles");

        const roles = await response.json();
        const selectRole = document.getElementById("userRole");

        roles.forEach(role => {
            let option = document.createElement("option");
            option.value = role.id;
            option.textContent = role.name;
            selectRole.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur chargement rôles:", error);
    }
}

/**
 * Redirection sur la page /accueil
 */
function goHome() {
    window.location.href = "/accueil";
}