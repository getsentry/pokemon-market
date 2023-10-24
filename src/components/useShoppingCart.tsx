import useLocalstorage from "@/components/useLocalstorage";
import { useCallback, useMemo } from "react";

type Cart = Record<string, number>;

const KEY = 'shoppingCart';

export default function useShoppingCart() {
  const { get, set } = useLocalstorage();
  const rawCart = useMemo(() => (get(KEY) ?? {}) as Cart, [get]);

  const trimCart = useCallback(() => 
    set(KEY, Object.fromEntries(Object.entries(rawCart).filter(([name, amount]) => amount))),
    [rawCart, set]
  );

  const updateCartCount = useCallback((name: string, amount: number) => {
    console.log("updating cart count", { name, amount }, rawCart);
    rawCart[name] = rawCart[name] ?? 0;
    rawCart[name] = amount;
    set(KEY, { ...rawCart });
  }, [rawCart, set]);

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

  const cart = useMemo(() => Object.entries(rawCart), [rawCart]);
  const itemCount = cart.reduce((sum, [,n]) => sum + n, 0);

  return {
    trimCart,
    cart,
    addToCart,
    updateCartCount,
    removeFromCart,
    itemCount,
  };
}
