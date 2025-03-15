document.addEventListener("DOMContentLoaded", function () {
  function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  const siteId = getQueryParameter('id');
  const siteNameInput = document.getElementById('siteName');
    
  if (!siteId || isNaN(siteId)) {
    alert("L'ID du site est invalide.");
    return;
  }
  
  /**
   * Récupération d'un site par son id
   */
  fetch(`https://localhost:7250/Sites/${siteId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données du site');
      }
      return response.json();
    })
    .then(site => {
      siteNameInput.value = site.siteName;
    })
    .catch(error => {
      console.error('Erreur lors de la récupération du site :', error);
      alert("Impossible de récupérer les données du site.");
    });
  
  const editSiteForm = document.getElementById('editSiteForm');
    
  /**
   * Envoi des modifications
   */
  editSiteForm.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const updatedSiteName = siteNameInput.value;
  
    fetch(`https://localhost:7250/Sites/${siteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteName: updatedSiteName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour du site');
        }
        return response.json();
      })
      .then(updatedSite => {
        alert("Site mis à jour avec succès.");
        window.location.href = '/site'; // Redirection vers la page des sites après mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour du site :', error);
        alert("Une erreur est survenue lors de la mise à jour du site.");
      });
  });
});
  
/**
 * Redirection vers la page /site
 */
function goSite() {
    window.location.href = "/site";
}