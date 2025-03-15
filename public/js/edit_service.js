document.addEventListener("DOMContentLoaded", function () {
  function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  const serviceId = getQueryParameter('id');
  const serviceNameInput = document.getElementById('serviceName');
    
  if (!serviceId || isNaN(serviceId)) {
    alert("L'ID du service est invalide.");
    return;
  }
  
  /**
   * Récupération d'un service par son id
   */
  fetch(`https://localhost:7250/Services/${serviceId}`)  // Utilisation de l'ID dans l'URL
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données du service');
      }
      return response.json();
    })
    .then(service => {
      serviceNameInput.value = service.serviceName;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du service :', error);
      alert("Impossible de récupérer les données du service.");
    });
  
  const editServiceForm = document.getElementById('editServiceForm');
    
  /**
   * Envoi des modifications
   */
  editServiceForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const updatedServiceName = serviceNameInput.value;
  
    fetch(`https://localhost:7250/Services/${serviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceName: updatedServiceName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour du service');
        }
        return response.json();
      })
      .then(updatedService => {
        alert("Service mis à jour avec succès.");
        window.location.href = '/service'; // Redirection vers la page des services après mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du service :', error);
        alert("Une erreur est survenue lors de la mise à jour du service.");
      });
  });
});

/**
 * Redirection vers la page /service
 */
function goService() {
    window.location.href = "/service";
}