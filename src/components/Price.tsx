import useLocalstorage from "@/components/useLocalstorage";

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

interface Props {
  amount: number;
}

export default function Price({ amount }: Props) {
  const { get } = useLocalstorage();

  const formatter =
    {
      us: USD,
      gb: GBP,
    }[(get("locale") ?? 'us') as string] ?? USD;

  return <span>{formatter.format(amount)}</span>;
}
