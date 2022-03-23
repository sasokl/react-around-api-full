function Input({type, name, value, handleChange, placeholder, minLength = 0, maxLength = 1024, isRequired = false, isThemeDark = false}) {
  return (
    <label className="label">
      <input
        type={type}
        name={name}
        id={`${name}-input`}
        className={`input${isThemeDark ? ' input_theme_dark' : ''}`}
        value={value || ''}
        onChange={handleChange}
        minLength={minLength}
        maxLength={maxLength}
        required={isRequired}
        placeholder={placeholder}
      />
      <span className={`input-error ${name}-input-error`}/>
    </label>
  );
}

export default Input;