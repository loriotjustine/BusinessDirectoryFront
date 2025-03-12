document.addEventListener("DOMContentLoaded", function () {
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#A13838" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

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

// Fonction pour voir l'utilisateur (comme dans ton code original)
const see_user = async (id) => {
    window.location.href = `/user/${id}`;
};