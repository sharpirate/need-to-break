import PropTypes from "prop-types";
import { motion } from "framer-motion";
import Link from "next/link";

const delay = 150;

export { delay as buttonDelay };

const types = {
  primary: "primary",
  outline: "outline",
  delete: "delete",
  success: "success",
  callToAction: "callToAction",
};

export { types as buttonTypes };

function Button({
  type,
  children,
  disabled,
  handleClick,
  isSubmit,
  styleOverride,
  href,
}) {
  let style;

  switch (type) {
    case types.primary:
      style =
        "text-white bg-primary-500 disabled:bg-gray-300 focus-visible:bg-primary-600";
      break;
    case types.callToAction:
      style = "text-primary-600 bg-support-attention focus-visible:bg-white";
      break;
    case types.outline:
      style =
        "text-primary-500 bg-white ring-5/2 ring-inset ring-primary-500 disabled:ring-gray-300 disabled:text-gray-300 focus-visible:ring-primary-600";
      break;
    case types.delete:
      style =
        "text-white bg-blocked-500 disabled:bg-gray-300 focus-visible:bg-blocked-600";
      break;
    case types.success:
      style = "text-white bg-support-success";
      break;
    default:
      return null;
  }

  if (href) {
    return (
      <motion.a
        className={
          "select-none px-24 420:px-32 py-8 body-med body-small rounded-6 outline-none active:scale-90" +
          " " +
          style +
          " " +
          styleOverride
        }
        whileTap={{ scale: 0.85 }}
        href={href}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={isSubmit ? "submit" : "button"}
      // add delay for scale animation to finish
      onClick={() => setTimeout(handleClick, delay)}
      disabled={disabled}
      className={
        "select-none px-24 420:px-32 py-8 body-med body-small rounded-6 outline-none active:scale-90" +
        " " +
        style +
        " " +
        styleOverride
      }
      whileTap={{ scale: 0.85 }}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
};

export default Button;
