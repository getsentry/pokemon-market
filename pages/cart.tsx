import useShoppingCart from "@/components/useShoppingCart";
import CartItem from "@/components/CartItem";

export default function Home() {
  const { cart, removeFromCart } = useShoppingCart();

  if (cart.length) {
    return (
      <div className="m-auto max-w-screen-lg flex flex-col">
        <ul
          className="grid p-px gap-y-px bg-black"
          style={{ gridTemplateColumns: "max-content 1fr max-content" }}
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
        <div className="p-4 self-end">
          <button type="submit" title="Checkout">
            <div className="flex gap-2 items-center bg-red text-white rounded-full hover:bg-darkRed p-4">
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
  )
}
