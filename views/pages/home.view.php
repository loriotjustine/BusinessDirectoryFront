<?php
// Supposons que tu as une variable de session qui contient le rôle de l'utilisateur
// Par exemple, $_SESSION['userRole'] = 0 pour admin, $_SESSION['userRole'] = 1 pour utilisateur
$userRole = isset($_SESSION['userRole']) ? $_SESSION['userRole'] : null;
?>

<div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
    <!-- Recherche et filtres généraux -->
    <div class="mb-4">
        <label for="search" class="text-slate-800">Rechercher un utilisateur par nom :</label>
        <input type="text" id="search" class="mt-2 p-2 rounded border w-full" placeholder="Tapez un nom de famille..." />
    </div>

    <div class="mb-4">
        <label for="serviceFilter" class="text-slate-800">Filtrer par service :</label>
        <select id="serviceFilter" class="mt-2 p-2 rounded border w-full">
            <option value="">Tous les services</option> <!-- Option pour tous les services -->
        </select>
    </div>

    <div class="mb-4">
        <label for="siteFilter" class="text-slate-800">Filtrer par site :</label>
        <select id="siteFilter" class="mt-2 p-2 rounded border w-full">
            <option value="">Tous les sites</option> <!-- Option pour tous les sites -->
        </select>
    </div>

    <!-- Tableau des utilisateurs -->
    <table class="w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 text-slate-800">
            <tr class="divide-x divide-gray-200">
                <th class="px-4 py-2">Nom</th>
                <th class="px-4 py-2">Prénom</th>
                <th class="px-4 py-2">Site</th>
                <th class="px-4 py-2">Service</th>
                <th class="px-4 py-2">Voir la fiche</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white text-slate-800" id="families_table">
        </tbody>
    </table>
</div>

<!-- Fin de la section pour les utilisateurs -->
