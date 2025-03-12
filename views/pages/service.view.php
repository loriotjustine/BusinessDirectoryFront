<div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
    <div class="mb-4">
        <label for="serviceFilter" class="text-slate-800">Filtrer par service :</label>
        <select id="serviceFilter" class="mt-2 p-2 rounded border w-full">
            <option value="">Tous les services</option> <!-- Option pour tous les services -->
        </select>
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