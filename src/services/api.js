const url = "https://pokeapi.co/api/v2/";

export const getPokemones = async(offset = 0) => {
    try {
        const response = await fetch(`${url}pokemon?limit=12&offset=${offset}`);
        const pokemones = await response.json();
        return pokemones;
    } catch (error) {
        console.log(error);
    }
}

export const getPokemonByUrl = async(enlace) => {
    try {
        const response = await fetch(`${enlace}`);
        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

export const getPokemonById = async(id) => {
    try {
        const response = await fetch(`${url}pokemon/${id}`);
        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        console.log(error);
    }
}

export const getDescriptionPokemon = async(id) => {
    try {
        const response = await fetch(`${url}pokemon-species/${id}`);
        const datos = await response.json();
        const description = await datos.flavor_text_entries?.filter(entry => entry.language.name === "es");
        console.log(description);
        return description;
    } catch (error) {
        console.log(error);
    }
}

export const getPokemonEvolution = async(id) => {
    const evoluciones = [];
    try {
        const response = await fetch(`${url}pokemon-species/${id}`);
        const info = await response.json();
        const datosEvolucion = await fetch(info.evolution_chain.url);
        const evolucion = await datosEvolucion.json();
        console.log(evolucion.chain);
        let imageUrl = await getImagePokemon(evolucion.chain.species.name);
        evoluciones.push({ name: evolucion.chain.species.name, url: imageUrl });
        if(evolucion.chain.evolves_to.length > 0) {
            let imageUrl = await getImagePokemon(evolucion.chain.evolves_to[0].species.name);
            evoluciones.push({ name: evolucion.chain.evolves_to[0].species.name, url: imageUrl });
            
            if(evolucion.chain.evolves_to[0].evolves_to.length > 0) {
                let imageUrl = await getImagePokemon(evolucion.chain.evolves_to[0].evolves_to[0].species.name);
                evoluciones.push({ name: evolucion.chain.evolves_to[0].evolves_to[0].species.name, url: imageUrl });
            }
        }
        // console.log(evoluciones);
        return evoluciones;
    } catch (error) {
        console.log(error);
    }
}

const getImagePokemon = async (name) => {
    const datos = await getPokemonById(name);
    const image = datos.sprites.other.home.front_default;
    return image;
}