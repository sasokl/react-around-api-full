function Form({name, submitButtonText, onSubmit, isThemeDark = false, className = '', submitButtonClassName = '', children}) {
  return (
    <form
      className={`form ${className}`}
      action="#"
      name={`${name}-form`}>
      <fieldset className="form__fieldset">
        {children}
        <button
          onClick={onSubmit}
          className={`submit-button${submitButtonClassName === '' ? '' : ` ${submitButtonClassName}`} ${isThemeDark ? ' submit-button_theme_dark' : ''}`}
          type="submit">
          {submitButtonText}
        </button>
      </fieldset>
    </form>
  );
}

export default Form;