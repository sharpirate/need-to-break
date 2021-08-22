import PropTypes from 'prop-types';

export const types = {
  small: 'small',
  status: 'status',
  big: 'big',
  large: 'large',
  xlarge: 'xlarge',

  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  label: 'label',

  success: 'success',
  error: 'error'
};

function Label({ size, as, children, fieldId, type }) {
  const style = getStyle(size, type);
  
  switch (as) {
    case types.h1:
      return <h1 className={style}>{children}</h1>;
    case types.h2:
      return <h2 className={style}>{children}</h2>;
    case types.h3:
      return <h3 className={style}>{children}</h3>;
    case types.h4:
      return <h4 className={style}>{children}</h4>;
    case types.h5:
      return <h5 className={style}>{children}</h5>;
    case types.h6:
      return <h6 className={style}>{children}</h6>;
    case types.label:
      return <label className={style} htmlFor={fieldId}>{children}</label>;
    default:
      return null;
  }
}

Label.propTypes = {
  size: PropTypes.string,
  as: PropTypes.string,
  fieldId: PropTypes.string,
  type: PropTypes.string
};

function getStyle(size, type) {
  const baseStyle = 'tracking-2 font-base';

  let colorStyle = '';

  switch (type) {
    case types.success:
      colorStyle = 'text-support-success';
      break;
    case types.error:
      colorStyle = 'text-support-error';
      break;
    default:
      colorStyle = 'text-gray-600';
      break;
  }

  let sizeStyle = '';

  switch (size) {
    case types.status:
      sizeStyle = 'font-med text-10 mt-4 420:text-13';
      break;
    case types.small:
      sizeStyle = 'font-med text-10 mb-4 420:text-13';
      break;
    case types.big:
      sizeStyle = 'font-bold text-13 420:text-16 mb-6 420:mb-8';
      break;
    case types.large:
      sizeStyle = 'font-bold text-16 420:text-20 mb-6 420:mb-8';
      break;
    case types.xlarge:
      sizeStyle = 'font-bold text-20 420:text-26 mb-6 420:mb-8';
      break;
    default:
      break;
  }

  return `${baseStyle} ${sizeStyle} ${colorStyle}`;
}

export default Label;