<div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
<a href="/" class="block mt-4 hover:underline">< Retour</a>
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Connexion</h2>
    
    <form id="loginForm">
        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input type="email" id="email" name="email" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        </div>
        
        <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" name="password" required class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        </div>

        <button type="submit" class="bg-blue-500 text-white p-2 rounded-md w-full">Se connecter</button>
    </form>
    <p id="error-message" class="text-red-500 mt-2 hidden"></p>
</div>