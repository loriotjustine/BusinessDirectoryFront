document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission classique du formulaire

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message'); // Sélection du message d'erreur

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
        console.log('🔍 Réponse du serveur:', data);
    
        if (data.role !== undefined) {
            sessionStorage.setItem('userRole', data.role);
            console.log("✅ User role saved in sessionStorage:", sessionStorage.getItem('userRole'));
        } else {
            console.error("❌ Rôle non trouvé dans la réponse du serveur.");
            errorMessage.textContent = "❌ Erreur : Le rôle utilisateur est introuvable.";
            errorMessage.classList.remove('hidden');
            return;
        }

        // Vérification après stockage
        const storedRole = sessionStorage.getItem('userRole');
        if (!storedRole) {
            console.error("⚠️ Le rôle n'a pas été enregistré dans sessionStorage.");
            errorMessage.textContent = "❌ Problème de session, essayez de vous reconnecter.";
            errorMessage.classList.remove('hidden');
            return;
        }

        // Si l'utilisateur est un admin (role = 0), on le connecte
        if (data.role === 0) { 
            console.log("🔵 Redirection vers /accueil (admin)");
            window.location.href = '/accueil';
        } else {
            // L'utilisateur N'EST PAS admin → Message d'erreur
            console.warn("🚫 Accès refusé pour l'utilisateur non-admin.");
            errorMessage.textContent = "❌ Accès refusé : Vous n'êtes pas administrateur.";
            errorMessage.classList.remove('hidden');
            sessionStorage.removeItem('userRole'); // On s'assure qu'il ne reste pas connecté
        }
    })
    .catch(error => {
        console.error('❌ Erreur de connexion:', error);
        errorMessage.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
        errorMessage.classList.remove('hidden');
    });
});
