import { BsCart } from "react-icons/bs";
import useShoppingCart from "@/components/useShoppingCart";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";

export default function ShoppingCartCount() {
  const router = useRouter();
  const { pathname } = router;

  const { cart } = useShoppingCart();

  if (cart.length) {
    const count = cart.reduce((sum, [,n]) => sum + n, 0);
    return (
      <Link 
        aria-label="View Cart"
        title="View Cart"
        href="/cart"
        className={cx({ underline: pathname === "/cart" })}
      >
        <div className="flex items-center gap-2 hover:bg-darkRed rounded-xl px-4 py-2">
          <BsCart />
          <span>{count} items</span>
        </div>
      </Link>
    );
  } else {
    return (
      <button aria-label="View Cart" title="View Cart">
        <div className="flex items-center gap-2 hover:bg-darkRed rounded-xl px-4 py-2">
          <BsCart />
          <span>0 items</span>
        </div>
      </button>
    );
  } 
}
