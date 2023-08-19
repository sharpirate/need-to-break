import PropTypes from "prop-types";
import Icon from "../../atoms/Icon";
import Label, { labelTypes } from "../../atoms/Label";

function Header({ icon, heading, description }) {
  return (
    <div className="flex flex-col justify-center items-center text-center mb-16 420:mb-24 gap-16 420:gap-24">
      <Icon type={icon} />
      <div>
        <Label size={labelTypes.large} as={labelTypes.h2}>
          {heading}
        </Label>
        {description ? (
          <p className="body-med text-gray-500">{description}</p>
        ) : null}
      </div>
    </div>
  );
}

Header.propTypes = {
  icon: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default Header;
