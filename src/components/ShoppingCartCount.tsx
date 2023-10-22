import { BsCart } from "react-icons/bs";
import useShoppingCart from "@/components/useShoppingCart";
import Link from "next/link";

export default function ShoppingCartCount() {
  const { cart } = useShoppingCart();

  if (cart.length) {
    return (
      <Link aria-label="View Cart" title="View Cart" href="/cart">
        <div className="flex items-center gap-2 hover:bg-darkRed rounded-xl px-4 py-2">
          <BsCart />
          <span>{cart.length} items</span>
        </div>
      </Link>
    );
  } else {
    return (
      <button aria-label="View Cart" title="View Cart">
        <div className="flex items-center gap-2 hover:bg-darkRed rounded-xl px-4 py-2">
          <BsCart />
          <span>{cart.length} items</span>
        </div>
      </button>
    );
  } 
}
