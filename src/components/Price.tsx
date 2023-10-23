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
  locale: "us" | "gb" | string;
}

export default function Price({ amount, locale }: Props) {
  const formatter =
    {
      us: USD,
      gb: GBP,
    }[locale] ?? USD;

  return <span>{formatter.format(amount)}</span>;
}
