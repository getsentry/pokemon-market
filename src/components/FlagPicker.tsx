import useLocalstorage from "@/components/useLocalstorage";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

export default function FlagPicker() {
  const { get, set } = useLocalstorage();

  const selected = (get("locale") ?? 'us') as string
  return (
    <select
      className="text-black font-normal p-1 rounded-md"
      onChange={(e) => set("locale", e.target.value)}
      value={selected}
    >
      <option value="us">{getUnicodeFlagIcon("US")} USA</option>
      <option value="gb">{getUnicodeFlagIcon("GB")} United Kingdom</option>
    </select>
  );
}
