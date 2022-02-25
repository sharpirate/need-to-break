import { iconTypes } from "../../atoms/Icon";
import InputCard from "./InputCard";
import Header from "./Header";

function NoActiveTimeline() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.timeline}
        heading="No Active Timeline"
        description="Use the navigation to help you start a timeline"
      />
    </InputCard>
  )
}

export default NoActiveTimeline;