import Preset from "./Preset";
import NoPresets from "./cards/NoPresets";
import { usePresets } from "../../context/Presets";

function PresetList() {
  const presets = usePresets();

  if (!presets) {
    // still loading
    return null;
  }

  return presets.length ? (
    <ul className="w-full flex flex-col justify-start items-center gap-24 420:gap-32 932:gap-48">
      {presets.map(preset => (
        <li className="w-full" key={preset.id}>
          <Preset preset={preset} />
        </li>
      ))}
    </ul>
  ) : <NoPresets />;
}

export default PresetList;