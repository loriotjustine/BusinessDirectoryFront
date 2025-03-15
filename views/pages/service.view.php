<body class="hidden">
    <div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
        <div class="flex items-center mb-4 space-x-4">
            <button type="button" onclick="goHome()" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-full mr-2 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <p>Retour</p>
            </button>

            <button type="button" onclick="goAddService()" class="bg-gray-500 text-white p-2 rounded flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-full mr-2 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M12 5v14M5 12h14" />
                </svg>
                <p>Ajouter un service</p>
            </button>
        </div>

        <div class="mb-4">
            <label for="serviceSearch" class="text-slate-800">Rechercher par nom de service :</label>
            <input id="serviceSearch" type="text" class="mt-2 p-2 rounded border w-full" placeholder="Rechercher un service avec son nom ..." />
        </div>

        <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 text-slate-800">
                <tr class="divide-x divide-gray-200">
                    <th class="px-4 py-2">Nom du service</th>
                    <th class="px-4 py-2">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white text-slate-800" id="services_table">
            </tbody>
        </table>
    </div>
</body>

<!-- Popup de confirmation -->
<div id="deletePopup" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center hidden">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
        <p class="text-lg font-semibold text-black">Souhaitez-vous réellement supprimer ce service ?</p>
        <div class="mt-4 flex justify-center space-x-4">
            <button id="confirmDeleteBtn" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800">Oui</button>
            <button id="cancelDeleteBtn" class="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-600">Non</button>
        </div>
    </div>
</div>
