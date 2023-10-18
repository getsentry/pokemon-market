import Link from "next/link";
import { ReactElement } from "react";
import { BsCart, BsShop } from "react-icons/bs";


export function DefaultLayout(page: ReactElement) {
  return (
    <>
      <aside className="flex px-10 py-4 bg-darkRed text-white font-thin">
        <ul className="flex flex-grow gap-4">
          <li className="">About</li>
          <li className="">Contact Us</li>
        </ul>
        <ul className="flex flex-grow justify-end">
          <li className="">Log In</li>
        </ul>
      </aside>
      <header className="flex px-10 py-7 bg-red text-white">
        <h1 className="flex flex-grow gap-4 items-center text-3xl font-semibold">
          <BsShop /> Poke Mart
        </h1>
        <ul className="flex flex-grow justify-end">
          <li className="flex items-center gap-2 text-lg">
            <span>Cart</span>
            <BsCart />
          </li>
        </ul>
      </header>
      <nav className="px-10 py-5 bg-white text-black">
        <ul className="flex gap-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/featured">Featured</Link>
          </li>
        </ul>
      </nav>
      <main className="mx-10">{page}</main>
    </>
  );
}
