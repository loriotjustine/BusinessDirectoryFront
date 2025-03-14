document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour obtenir le paramètre 'id' de l'URL
    function getQueryParameter(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name); // Retourne la valeur du paramètre 'name' (par ex. 'id')
    }
  
    const serviceId = getQueryParameter('id'); // Récupère l'ID du service depuis l'URL, ici 'id=1'
    const serviceNameInput = document.getElementById('serviceName'); // L'input pour la ville
    
    // Vérifie que l'ID du service est valide
    if (!serviceId || isNaN(serviceId)) {
      alert("L'ID du service est invalide.");
      return;
    }
  
    // Fonction pour récupérer les données du service depuis l'API
    fetch(`https://localhost:7250/Services/${serviceId}`)  // Utilisation de l'ID dans l'URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du service');
        }
        return response.json();
      })
      .then(service => {
        // Pré-remplir le champ "serviceName" avec le nom actuel du service
        serviceNameInput.value = service.serviceName;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du service :', error);
        alert("Impossible de récupérer les données du service.");
      });
  
    // Événements de soumission du formulaire de modification du service
    const editServiceForm = document.getElementById('editServiceForm');
    
    editServiceForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  
      const updatedServiceName = serviceNameInput.value; // Récupère le nom de la ville modifié
  
      // Envoi de la requête PUT pour mettre à jour le nom du service (sans toucher au type)
      fetch(`https://localhost:7250/Services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName: updatedServiceName, // Tu envoies uniquement le nom de la ville modifié
          // Le champ serviceType est omis, il ne sera donc pas modifié
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du service');
          }
          return response.json();
        })
        .then(updatedService => {
          // Afficher une alerte et rediriger vers la page de gestion des services
          alert("Service mis à jour avec succès.");
          window.location.href = '/service'; // Redirection vers la page des services après mise à jour
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du service :', error);
          alert("Une erreur est survenue lors de la mise à jour du service.");
        });
    });
});

function goService() {
    window.location.href = "/service";
}