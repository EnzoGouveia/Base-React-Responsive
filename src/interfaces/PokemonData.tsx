interface PokemonData {
    sprites: { 
        versions: { 
            'generation-v': { 
            'black-white': { 
                animated: {
                front_shiny: string; 
                front_default: string 
                } 
            } 
            } 
        } 
    };
    id: number;
    name: string;
    height: number;
    weight: number;
    stats: [];
    types: { 
        type: { 
            name: string 
        } 
    }[];
    favorite: boolean;
}

export default PokemonData;