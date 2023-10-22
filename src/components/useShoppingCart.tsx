import useLocalstorage from "@/components/useLocalstorage";
import { useCallback, useMemo } from "react";

type ItemTuple = [string, number]
type Cart = ItemTuple[];

const KEY = 'shoppingCart';

export default function useShoppingCart() {
  const { get, set } = useLocalstorage();
  const rawCart = useMemo(() => (get(KEY) ?? []) as Cart, [get]);

  const addToCart = useCallback(
    (name: string, amount: number) => {
      console.log('adding to cart', {name, amount}, rawCart);
      rawCart.push([name, amount]);
      set(KEY, [...rawCart]);
    },
    [rawCart, set]
  );

  const removeFromCart = useCallback(
    (index: number) => {
      console.log('removing from card', {index}, rawCart);
      rawCart.splice(index, 1);
      set(KEY, rawCart);
    },
    [rawCart, set]
  );

  return {
    cart: rawCart,
    addToCart,
    removeFromCart
  };
}
