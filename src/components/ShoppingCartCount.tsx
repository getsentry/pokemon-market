import { BsCart } from "react-icons/bs";
import useShoppingCart from "@/components/useShoppingCart";
import Link from "next/link";
import cx from "classnames";
import { useRouter } from "next/router";

export default function ShoppingCartCount() {
  const router = useRouter();
  const { pathname } = router;

  const { itemCount } = useShoppingCart();
  return (
    <Link
      aria-label="View Cart"
      title="View Cart"
      href="/cart"
      className={cx("btn", "btn-cart-icon", {
        underline: pathname === "/cart",
      })}
      id="view-cart"
    >
      <div className="sentry-mask flex items-center gap-2 hover:bg-darkRed rounded-xl px-4 py-2">
        <BsCart />
        <span>{itemCount} items</span>
      </div>
    </Link>
  );
}
