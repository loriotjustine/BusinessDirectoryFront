<body class="hidden">
<div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
    <button type="button" onclick="goSite()" class="flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-full mr-2 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <p>Retour</p>
</button>
    <form id="editSiteForm">
    <div>
        <label for="siteName">Modifier la ville du site :</label>
        <input type="text" id="siteName" name="siteName" value="" class="mt-2 p-2 rounded border w-full">
    </div>
    <div class="text-center">
        <button type="submit" class="bg-gray-500 text-white p-2 rounded mt-4">Modifier</button>
    </div>
    </form>

</div>
</body>
