import CardsLayout from "./cards/CardsLayout";
import { cardsLayoutTypes } from "./cards/CardsLayout";

function TimelineCreator() {
  return <CardsLayout type={cardsLayoutTypes.flexible} />;
}

export default TimelineCreator;
