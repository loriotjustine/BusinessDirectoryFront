document.addEventListener("DOMContentLoaded", function () {
    const userRole = sessionStorage.getItem('userRole');

    // Vérification du rôle utilisateur
    if (userRole !== "0") { 
        alert("Accès refusé. Vous n'êtes pas administrateur.");
        window.location.href = "/accueil"; 
        return;
    }

    document.body.classList.remove("hidden");

    let siteToDelete = null; // Déclaration correcte en global
    let allSites = []; // Variable pour stocker tous les sites

    // Fonction pour charger les sites
    function loadSites() {
        fetch("https://localhost:7250/Sites")
            .then(response => response.json())
            .then(sites => {
                console.log("Réponse de l'API Sites :", sites);
                allSites = sites; // Stocke tous les sites
                const tableBody = document.getElementById("sites_table");
                tableBody.innerHTML = ""; // Clear the table before adding new rows

                sites.forEach(site => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td class="px-4 py-2">${site.siteName}</td>
                        <td class="px-4 py-2">${site.siteTypeName}</td>
                        <td class="px-4 py-2 text-center flex space-x-4 justify-center">
                            <button class="edit-btn text-black hover:text-gray-700" data-id="${site.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                            <button class="delete-btn text-red-600 hover:text-red-800" data-id="${site.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" class="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                // Ajouter les événements aux boutons "Editer"
                document.querySelectorAll(".edit-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        const siteId = this.getAttribute("data-id");
                        window.location.href = `/site/edit?id=${siteId}`; // Redirection vers la page de modification
                    });
                });

                // Ajouter les événements aux boutons "Supprimer"
                document.querySelectorAll(".delete-btn").forEach(button => {
                    button.addEventListener("click", function () {
                        siteToDelete = this.getAttribute("data-id");
                        openPopup(); // Ouvrir la fenêtre de confirmation
                    });
                });
            })
            .catch(error => console.error("Erreur lors du chargement des sites:", error));
    }

    // Fonction pour filtrer les sites en fonction de la recherche
    function filterSites(searchTerm) {
        const filteredSites = allSites.filter(site => 
            site.siteName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const tableBody = document.getElementById("sites_table");
        tableBody.innerHTML = ""; // Clear the table before adding new rows

        filteredSites.forEach(site => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2">${site.siteName}</td>
                <td class="px-4 py-2">${site.siteTypeName}</td>
                <td class="px-4 py-2 text-center flex space-x-4 justify-center">
                    <button class="edit-btn text-black hover:text-gray-700" data-id="${site.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>
                    <button class="delete-btn text-red-600 hover:text-red-800" data-id="${site.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="red" class="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Ajout de l'événement de saisie sur la barre de recherche
    document.getElementById("siteSearch").addEventListener("input", function() {
        const searchTerm = this.value;
        filterSites(searchTerm); // Filtrer les sites en fonction de la saisie
    });

    // Charger les sites au démarrage
    loadSites();
});
