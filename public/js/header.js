document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logoutButton');
    const userStatusDiv = document.getElementById('user-status');
    const userRole = sessionStorage.getItem('userRole'); // Ou récupère ce rôle depuis ailleurs si nécessaire

    // Vérifier si l'utilisateur est admin
    if (userRole === 'admin') {
        // Afficher le message dans le header
        userStatusDiv.classList.remove('hidden');
        logoutButton.classList.remove('hidden'); // Afficher le bouton de déconnexion
    } else {
        userStatusDiv.classList.add('hidden'); // Cacher le message si l'utilisateur n'est pas admin
    }

    // Écoute le clic sur le bouton de déconnexion
    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('userRole'); // Supprimer les données de la session
        window.location.href = '/'; // Rediriger vers la page d'accueil
    });
});