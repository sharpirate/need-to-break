import Preset from "../components/molecules/Preset";

function PresetsPage() {
  return (
    <ul className="w-full flex flex-col justify-start items-center gap-32">
      <li className="w-full">
        <Preset name="Monday's Schedule" />
      </li>

      <li className="w-full">
        <Preset name="Friday's Schedule" />
      </li>
    </ul>
  );
}

export default PresetsPage;