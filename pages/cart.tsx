import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import apiPost from "@/components/apiPost";
import CartItem from "@/components/CartItem";
import CartItemCSS from '@/components/CartItem.module.css';
import cx from 'classnames';
import useShoppingCart from "@/components/useShoppingCart";
import {MdErrorOutline} from 'react-icons/md';
import {BsCheck2Circle} from 'react-icons/bs';

export default function Home() {
  const { trimCart, clearCart, cart } = useShoppingCart();

  useEffect(() => {
    trimCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitCart = useMutation({
    mutationFn: (body: BodyInit) => apiPost("/api/store/buy", {}, body),
    onSuccess: () => {
      console.log("Order submitted successfully");
      clearCart();
    },
    onError: () => {
      console.log("Order failed");
    }
  });

  const statusSection = (
    <div className="flex justify-end">
      {submitCart.isLoading ? <div>Placing order...</div> : null}
      {submitCart.isError ? (
        <div className="flex gap-4 items-center bg-red text-white rounded-lg p-4">
          <MdErrorOutline size="30px" /> Error Checking out!
        </div>
      ) : null}
      {submitCart.isSuccess ? (
        <div className="flex gap-4 items-center bg-green text-white rounded-lg p-4">
          <BsCheck2Circle/> Order placed!
        </div>
      ) : null}
    </div>
  );

  if (cart.length) {
    return (
      <div className="m-auto max-w-screen-lg flex flex-col">
        <ul
          className={cx(
            CartItemCSS.gridRow,
            "grid",
            "p-px",
            "gap-y-px",
            "bg-black",
            "grid-cols-1",
            "sm:grid-cols-3"
          )}
        >
          {cart.map(([pokemonName, amount], index) => (
            <li key={`${pokemonName}-${amount}-${index}`} className="contents">
              <CartItem pokemonName={pokemonName} amount={amount} />
            </li>
          ))}
        </ul>
        <form
          className="p-4 self-end"
          onSubmit={(e) => {
            submitCart.mutate(JSON.stringify(cart));
            e.preventDefault();
          }}
        >
          <button type="submit" title="Checkout">
            <div className="flex gap-2 items-center bg-red hover:bg-darkRed text-white rounded-full p-4">
              Checkout
            </div>
          </button>
        </form>

        {statusSection}
      </div>
    );
  }
  return (
    <div className="m-auto max-w-screen-lg flex flex-col gap-6">
      <div>
        <ul className="grid md:grid-cols-2 grid-cols-1 gap-px bg-black p-px">
          <li className="flex grow bg-white h-32 col-span-full place-content-center place-items-center">
            Your Cart is Empty!
          </li>
        </ul>
      </div>

      {statusSection}
    </div>
  );
}
