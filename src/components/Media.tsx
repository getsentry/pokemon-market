import media from "./Media.module.css";
import { ReactNode } from "react";

interface Props {
  img: ReactNode;
  title: ReactNode;
  desc: ReactNode;
}

export default function PokemonCardView({ img, title, desc }: Props) {
  return (
    <div className={media.layout}>
      <div className={media.img}>{img}</div>
      <div className={media.title}>{title}</div>
      <div className={media.desc}>{desc}</div>
    </div>
  );
}
