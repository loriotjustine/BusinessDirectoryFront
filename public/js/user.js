document.addEventListener("DOMContentLoaded", function () {
    // Extraire l'ID utilisateur depuis l'URL sous la forme "/user/{id}"
    const pathParts = window.location.pathname.split('/');
    const userId = pathParts[pathParts.length - 1]; // Le dernier segment de l'URL
    console.log(`ID utilisateur récupéré: ${userId}`);

    const userInfoDiv = document.getElementById("user-info");

    if (userId && !isNaN(userId)) {
        // Récupérer les informations de l'utilisateur via l'API
        fetch(`${API_URL}/users/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(userData => {
                console.log(userData); // Traite les données ici

                // Vérifier si on a bien les données nécessaires
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
                    // Si aucune donnée n'est trouvée
                    userInfoDiv.innerHTML = `<p class="text-red-500">Aucun utilisateur trouvé.</p>`;
                }
            })
            .catch(error => {
                console.error("Erreur API:", error);
                userInfoDiv.innerHTML = `<p class="text-red-500">Impossible de récupérer les informations de l'utilisateur.</p>`;
            });
    } else {
        // Si l'ID utilisateur est invalide
        userInfoDiv.innerHTML = `<p class="text-red-500">Aucun utilisateur trouvé.</p>`;
    }
});