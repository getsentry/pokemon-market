import { useQuery } from "@tanstack/react-query";
import apiPost from "@/components/apiPost";
import Price from "@/components/Price";
import useLocalstorage from "@/components/useLocalstorage";

interface Props {
  cart: Array<[string, number]>;
}

export default function OrderTotal({ cart }: Props) {
  const { get } = useLocalstorage();
  const locale = (get("locale") ?? "us") as string;

  const { data, isLoading } = useQuery<{ total: number }>({
    queryKey: ["/api/store/cart-total", cart, locale],
    queryFn: () =>
      apiPost(
        `/api/store/cart-total?locale=${locale}`,
        {},
        JSON.stringify(cart)
      ),
    enabled: cart.length > 0,
  });

  if (isLoading) {
    return (
      <div className="flex justify-between items-center border-t-2 border-black p-4">
        <div className="text-lg font-bold">Order Total</div>
        <div className="text-xl text-gray-400">Calculating...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center border-t-2 border-black p-4">
      <div className="text-lg font-bold">Order Total</div>
      <div className="text-2xl text-red font-bold">
        <Price amount={data?.total ?? 0} locale={locale} />
      </div>
    </div>
  );
}
