import useShoppingCart from "@/components/useShoppingCart";
import CartItem from "@/components/CartItem";
import CartItemCSS from '@/components/CartItem.module.css';
import cx from 'classnames';
import { useMutation } from "@tanstack/react-query";
import apiPost from "@/components/apiPost";

export default function Home() {
  const { cart, removeFromCart } = useShoppingCart();

  const submitCart = useMutation({
    mutationFn: (body: BodyInit) => apiPost('/api/store/buy', {}, body),
    onSuccess: () => {
      console.log('Order Submitted');
    }
  });
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
        <form className="p-4 self-end" onSubmit={e => {
          submitCart.mutate(JSON.stringify(cart));
          e.preventDefault();
        }}>
          <button type="submit" title="Checkout">
            <div className="flex gap-2 items-center bg-red hover:bg-darkRed text-white rounded-full p-4">
              Checkout
            </div>
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="m-auto max-w-screen-lg flex flex-col">
      <p className="text-center italic">Your cart is empty</p>
    </div>
  );
}
