import { Pokemon } from '@/@types/pokemon';
import PokemonStats from '@/components/PokemonStats';
import { fetchApi } from '@/utils/api';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'react-feather';

interface PokemonDetailProps {
  pokemon: Pokemon
}

export const getServerSideProps: GetServerSideProps<PokemonDetailProps> = async (context) => {
  // Je récupère la valeur de mon paramètre se nommant pokedexId
  const pokedexId = context.params?.pokedexId as string;

  const pokemon = await fetchApi<Pokemon>(`api/v1/pokemon/${pokedexId}`);

  // On retourne un objet contenant props, props étant les propriété
  // qui seront passé à notre composant en dessous
  return { props: { pokemon } };
};

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          {`Pokémon ${pokemon.name.fr}`}
        </title>
      </Head>
      <main className="bg-cyan-500 min-h-screen">
        <h1 className="text-4xl font-bold text-white pt-2 flex justify-center items-center gap-4">
          <button onClick={() => router.back()} type="button">
            <ChevronLeft />
          </button>
          {pokemon.name.fr}
        </h1>
        <div className="p-4">
          <section className="bg-white md:grid grid-cols-2">
            <div className="grid md:grid-cols-2 items-center">
              <img src={pokemon.sprites.regular} alt={`${pokemon.name.fr}`} />
              {pokemon.sprites.shiny && <img src={pokemon.sprites.shiny} alt={`${pokemon.name.fr} shiny`} />}
            </div>
            <div className="min-w-[30%]">
              <div>
                <h2 className="font-bold text-2xl text-center">Information</h2>
                <ul>
                  <li>
                    <span className="font-bold">Type : </span>
                    <span>{pokemon.types?.map((t) => t.name).join(', ')}</span>
                  </li>
                  <li>
                    <span className="font-bold">Numéro : </span>
                    <span>{pokemon.pokedexId}</span>
                  </li>
                  <li>
                    <span className="font-bold">Nom : </span>
                    <span>{pokemon.name.fr}</span>
                  </li>
                  <li>
                    <span className="font-bold">Taille : </span>
                    <span>{pokemon.height}</span>
                  </li>
                  <li>
                    <span className="font-bold">Poids : </span>
                    <span>{pokemon.weight}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-2xl text-center">Statistique</h2>
                <PokemonStats stats={pokemon.stats} />
              </div>
            </div>
          </section>
          <section className="bg-white">

            <h2 className="text-2xl font-bold text-center">Évolution</h2>
            <div className="grid grid-cols-2 text-center">
              {pokemon.evolution?.pre && (
              <div>
                <h3 className="text-xl font-bold">Évolution précédente :</h3>
                <div className="flex gap-2 justify-center">
                  {pokemon.evolution.pre.map((p) => (
                    <Link
                      href={`/pokemon/${p.pokedexId}`}
                      key={p.pokedexId}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              )}

              {pokemon.evolution?.next && (
              <div>
                <h3 className="text-xl font-bold">Évolution suivante :</h3>
                <div className="flex gap-2 justify-center">
                  {pokemon.evolution.next.map((p) => (
                    <Link
                      href={`/pokemon/${p.pokedexId}`}
                      key={p.pokedexId}
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              )}
            </div>

            {pokemon.evolution?.mega && (
            <div className="text-center">
              <h2 className="mt-2 font-bold text-xl">Méga</h2>
              <div>
                {pokemon.evolution.mega?.map((p) => (
                  <div key={p.orbe} className="grid md:grid-cols-2">
                    <img src={p.sprites.regular} alt={pokemon.name.fr} className="justify-self-center" />
                    {p.sprites.shiny && <img src={p.sprites.shiny} alt={`${pokemon.name.fr} shiny`} className="justify-self-center" />}
                  </div>
                ))}
              </div>
            </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
