function loginUser(email, password) {
    const data = {
        email: email,
        password: password
    };

    console.log("Sending data to backend", data);

    fetch('/login', { // Vérifie si l'URL est correcte, ici c'est '/login'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log("Response status:", response.status); // Affiche le code de statut HTTP

        // Si la réponse n'est pas OK (200), on génère une erreur
        if (!response.ok) {
            throw new Error('Problème avec la requête (statut ' + response.status + ')');
        }

        return response.json();
    })
    .then(data => {
        console.log("Response from backend:", data);

        // Assure-toi que la réponse contient ce que tu attends
        if (data.success) {
            // Connexion réussie
            window.location.href = "/accueil"; // Remplace "/accueil" par la page d'accueil après connexion
        } else {
            // Affiche l'erreur envoyée par le backend
            alert(data.error || "Email ou mot de passe incorrect");
        }
    })
    .catch(error => {
        console.error("Erreur:", error);
        alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
    });
}