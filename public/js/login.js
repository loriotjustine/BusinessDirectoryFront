document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    /**
     * Envoi des infos de connexion
     */
    fetch('https://localhost:7250/Users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.role !== undefined) {
            sessionStorage.setItem('userRole', data.role);
        } else {
            console.error("Rôle non trouvé dans la réponse du serveur.");
            errorMessage.textContent = "Erreur : Le rôle utilisateur est introuvable.";
            errorMessage.classList.remove('hidden');
            return;
        }

        const storedRole = sessionStorage.getItem('userRole');
        if (!storedRole) {
            console.error("Le rôle n'a pas été enregistré dans sessionStorage.");
            errorMessage.textContent = "Problème de session, essayez de vous reconnecter.";
            errorMessage.classList.remove('hidden');
            return;
        }

        if (data.role === 0) { 
            window.location.href = '/accueil';
        } else {
            console.warn("Accès refusé : Vous n'êtes pas administrateur.");
            errorMessage.textContent = "Accès refusé : Vous n'êtes pas administrateur.";
            errorMessage.classList.remove('hidden');
            sessionStorage.removeItem('userRole');
        }
    })
    .catch(error => {
        console.error('Erreur de connexion:', error);
        errorMessage.textContent = "Une erreur est survenue. Veuillez réessayer.";
        errorMessage.classList.remove('hidden');
    });
});
