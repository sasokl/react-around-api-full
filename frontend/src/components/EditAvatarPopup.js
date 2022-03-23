import PopupWithForm from "./PopupWithForm";
import {useEffect, useRef, useState} from "react";
import InputRef from "./InputRef";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const urlRef = useRef();

  const submitButtonDefaultText = 'Save';
  const submittingText = 'Saving...';

  const [submitButtonText, setSubmitButtonText] = useState(submitButtonDefaultText);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitButtonText(submittingText);
    onUpdateAvatar(urlRef.current['value'])
      .then(() => {
        onClose();
        setSubmitButtonText(submitButtonDefaultText)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    urlRef.current.value = "";
  },[isOpen])
  return (
    <PopupWithForm
      popupType="avatar"
      popupTitle="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}>
      <InputRef
        type="url"
        name="avatar-image-link"
        defaultValue=""
        placeholder="Image link"
        isRequired={true}
        ref={urlRef}/>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;