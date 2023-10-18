import useLocalstorage from "@/components/useLocalstorage";
import getUnicodeFlagIcon from "country-flag-icons/unicode";

export default function FlagPicker() {
  const { get, set } = useLocalstorage();

  const selected = get("locale", "uk");
  return (
    <select
      className="text-black font-normal p-1 rounded-md"
      onChange={(e) => set("locale", e.target.value)}
    >
      <option value="us" selected={selected === "us"}>
        {getUnicodeFlagIcon("US")} USA
      </option>
      <option value="gb" selected={selected === "gb"}>
        {getUnicodeFlagIcon("GB")} United Kindom
      </option>
    </select>
  );
}
