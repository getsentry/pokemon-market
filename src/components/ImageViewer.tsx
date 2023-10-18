import type { Pokemon } from "pokenode-ts";
import cx from "classnames";
import { useState } from "react";

export default function ImageViewer({
  className,
  pokemon,
}: {
  className?: string;
  pokemon: Pokemon;
}) {
  const [img, setImg] = useState<"front_default" | "back_default">(
    "front_default"
  );

  return (
    <div className={cx(className, "grid grid-flow-row gap-px p-px bg-black")}>
      <img
        src={pokemon.sprites[img]}
        alt={pokemon.name}
        className={cx("bg-white", "h-96", "w-96")}
      />
      <div className={cx("grid", "grid-flow-col gap-px")}>
        <button
          onClick={() => setImg("front_default")}
          className="bg-white hover:bg-hover text-black flex justify-center p-2"
        >
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="h-16 w-16"
          />
        </button>
        <button
          onClick={() => setImg("back_default")}
          className="bg-white hover:bg-hover text-black flex justify-center p-2"
        >
          <img
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
            className="h-16 w-16"
          />
        </button>
      </div>
    </div>
  );
}
