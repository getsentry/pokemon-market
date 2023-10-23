import useShoppingCart from "@/components/useShoppingCart";
import CartItem from "@/components/CartItem";
import CartItemCSS from '@/components/CartItem.module.css';
import cx from 'classnames';

export default function Home() {
  const { cart, removeFromCart } = useShoppingCart();

  if (cart.length) {
    return (
      <div className="m-auto max-w-screen-lg flex flex-col">
        <ul className={cx(CartItemCSS.gridRow, "grid", "p-px", "gap-y-px", "bg-black", "grid-cols-1", "sm:grid-cols-3")}>
          {cart.map(([pokemonName, amount], index) => (
            <li key={`${pokemonName}-${amount}-${index}`} className="contents">
              <CartItem
                pokemonName={pokemonName}
                amount={amount}
                onSubmit={() => {
                  removeFromCart(pokemonName);
                }}
              />
            </li>
          ))}
        </ul>
        <div className="p-4 self-end">
          <button type="submit" title="Checkout" disabled>
            <div className="flex gap-2 items-center bg-border text-hover rounded-full p-4">
              Checkout
            </div>
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="m-auto max-w-screen-lg flex flex-col">
      <p className="text-center italic">Your cart is empty</p>
    </div>
  );
}
