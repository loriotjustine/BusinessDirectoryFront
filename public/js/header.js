document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logoutButton');
    const adminContainer = document.getElementById('admin-container');
    const userRole = sessionStorage.getItem('userRole');

    console.log("🔍 User Role from sessionStorage:", userRole);

    // Vérifier si l'utilisateur est admin
    if (userRole === '0') {
        adminContainer.classList.remove('hidden'); // Affiche le bloc admin
    } else {
        adminContainer.classList.add('hidden'); // Cache le bloc pour les non-admins
    }

    // Gestion du bouton de déconnexion
    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('userRole'); // Supprime le rôle de la session
        window.location.href = '/'; // Redirige vers l'accueil
    });
});
