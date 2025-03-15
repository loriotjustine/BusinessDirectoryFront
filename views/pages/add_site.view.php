<body class="hidden">
    <div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
        <div class="flex items-center mb-4 space-x-4">
            <button type="button" onclick="goSite()" class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-full mr-2 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <p>Retour</p>
            </button>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-xl font-semibold text-black mb-4">Créer un nouveau site</h2>
            <form id="createSiteForm">
                <div class="mb-4">
                    <label for="siteName" class="block text-gray-700 font-medium">Ville du site :</label>
                    <input type="text" id="siteName" name="siteName" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="siteType" class="block text-gray-700 font-medium">Type de site :</label>
                    <select id="siteType" name="siteType" class="mt-2 p-2 rounded border w-full" required>
                        <option value="">Sélectionner un type</option> 
                    </select>
                </div>

                <div class="text-center">
                    <button type="submit" class="bg-gray-500 text-white p-2 rounded mt-4 hover:bg-blue-700">
                        Ajouter le site
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>
