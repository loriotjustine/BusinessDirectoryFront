document.addEventListener("DOMContentLoaded", function () {
    const pathParts = window.location.pathname.split('/');
    const userId = pathParts[pathParts.length - 1];
    const userInfoDiv = document.getElementById("user-info");

    if (userId && !isNaN(userId)) {
        fetch(`${API_URL}/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(userData => {
                if (userData) {
                    userInfoDiv.innerHTML = `
                        <p><strong>Nom :</strong> ${userData.lastName || 'Non disponible'}</p>
                        <p><strong>Prénom :</strong> ${userData.firstName || 'Non disponible'}</p>
                        <p><strong>Email :</strong> ${userData.email || 'Non disponible'}</p>
                        <p><strong>Téléphone fixe :</strong> ${userData.landlinePhone || 'Non disponible'}</p>
                        <p><strong>Téléphone mobile :</strong> ${userData.mobilePhone || 'Non disponible'}</p>
                        <p><strong>Service :</strong> ${userData.service.serviceName || 'Non disponible'}</p>
                        <p><strong>Site :</strong> ${userData.site.siteName || 'Non disponible'}</p>
                    `;
                } else {
                    userInfoDiv.innerHTML = `<p class="text-red-500">Aucun utilisateur trouvé.</p>`;
                }
            })
            .catch(error => {
                console.error("Erreur API:", error);
                userInfoDiv.innerHTML = `<p class="text-red-500">Impossible de récupérer les informations de l'utilisateur.</p>`;
            });
    } else {
        userInfoDiv.innerHTML = `<p class="text-red-500">Aucun utilisateur trouvé.</p>`;
    }
});

/**
 * Redirection sur la page /login au clic sur ctrl + l
 */
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "l") {
        event.preventDefault();
        window.location.href = "/login";
    }
});

/**
 * Redirection vers /accueil
 */
function goHome() {
    window.location.href = "/accueil";
}