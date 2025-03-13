import { useEffect, useState } from "react";
import "./index.css";
import { Pokemoncards } from "./Pokemoncards";


export const Pokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [loading,setloading]  = useState(true);
    const [error,seterror] = useState(null);
    const [search,setsearch]=useState("");
    const API = "https://pokeapi.co/api/v2/pokemon?limit=164";

    const fetchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();

            const detailedPokemonData = data.results.map(async (currPokemon) => {
                // console.log(currPokemon.url); 
                const res = await fetch(currPokemon.url);
                return res.json();
            });
            // console.log(detailedPokemonData);
            const detailedresponses= await Promise.all(detailedPokemonData);
            console.log(detailedresponses);
            setPokemon(detailedresponses);
            setloading(false);

            // const resolvedData = await Promise.all(detailedPokemonData);
            // setPokemonData(resolvedData); 
            // console.log(resolvedData); 

        } catch (error) {
            console.log(error);
            setloading(false);
            seterror(error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    // search functionality
    const searchdata=pokemon.filter((currPokemon)=>currPokemon.name.toLowerCase().includes(search.toLowerCase()));
    if(loading){
        return(
            <div> <h1>Loading...</h1></div>
        );
    }
    if(error){
        return(
           <div> <h1>Sorry some error occured</h1></div>
        );
    }

    return (
        <>
<section className="container">
<header>
    <h1>Lets Catch Pokemon</h1>
</header>
<div className="pokemon-search">
<input type="text" placeholder="search pokemon" value={search} onChange={(e)=>setsearch(e.target.value)}/>

</div>
<div>
    <ul className="cards">
        {searchdata.map((currPokemon)=>{
           return (
           <Pokemoncards key={currPokemon.id} pokemonData={currPokemon}/>

           );
        })}
    </ul>
</div>
</section>
        </>
    );
};
