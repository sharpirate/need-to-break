import PropTypes from 'prop-types';

function Toggle() {
  return (
    <div className="relative">
      <input className="appearance-none block w-40 h-20 420:w-48 420:h-24 rounded-20 bg-gray-400 checked:bg-primary-500" type="checkbox" name="" id="" />
      <span className="absolute top-4 left-4 block w-12 h-12 420:w-16 420:h-16 rounded-20 bg-white" />
    </div>
  );
}

export default Toggle;