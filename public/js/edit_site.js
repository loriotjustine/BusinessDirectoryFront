document.addEventListener("DOMContentLoaded", function () {
    // Fonction pour obtenir le paramètre 'id' de l'URL
    function getQueryParameter(name) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(name); // Retourne la valeur du paramètre 'name' (par ex. 'id')
    }
  
    const siteId = getQueryParameter('id'); // Récupère l'ID du site depuis l'URL, ici 'id=1'
    const siteNameInput = document.getElementById('siteName'); // L'input pour la ville
    
    // Vérifie que l'ID du site est valide
    if (!siteId || isNaN(siteId)) {
      alert("L'ID du site est invalide.");
      return;
    }
  
    // Fonction pour récupérer les données du site depuis l'API
    fetch(`https://localhost:7250/Sites/${siteId}`)  // Utilisation de l'ID dans l'URL
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données du site');
        }
        return response.json();
      })
      .then(site => {
        // Pré-remplir le champ "siteName" avec le nom actuel du site
        siteNameInput.value = site.siteName;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du site :', error);
        alert("Impossible de récupérer les données du site.");
      });
  
    // Événements de soumission du formulaire de modification du site
    const editSiteForm = document.getElementById('editSiteForm');
    
    editSiteForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Empêche l'envoi du formulaire par défaut
  
      const updatedSiteName = siteNameInput.value; // Récupère le nom de la ville modifié
  
      // Envoi de la requête PUT pour mettre à jour le nom du site (sans toucher au type)
      fetch(`https://localhost:7250/Sites/${siteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteName: updatedSiteName, // Tu envoies uniquement le nom de la ville modifié
          // Le champ siteType est omis, il ne sera donc pas modifié
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour du site');
          }
          return response.json();
        })
        .then(updatedSite => {
          // Afficher une alerte et rediriger vers la page de gestion des sites
          alert("Site mis à jour avec succès.");
          window.location.href = '/site'; // Redirection vers la page des sites après mise à jour
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du site :', error);
          alert("Une erreur est survenue lors de la mise à jour du site.");
        });
    });
});
  
function goSite() {
    window.location.href = "/site";
}