import { BsShop } from "react-icons/bs";
import { Fragment } from "react";
import { useRouter } from "next/router";
import AuthButton from "@/components/AuthButton";
import cx from 'classnames';
import FlagPicker from "@/components/FlagPicker";
import Link from "next/link";
import ShoppingCartCount from "@/components/ShoppingCartCount";

export default function Header() {
  const {pathname} = useRouter();

  return (
    <Fragment>
      <aside className="flex px-10 py-1 bg-darkRed text-white font-thin">
        <ul className="flex flex-grow items-center justify-start gap-4">
          <li>
            <Link href="/about" title="About the PokeMart">
              <div
                className={cx(
                  { underline: pathname === "/about" },
                  "hover:bg-red",
                  "text-white",
                  "px-2",
                  "py-1",
                  "rounded-md",
                  "text-md block"
                )}
              >
                About
              </div>
            </Link>
          </li>
        </ul>
        <ul className="flex flex-grow items-center justify-end gap-4">
          <li>
            <FlagPicker />
          </li>
          <li>
            <AuthButton />
          </li>
        </ul>
      </aside>
      <header className="flex grow items-center px-6 py-2 bg-red text-white sticky top-0 z-10">
        <Link href="/" title="Go to PokeMart homepage">
          <div className="hover:bg-darkRed rounded-xl px-4 py-2">
            <h1 className="flex flex-grow gap-4 items-center text-3xl font-semibold">
              <BsShop /> Pokemart
            </h1>
          </div>
        </Link>
        <ul className="grow flex justify-end">
          <li className="flex items-center gap-2 text-lg">
            <ShoppingCartCount />
          </li>
        </ul>
      </header>
    </Fragment>
  );
}
