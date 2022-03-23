import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({
  popupType,
  popupTitle,
  isOpen,
  onClose,
  onSubmit,
  submitButtonText,
  isThereInputs = true,
  children
}) {
  return (
    <Popup
      popupType={popupType}
      containerType="white"
      isOpen={isOpen}
      onClose={onClose}>
      <h2 className="title">{popupTitle}</h2>
      <Form
        name={popupType}
        className={`popup__form${!isThereInputs ? ' popup__form_type_delete' : ''}`}
        onSubmit={onSubmit}
        submitButtonText={submitButtonText}
        submitButtonClassName={`popup__submit-button${!isThereInputs ? ' popup__submit-button_type_delete' : ''}`}>
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;