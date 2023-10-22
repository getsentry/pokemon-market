import FlagPicker from "@/components/FlagPicker";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import {  BsShop } from "react-icons/bs";
import cx from 'classnames';
import ShoppingCartCount from "@/components/ShoppingCartCount";
import AuthButton from "@/components/AuthButton";

export function DefaultLayout(page: ReactElement) {
  const router = useRouter();

  const {pathname} = router;
  return (
    <>
      <aside className="flex px-10 py-1 bg-darkRed text-white font-thin">
        <ul className="flex flex-grow items-center justify-start gap-4">
          <li>
            <Link href="/about" title="About the PokeMart">
              <div
                className={cx(
                  { underline: pathname === "/about" },
                  "hover:bg-red text-white px-2 py-1 rounded-md text-md block"
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
      <header className="flex grow items-center px-6 py-2 bg-red text-white">
        <Link href="/" title="Go to PokeMart homepage">
          <div className="hover:bg-darkRed rounded-xl px-4 py-2">
            <h1 className="flex flex-grow gap-4 items-center text-3xl font-semibold">
              <BsShop /> Pokeart
            </h1>
          </div>
        </Link>
        <ul className="grow flex justify-end">
          <li className="flex items-center gap-2 text-lg">
            <ShoppingCartCount />
          </li>
        </ul>
      </header>
      <nav className="px-10 py-5 bg-white text-black">
        <ul className="flex gap-4">
          <li>
            <Link href="/" title="Go to homepage">
              <div
                className={cx(
                  { underline: pathname === "/" },
                  "hover:bg-hover px-4 py-2 rounded-md"
                )}
              >
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link href="/featured" title="See Featured Pokemon">
              <div
                className={cx(
                  { underline: pathname === "/featured" },
                  "hover:bg-hover px-4 py-2 rounded-md"
                )}
              >
                Featured
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="px-10 pb-10">{page}</main>
    </>
  );
}
