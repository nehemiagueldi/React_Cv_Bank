const ButtonAction = ({ customCSS, handleClick, icon: Icon, label}) => {
  return (
    <button className={`btn ${customCSS}`} type="button" onClick={handleClick}>
      {label && <span>Add</span>}
      {Icon && <Icon className="fs-5" />}
    </button>
  );
};

export default ButtonAction;
