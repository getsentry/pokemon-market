import useLocalstorage from "@/components/useLocalstorage";
import { useCallback, useMemo } from "react";

type Cart = Record<string, number>;

const KEY = 'shoppingCart';

export default function useShoppingCart() {
  const { get, set } = useLocalstorage();
  const rawCart = useMemo(() => (get(KEY) ?? {}) as Cart, [get]);

  const addToCart = useCallback(
    (name: string, amount: number) => {
      console.log('adding to cart', {name, amount}, rawCart);
      rawCart[name] = rawCart[name] ?? 0;
      rawCart[name] += amount;
        set(KEY, {...rawCart});
    },
    [rawCart, set]
  );

  const removeFromCart = useCallback(
    (name: string) => {
      console.log('removing from card', {name}, rawCart);
      delete rawCart[name];
      set(KEY, rawCart);
    },
    [rawCart, set]
  );

  return {
    cart: Object.entries(rawCart),
    addToCart,
    removeFromCart
  };
}
