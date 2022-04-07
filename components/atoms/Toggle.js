import PropTypes from "prop-types";
function Toggle({ handleChange, checked, disabled }) {

  function handleEnterKey(e) {
    if (e.key === 'Enter') {
      handleChange()
    }
  }

  const disabledStyle = disabled ? "bg-gray-300" : "bg-gray-400";

  return (
    <div className="relative">
      <input
        disabled={disabled}
        className={`cursor-pointer appearance-none block w-40 h-20 420:w-48 420:h-24 rounded-20  checked:bg-primary-500 peer outline-none focus-visible:bg-primary-600 ${disabledStyle}`}
        type="checkbox"
        name=""
        checked={checked}
        id=""
        onChange={handleChange}
        onKeyDown={e => handleEnterKey(e)}
      />
      <span className="pointer-events-none absolute top-4 left-4 block w-12 h-12 420:w-16 420:h-16 rounded-20 bg-white peer-checked:left-[24px] 420:peer-checked:left-[28px] transition-all" />
    </div>
  );
}

Toggle.propTypes = {
  handleChange: PropTypes.func,
  checked: PropTypes.bool
};;

export default Toggle;