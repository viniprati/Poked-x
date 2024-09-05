document.getElementById('searchBtn').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const selectedPokemon = document.getElementById('pokemonSelect').value;
    const pokemonDetails = document.getElementById('pokemonDetails');
    const query = searchQuery || selectedPokemon;

    if (!query) {
        pokemonDetails.innerHTML = '<p>Por favor, insira o nome ou número do Pokémon ou selecione um da lista.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) throw new Error('Pokémon não encontrado.');
        const data = await response.json();

        pokemonDetails.innerHTML = `
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="${data.name}">
            <p><strong>Altura:</strong> ${data.height / 10}m</p>
            <p><strong>Peso:</strong> ${data.weight / 10}kg</p>
            <p><strong>Tipo:</strong> ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p><strong>Habilidades:</strong> ${data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
            <p><strong>Estatísticas:</strong></p>
            <ul>
                ${data.stats.map(statInfo => `<li>${statInfo.stat.name}: ${statInfo.base_stat}</li>`).join('')}
            </ul>
        `;
    } catch (error) {
        pokemonDetails.innerHTML = `<p>${error.message}</p>`;
    }
});

document.getElementById('pokemonSelect').addEventListener('change', () => {
    document.getElementById('search').value = '';
    document.getElementById('searchBtn').click();
});
