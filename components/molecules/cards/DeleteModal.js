import React from "react";
import InputCard from "./InputCard";
import Header from "./Header";
import { iconTypes } from "../../atoms/Icon";
import Button, { buttonTypes } from "../../atoms/Button";

function DeleteModal() {
  return (
    <InputCard>
      <Header
        icon={iconTypes.delete}
        heading="Are you Sure?"
        description="Do you really want to remove Monday’s Schedule from your presets?"
      />

      <div className="grid grid-cols-2 gap-24 mt-16 420:mt-24">
        <Button type={buttonTypes.outline}>Cancel</Button>
        <Button type={buttonTypes.delete}>Delete</Button>
      </div>
    </InputCard>
  );
}

export default DeleteModal;