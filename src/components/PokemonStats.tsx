import { Stats } from '@/@types/pokemon';

interface PokemonStatsProps {
  stats: Stats
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <ul>
      <li>
        <span className="font-bold">HP : </span>
        <span>{stats.hp}</span>
      </li>
      <li>
        <span className="font-bold">Attaque : </span>
        <span>{stats.atk}</span>
      </li>
      <li>
        <span className="font-bold">Défense : </span>
        <span>{stats.def}</span>
      </li>
      <li>
        <span className="font-bold">Attaque spécial : </span>
        <span>{stats.spe_atk}</span>
      </li>
      <li>
        <span className="font-bold">Défense spécial : </span>
        <span>{stats.spe_def}</span>
      </li>
      <li>
        <span className="font-bold">Vitesse : </span>
        <span>{stats.vit}</span>
      </li>
    </ul>
  );
}
