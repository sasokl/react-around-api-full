import PopupWithForm from "./PopupWithForm";
import {useState} from "react";

function DeleteCardPopup({isOpen, onClose, cardToDelete, onDeleteCard}) {
  const submitButtonDefaultText = 'Yes';
  const submittingText = 'Deleting...';
  const [submitButtonText, setSubmitButtonText] = useState(submitButtonDefaultText);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitButtonText(submittingText);
    onDeleteCard(cardToDelete)
      .then(() => {
        onClose();
        setSubmitButtonText(submitButtonDefaultText)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  return (
    <PopupWithForm
      popupType="delete-card"
      popupTitle="Are you sure?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isThereInputs={false}
      submitButtonText={submitButtonText}/>
  );
}

export default DeleteCardPopup;