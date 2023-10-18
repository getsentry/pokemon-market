import { useLocalstorage } from "@/components/useLocalstorage";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

export default function FlagPicker() {
  const { get, set } = useLocalstorage("locale", "uk");

  const selected = get();
  return (
    <select
      className="text-black font-normal p-1"
      onChange={(e) => set("locale", e.target.value)}
    >
      <option value="us" selected={selected === "us"}>
        {getUnicodeFlagIcon("US")} USA
      </option>
      <option value="uk" selected={selected === "uk"}>
        {getUnicodeFlagIcon("GB")} United Kindom
      </option>
    </select>
  );
}
