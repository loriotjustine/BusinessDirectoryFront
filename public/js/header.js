document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById('logoutButton');
    const adminContainer = document.getElementById('admin-container');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole === '0') {
        adminContainer.classList.remove('hidden');
    } else {
        adminContainer.classList.add('hidden');
    }

    /**
     * Gestion du bouton deconnexion
     */
    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('userRole');
        window.location.href = '/';
    });
});
