import bug from "../images/bug.svg";
import dark from "../images/dark.svg";
import dragon from "../images/dragon.svg";
import electric from "../images/electric.svg";
import fairy from "../images/fairy.svg";
import fighting from "../images/fighting.svg";
import fire from "../images/fire.svg";
import flying from "../images/flying.svg";
import ghost from "../images/ghost.svg";
import grass from "../images/grass.svg";
import ground from "../images/ground.svg";
import ice from "../images/ice.svg";
import normal from "../images/normal.svg";
import poison from "../images/poison.svg";
import psychic from "../images/psychic.svg";
import rock from "../images/rock.svg";
import steel from "../images/steel.svg";
import water from "../images/water.svg";

const iconosPokemon ={
    "bug":bug,
    "water":water,
    "grass":grass,
    "fire":fire,
    "normal":normal,
    "poison":poison,
    "electric":electric,
    "ground":ground,
    "fairy":fairy,
    "fighting":fighting,
    "psychic":psychic,
    "ghost":ghost,
    "rock":rock,
    "ice":ice,
    "flying":flying,
    "dark":dark,
    "dragon":dragon,
    "steel":steel
}


export const icono = (tipo) =>{
    return iconosPokemon[tipo];
}