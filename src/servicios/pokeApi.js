

   export  const API = 'https://pokeapi.co/api/v2/pokemon/';

    export const generatePokeId = () => {
        let max = 898;
        let min = 1;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };


    export const buscarPokemonPorNombre = async(nombre)=>{
        let API = 'https://pokeapi.co/api/v2/pokemon/';

        
        let data = {}
        let url = `${API}${nombre}`;

       return fetch(url)
            .then((response) => response.json())
            .then((json) => {

                let url = json.sprites.versions['generation-v']['black-white'].animated
                    .front_default
                    ? json.sprites.versions['generation-v']['black-white'].animated
                        .front_default
                    : json.sprites.front_default;

                data.name = json.name;
                data.img =url;
                data.id = json.game_indices[19].game_index;
               
                console.log(data)
                return data;

            })
            .catch((error) => console.error(error))
            .finally(console.log('fin generar pokemon'));
    }

    export const nuevoPokemonRandom = async () => {
        let API = 'https://pokeapi.co/api/v2/pokemon/';

        
        let data = {}
        let pokeId = generatePokeId();
        let url = `${API}${pokeId}`;

       return fetch(url)
            .then((response) => response.json())
            .then((json) => {

                let url = json.sprites.versions['generation-v']['black-white'].animated
                    .front_default
                    ? json.sprites.versions['generation-v']['black-white'].animated
                        .front_default
                    : json.sprites.front_default;

                data.name = json.name;
                data.img =url;
                console.log(data)
                return data;

            })
            .catch((error) => console.error(error))
            .finally(console.log('fin generar pokemon'));

};

export const   calcularNivel = (exp) => {
    return   Math.trunc(Math.floor(25 + Math.sqrt(625 + 100 * parseInt(exp))) / 50);
  };
