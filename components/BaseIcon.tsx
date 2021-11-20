import PropTypes from "prop-types";

const BaseIcon = (props: { name: string }) => {
  const { name } = props;

  return (
    <img
      height={64}
      src={
        require(`../node_modules/cryptocurrency-icons/svg/color/${name}.svg`)
          .default.src
      }
      width={64}
    />
  );
};

BaseIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BaseIcon;
