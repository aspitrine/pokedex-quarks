import { Pokemon } from '@/@types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import Head from 'next/head';
import { useMemo } from 'react';

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
  const pokemonsFiltered = useMemo(() => pokemons.slice(0, 20), [pokemons]);
  return (
    <>
      <Head>
        <title>Mon super pokedex</title>
      </Head>
      <main className="bg-cyan-500 min-h-screen">
        <h1 className="text-4xl font-bold text-white text-center pt-2">
          Pokédex
        </h1>
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
