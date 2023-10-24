const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

interface Props {
  className?: string;
  amount: number;
  locale: "us" | "gb" | string;
}

export default function Price({ className, amount, locale }: Props) {
  const formatter =
    {
      us: USD,
      gb: GBP,
    }[locale] ?? USD;

  return <div className={className}>{formatter.format(amount)}</div>;
}
