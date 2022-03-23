import {forwardRef} from "react";

const InputRef = forwardRef(({
  type,
  name,
  defaultValue,
  placeholder,
  minLength = 0,
  maxLength = 1024,
  isRequired
}, ref) => {
  return (
    <label className="label">
      <input
        type={type}
        name={name}
        id={`${name}-input`}
        className="input"
        defaultValue={defaultValue || ''}
        ref={ref}
        minLength={minLength}
        maxLength={maxLength}
        required={isRequired}
        placeholder={placeholder}
      />
      <span className={`input-error ${name}-input-error`}/>
    </label>
  );
});

export default InputRef;