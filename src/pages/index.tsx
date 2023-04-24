import { Pokemon } from '@/@types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import Head from 'next/head';
import { useMemo, useState } from 'react';

// Fonction exécuter côté serveur pour récuperer les données provenant de différente API
export async function getServerSideProps() {
  const pokemons: Pokemon[] = await fetch('https://api-pokemon-fr.vercel.app/api/v1/pokemon')
    .then((r) => r.json());
  // On retourne un objet contenant props, props étant les propriété
  // qui seront passé à notre composant en dessous
  return { props: { pokemons } };
}

interface HomeProps {
  pokemons: Pokemon[]
}
export default function Home({ pokemons }: HomeProps) {
  const [pageNumber, setPageNumber] = useState(0);
  const [nbPerPage, setNbPerPage] = useState(20);

  const pokemonsFiltered = useMemo(() => {
    const indexStart = pageNumber * nbPerPage;
    const indexEnd = indexStart + nbPerPage;
    return pokemons.slice(indexStart, indexEnd);
  }, [pokemons, pageNumber, nbPerPage]);

  return (
    <>
      <Head>
        <title>Mon super pokedex</title>
      </Head>
      <main className="bg-cyan-500 min-h-screen">
        <h1 className="text-4xl font-bold text-white text-center pt-2">
          Pokédex
        </h1>
        <div className="flex justify-center gap-2 py-2">
          <span>Nombre de pokemons par page</span>
          <select onChange={(e) => setNbPerPage(Number(e.target.value))}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            className="bg-white p-2 min-w-[15rem] rounded-lg font-bold hover:bg-[#F0F] disabled:bg-gray-400"
            onClick={() => setPageNumber((nb) => nb - 1)}
            disabled={pageNumber === 0}
          >
            Précédent
          </button>
          <button
            type="button"
            className="bg-white p-2 min-w-[15rem] rounded-lg font-bold hover:bg-[#F0F] disabled:bg-gray-400"
            onClick={() => setPageNumber((nb) => nb + 1)}
            // Je calcul l'index de départ de ma prochaine page
            // Si l'index est plus grand que mon nombre d'élément
            // Je n'ai plus de pokémon à afficher
            disabled={pokemons.length <= (pageNumber + 1) * nbPerPage}
          >
            Suivant
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 p-2">
          {pokemonsFiltered.map((pokemon) => (
            <PokemonCard
              key={`${pokemon.pokedexId}${pokemon.name.fr}`}
              pokemon={pokemon}
            />
          ))}
        </div>
      </main>
    </>
  );
}
