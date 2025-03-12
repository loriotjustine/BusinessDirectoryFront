<div class="bg-gray-200 rounded-xl p-8 mx-4 mt-4 mb-8 shadow-lg text-black">
    <div class="mb-4">
        <label for="siteFilter" class="text-slate-800">Filtrer par site :</label>
        <select id="siteFilter" class="mt-2 p-2 rounded border w-full">
            <option value="">Tous les sites</option> <!-- Option pour tous les sites -->
        </select>
    </div>

    <table class="w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 text-slate-800">
            <tr class="divide-x divide-gray-200">
                <th class="px-4 py-2">Nom du site</th>
                <th class="px-4 py-2">Type du site</th>
                <th class="px-4 py-2">Action</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white text-slate-800" id="sites_table">
        </tbody>
    </table>
</div>