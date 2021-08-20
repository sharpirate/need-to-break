function Arrow({ type, size, state }) {
  return resolveArrow(type, size, state);
}

function resolveArrow(type, size, state) {
  let sizeStyle = '';

  switch (size) {
    case '50':
      sizeStyle = 'w-13 h-13 360:w-16 360:h-16';
      break
      case '100':
      sizeStyle = 'w-16 h-16 360:w-24 360:h-24';
      break;
    default:
      return null;
  }

  let typeStyle = '';

  switch (type) {
    case 'down':
      break;
    case 'left':
      typeStyle = 'transform rotate-90'
      break;
    case 'right':
      typeStyle = 'transform -rotate-90'
      break;
    case 'up':
      typeStyle = 'transform rotate-180'
      break;
    default:
      return null;
  }

  let colorStyle = '';

  switch (state) {
    case 'active':
      colorStyle = 'fill-current text-primary-500'
      break;
    case 'default':
      colorStyle = 'fill-current text-gray-400'
      break;
    case 'disabled':
      colorStyle = 'fill-current text-gray-300'
      return null;
  }

  return (
    <svg className={sizeStyle + ' ' + typeStyle} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className={colorStyle} fillRule="evenodd" clipRule="evenodd" d="M16 3.38117L8 12.6188L0 3.38117H2.87253L8.00009 9.30197L13.1277 3.38117H16Z"/>
    </svg>
  );
}

export default Arrow;