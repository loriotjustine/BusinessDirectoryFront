document.addEventListener("DOMContentLoaded", function () {   
    const tableBody = document.getElementById("families_table");
    const searchInput = document.getElementById("search");
    const serviceFilter = document.getElementById("serviceFilter");
    const siteFilter = document.getElementById("siteFilter");
    const adminActions = document.getElementById('admin-actions');
    const userRole = sessionStorage.getItem('userRole');
    const usersPerPage = 5;
    let usersData = [];
    let allServices = [];
    let allSites = [];
    let currentPage = 1;

    if (userRole === '0') {
        adminActions.classList.remove('hidden');
    }

    /**
     * Récupération des users
     */
    fetch(API_URL + '/users')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement des données");
            }
            return response.json();
        })
        .then(data => {
            usersData = data;

            displayUsers(usersData, currentPage);

            searchInput.addEventListener("input", function () {
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value, currentPage);
            });

            /**
             * Récupération des services
             */
            fetch(API_URL + '/services')
                .then(response => response.json())
                .then(services => {
                    allServices = services;
                    populateServiceFilter(allServices);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des services :", error);
                });

            /**
             * Récupération des sites
             */
            fetch(API_URL + '/sites')
                .then(response => response.json())
                .then(sites => {
                    allSites = sites;
                    populateSiteFilter(allSites);
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération des sites :", error);
                });

            serviceFilter.addEventListener("change", function () {
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value, currentPage);
            });

            siteFilter.addEventListener("change", function () {
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value, currentPage);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement des données :", error);
            tableBody.innerHTML = `<tr><td colspan="5" class="px-4 py-2 text-center text-red-500">Impossible de charger les données</td></tr>`;
        });

    /**
     * Affichage des users par page
     * @param {A} users les users
     * @param {*} page la page actuelle
     */
    function displayUsers(users, page) {
        tableBody.innerHTML = "";
        const startIndex = (page - 1) * usersPerPage;
        const endIndex = startIndex + usersPerPage;
        const pageUsers = users.slice(startIndex, endIndex);

        pageUsers.forEach(user => {
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

        document.querySelectorAll(".edit-btn").forEach(button => {
            button.addEventListener("click", function () {
                const userId = this.getAttribute("data-id");
                window.location.href = `/user/edit?id=${userId}`;
            });
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", function () {
                const userToDelete = this.getAttribute("data-id");
                openPopup(userToDelete);
            });
        });

        updatePagination(users.length, page);
    }

    /**
     * Mise à jour de la pagination
     * @param {*} totalUsers le nombre total d'user
     * @param {*} currentPage la page actuelle
     */
    function updatePagination(totalUsers, currentPage) {
        const totalPages = Math.ceil(totalUsers / usersPerPage);
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        // Création des boutons de pagination
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('pagination-button');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }

            pageButton.addEventListener('click', function () {
                currentPage = i;
                filterUsers(searchInput.value, serviceFilter.value, siteFilter.value, currentPage);
            });

            pagination.appendChild(pageButton);
        }
    }

    /**
     * Filtre des users
     * @param {*} query le critère de filtration
     * @param {*} selectedService le service choisi
     * @param {*} selectedSite le site choisi
     * @param {*} page la page choisie
     */
    function filterUsers(query, selectedService, selectedSite, page) {
        const filteredUsers = usersData.filter(user => {
            const matchesName = user.lastName.toLowerCase().startsWith(query.toLowerCase());
            const matchesService = !selectedService || user.service.id === parseInt(selectedService);
            const matchesSite = !selectedSite || user.site.id === parseInt(selectedSite);
            return matchesName && matchesService && matchesSite;
        });

        displayUsers(filteredUsers, page);
    }
});

/**
 * Redirection sur la page /login au clic sur ctrl + l
 */
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "l") {
        event.preventDefault();
        window.location.href = "/login";
    }
});

/**
 * Ouverture de la pop-up de suppression
 * @param {*} userId l'id de l'user
 */
function openPopup(userId) {
    const popup = document.getElementById('deletePopup');
    const confirmButton = document.getElementById('confirmDeleteBtn');
    const cancelButton = document.getElementById('cancelDeleteBtn');

    popup.classList.remove('hidden');

    confirmButton.onclick = function() {
        deleteUser(userId);
        closePopup();
    };

    cancelButton.onclick = function() {
        closePopup();
    };
}

/**
 * Fermeture de la pop-up
 */
function closePopup() {
    const popup = document.getElementById('deletePopup');
    popup.classList.add('hidden');
}

/**
 * Suppression d'un user
 * @param {*} userId l'id de l'user à supprimer
 */
function deleteUser(userId) {
    fetch(API_URL + '/users/' + userId, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("Utilisateur supprimé !");
            location.reload();
        } else {
            alert("Erreur lors de la suppression de l'utilisateur");
        }
    })
    .catch(error => {
        console.error("Erreur de suppression :", error);
    });
}

/**
 * Ajouter les services dans la liste déroulante des filtres
 * @param {*} services les services à afficher
 */
function populateServiceFilter(services) {
    serviceFilter.innerHTML = '<option value="">Tous les services</option>';

    services.forEach(service => {
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = service.serviceName;
        serviceFilter.appendChild(option);
    });
}

/**
 * Ajouter les sites dans la liste déroulante des filtres
 * @param {*} sites les sites à afficher
 */
function populateSiteFilter(sites) {
    siteFilter.innerHTML = '<option value="">Tous les sites</option>';

    sites.forEach(site => {
        const option = document.createElement("option");
        option.value = site.id;
        option.textContent = site.siteName;
        siteFilter.appendChild(option);
    });
}

/**
 * Redirection vers la fiche de l'user
 * @param {*} id l'id de l'user à afficher
 */
const see_user = async (id) => {
    window.location.href = `/user/${id}`;
};