import { Pokemon } from '@/@types/pokemon';
import PokemonCard from '@/components/PokemonCard';
import { fetchApi } from '@/utils/api';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ChangeEvent, useEffect, useMemo, useState,
} from 'react';

// Fonction exécuter côté serveur pour récuperer les données provenant de différente API
export async function getServerSideProps() {
  const pokemons = await fetchApi<Pokemon[]>('/api/v1/pokemon');
  // On retourne un objet contenant props, props étant les propriété
  // qui seront passé à notre composant en dessous
  return { props: { pokemons } };
}

interface HomeProps {
  pokemons: Pokemon[]
}
export default function Home({ pokemons }: HomeProps) {
  const router = useRouter();
  const defaultPageNumber = Number(router.query.pageNumber) || 0;
  const [pageNumber, setPageNumber] = useState(defaultPageNumber);

  const defaultNbPerPage = Number(router.query.nbPerPage) || 20;
  const [nbPerPage, setNbPerPage] = useState(defaultNbPerPage);

  const pokemonsFiltered = useMemo(() => {
    const indexStart = pageNumber * nbPerPage;
    const indexEnd = indexStart + nbPerPage;
    return pokemons.slice(indexStart, indexEnd);
  }, [pokemons, pageNumber, nbPerPage]);

  const handleChangeNbPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
    const newNbPerPage = Number(event.target.value);
    setNbPerPage(newNbPerPage);
    setPageNumber(0);
  };

  useEffect(() => {
    router.query.nbPerPage = nbPerPage.toString();
    router.query.pageNumber = pageNumber.toString();
    router.push(router, undefined, {
      shallow: true,
    });
  }, [nbPerPage, pageNumber]);

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
          <span className="text-white">Nombre de pokemons par page</span>
          <select onChange={handleChangeNbPerPage} value={nbPerPage}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
        <div className="flex gap-2 justify-center">
          <button
            type="button"
            className="bg-white p-2 min-w-[10rem] rounded-lg font-bold hover:bg-[#F0F] disabled:bg-gray-400"
            onClick={() => setPageNumber((nb) => nb - 1)}
            disabled={pageNumber === 0}
          >
            Précédent
          </button>
          <button
            type="button"
            className="bg-white p-2 min-w-[10rem] rounded-lg font-bold hover:bg-[#F0F] disabled:bg-gray-400"
            onClick={() => setPageNumber((nb) => nb + 1)}
            // Je calcul l'index de départ de ma prochaine page
            // Si l'index est plus grand que mon nombre d'élément
            // Je n'ai plus de pokémon à afficher
            disabled={pokemons.length <= (pageNumber + 1) * nbPerPage}
          >
            Suivant
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2 p-2">
          {pokemonsFiltered.map((pokemon) => (
            <Link
              key={`${pokemon.pokedexId}${pokemon.name.fr}`}
              href={`/pokemon/${pokemon.pokedexId}`}
              className="flex"
            >
              <PokemonCard
                pokemon={pokemon}
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
