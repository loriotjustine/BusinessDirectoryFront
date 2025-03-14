document.addEventListener("DOMContentLoaded", function () {
    // Récupérer le rôle de l'utilisateur depuis sessionStorage
    const userRole = sessionStorage.getItem('userRole');
    
    // Si le rôle est null, on considère que l'utilisateur n'est pas authentifié et on le redirige
    //if (!userRole) {
    //    alert("Utilisateur non authentifié !");
    //    window.location.href = '/login'; // Rediriger vers la page de login si l'utilisateur n'est pas authentifié
    //}
    
    console.log('Rôle de l\'utilisateur:', userRole);

    const tableBody = document.getElementById("families_table");
    const searchInput = document.getElementById("search");
    const serviceFilter = document.getElementById("serviceFilter");
    const siteFilter = document.getElementById("siteFilter");
    let usersData = []; // Variable pour stocker toutes les données des utilisateurs
    let allServices = []; // Variable pour stocker tous les services
    let allSites = []; // Variable pour stocker tous les sites

    // Récupérer les utilisateurs depuis l'API
    fetch(API_URL + '/users')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement des données");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            usersData = data; // Sauvegarder les données des utilisateurs

            // Afficher les utilisateurs dans le tableau
            displayUsers(usersData);

            // Ajouter un écouteur d'événement pour filtrer les utilisateurs par nom
            searchInput.addEventListener("input", function () {
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value);
            });

            // Récupérer les services depuis l'API
            fetch(API_URL + '/services') // Supposons que l'API expose un endpoint pour récupérer les services
                .then(response => response.json())
                .then(services => {
                    allServices = services;
                    populateServiceFilter(allServices);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des services :", error);
                });

            // Récupérer les sites depuis l'API
            fetch(API_URL + '/sites') // Supposons que l'API expose un endpoint pour récupérer les sites
                .then(response => response.json())
                .then(sites => {
                    allSites = sites;
                    populateSiteFilter(allSites);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des sites :", error);
                });

            // Ajouter un écouteur d'événement pour filtrer les utilisateurs par service
            serviceFilter.addEventListener("change", function () {
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value);
            });

            // Ajouter un écouteur d'événement pour filtrer les utilisateurs par site
            siteFilter.addEventListener("change", function () {
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des données :", error);
            tableBody.innerHTML = `<tr><td colspan="5" class="px-4 py-2 text-center text-red-500">Impossible de charger les données</td></tr>`;
        });

    // Fonction pour afficher les utilisateurs dans le tableau
    function displayUsers(users) {
        tableBody.innerHTML = ""; // Réinitialiser le tableau
        const userRole = sessionStorage.getItem('userRole');

        users.forEach(user => {
            const row = document.createElement("tr");
            row.classList.add("divide-x", "divide-gray-200");

            row.innerHTML = `
                <td class="px-4 py-2">${user.lastName}</td>
                <td class="px-4 py-2">${user.firstName}</td>
                <td class="px-4 py-2">${user.site.siteName}</td>
                <td class="px-4 py-2">${user.service.serviceName}</td>
                <td class="px-4 py-2">
                    <button onclick="see_user(${user.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    ${userRole === '0' ? `<button class="edit-btn text-black hover:text-gray-700" data-id="${user.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>` : ``}
                    ${userRole === '0' ? `<button class="delete-btn text-red-600 hover:text-red-800" data-id="${user.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>` : ``}
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Ajouter les événements aux boutons "Editer"
        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                window.location.href = `/user/edit?id=${userId}`; // Redirection vers la page de modification
            });
        });

        // Ajouter les événements aux boutons "Supprimer"
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                userToDelete = this.getAttribute("data-id");
                openPopup(); // Ouvrir la fenêtre de confirmation
            });
        });
    }

    // Fonction pour ouvrir le popup de confirmation
    function openPopup() {
        document.getElementById("deletePopup").classList.remove("hidden");
    }

    // Fonction pour fermer le popup
    function closePopup() {
        userToDelete = null;
        document.getElementById("deletePopup").classList.add("hidden");
    }

    async function deleteUser() {
        if (!userToDelete) return;
    
        try {
            // Affiche le user ID pour débogage
            console.log("ID de l'employé à supprimer:", userToDelete);
    
            // Supprimer l'employé
            const response = await fetch(`https://localhost:7250/Users/${userToDelete}`, { method: "DELETE" });
    
            if (response.ok) {
                alert("Employé supprimé avec succès.");
                location.reload(); // Recharger les users après la suppression
            } else {
                alert("Erreur lors de la suppression.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Une erreur est survenue.");
        }
    
        closePopup();
    }

    // Ajouter les événements aux boutons de confirmation dans le popup
    document.getElementById("confirmDeleteBtn").addEventListener("click", deleteUser);
    document.getElementById("cancelDeleteBtn").addEventListener("click", closePopup);

    // Fonction pour peupler la liste déroulante des services
    function populateServiceFilter(services) {
        services.forEach(service => {
            const option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.serviceName;
            serviceFilter.appendChild(option);
        });
    }

    // Fonction pour peupler la liste déroulante des sites
    function populateSiteFilter(sites) {
        sites.forEach(site => {
            const option = document.createElement("option");
            option.value = site.id;
            option.textContent = site.siteName;
            siteFilter.appendChild(option);
        });
    }

    // Fonction pour filtrer les utilisateurs en fonction du nom, du service et du site
    function filterUsers(query, selectedService, selectedSite) {
        const filteredUsers = usersData.filter(user => {
            const matchesName = user.lastName.toLowerCase().startsWith(query.toLowerCase());
            const matchesService = !selectedService || user.service.id === parseInt(selectedService); // Vérifie si le service correspond
            const matchesSite = !selectedSite || user.site.id === parseInt(selectedSite); // Vérifie si le site correspond
            return matchesName && matchesService && matchesSite;
        });

        displayUsers(filteredUsers); // Afficher les utilisateurs filtrés
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const adminActions = document.getElementById('admin-actions');
    const userRole = sessionStorage.getItem('userRole');

    if (userRole === '0') {
        adminActions.classList.remove('hidden'); // Affiche les boutons pour admin
    }
});


// Fonction pour voir l'utilisateur (comme dans ton code original)
const see_user = async (id) => {
    window.location.href = `/user/${id}`;
};

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "l") {
        event.preventDefault(); // Empêche le comportement par défaut du navigateur
        window.location.href = "/login"; // Remplace "/login" par l'URL réelle de ta page de connexion
    }
});
