import { Pokemon } from '@/@types/pokemon';

interface PokemonCardProps {
  pokemon: Pokemon
}
export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className=" bg-white rounded-lg shadow-lg p-4 flex flex-col w-full">
      <img
        src={pokemon.sprites.shiny || pokemon.sprites.regular}
        alt={pokemon.name.fr}
      />
      <h3 className="font-bold text-center py-2">
        {`#${pokemon.pokedexId} - ${pokemon.name.fr}`}
      </h3>
      <p className="flex gap-2 justify-center">
        {pokemon.types?.map((type) => (
          <span key={type.name} className="flex items-center gap-2">
            {type.name}
            <img src={type.image} alt={type.name} className="w-8" />
          </span>
        ))}
      </p>
    </div>
  );
}
