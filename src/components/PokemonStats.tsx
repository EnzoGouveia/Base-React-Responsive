import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from "recharts";

interface Stat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Props {
  stats: Stat[];
}

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PokemonStats: React.FC<Props> = ({ stats }) => {
  const data = stats.map(stat => ({
    subject: stat.stat.name === "special-attack" ? "Sp. Atk" : stat.stat.name === "special-defense" ? "Sp. Def" : capitalizeFirstLetter(stat.stat.name),
    A: stat.base_stat,
    fullMark: 200
  }));

  return (
    <RadarChart
    cx={150}
    cy={100}
    outerRadius={80}
    width={300}
    height={200}
    data={data}
    >
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis />
      <Radar
        name="Stats"
        dataKey="A"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  );
};

export default PokemonStats;