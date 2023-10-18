import { BsCart } from "react-icons/bs";
import useShoppingCart from "@/components/useShoppingCard";

export default function ShoppingCartCount() {
  const { cart } = useShoppingCart();

  return (
    <button className="flex items-center gap-2 hover:bg-darkRed rounded-xl px-4 py-2">
      <BsCart />
      <span>{cart.length} items</span>
    </button>
  );
}
