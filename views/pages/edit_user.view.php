<body class="hidden">
    <div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
        <button type="button" onclick="goHome()" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-full mr-2 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <p>Retour</p>
        </button>

        <h1 id="pageTitle">Modifier l'employé <span id="employeeName"></span></h1>

        <form id="editUserForm">
                <div class="mb-4">
                    <label for="userLastname" class="block text-gray-700 font-medium">Nom :</label>
                    <input type="text" id="userLastname" name="userLastname" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="userFirstname" class="block text-gray-700 font-medium">Prénom :</label>
                    <input type="text" id="userFirstname" name="userFirstname" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="userLandline" class="block text-gray-700 font-medium">Téléphone fixe :</label>
                    <input type="text" id="userLandline" name="userLandline" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="userMobile" class="block text-gray-700 font-medium">Téléphone portable :</label>
                    <input type="text" id="userMobile" name="userMobile" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="userEmail" class="block text-gray-700 font-medium">Email :</label>
                    <input type="text" id="userEmail" name="userEmail" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="userPassword" class="block text-gray-700 font-medium">Mot de passe :</label>
                    <input type="password" id="userPassword" name="userPassword" class="mt-2 p-2 rounded border w-full" required>
                </div>

                <div class="mb-4">
                    <label for="userSite" class="block text-gray-700 font-medium">Site :</label>
                    <select id="userSite" name="userSite" class="mt-2 p-2 rounded border w-full" required>
                        <option value="">Sélectionner un site</option> 
                    </select>
                </div>

                <div class="mb-4">
                    <label for="userService" class="block text-gray-700 font-medium">Service :</label>
                    <select id="userService" name="userService" class="mt-2 p-2 rounded border w-full" required>
                        <option value="">Sélectionner un service</option> 
                    </select>
                </div>

                <div class="mb-4">
                    <label for="userRole" class="block text-gray-700 font-medium">Rôle :</label>
                    <select id="userRole" name="userRole" class="mt-2 p-2 rounded border w-full" required>
                        <option value="">Sélectionner un rôle</option> 
                    </select>
                </div>

                <div class="text-center">
                    <button type="submit" class="bg-gray-500 text-white p-2 rounded mt-4 hover:bg-blue-700">
                        Modifier l'employé
                    </button>
                </div>
            </form>

    </div>

    <script src="edit_user.js"></script>
</body>
