import classes from './Input.module.css';

const input = (props) => {
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.htmlForLabel}>{props.label}</label>
      <input
        type={props.inputType}
        id={props.id}
        value={props.value}
        onChange={props.onChangeInput}
        onBlur={props.onBlurInput}
      />
    </div>
  );
};

export default input;
