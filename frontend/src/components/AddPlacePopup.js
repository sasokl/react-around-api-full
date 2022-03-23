import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import {useEffect, useState} from "react";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const submitButtonDefaultText = 'Create';
  const submittingText = 'Creating...';
  const [submitButtonText, setSubmitButtonText] = useState(submitButtonDefaultText);

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitButtonText(submittingText);
    onAddPlace({
      name,
      link
    })
      .then(() => {
        onClose();
        setSubmitButtonText(submitButtonDefaultText)
      })
      .catch((err) => {
        console.log(err)
      });

  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      popupType="add-card"
      popupTitle="New place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}>
      <Input
        type="text"
        name="card-title"
        value={name}
        handleChange={handleNameChange}
        placeholder="Title"
        minLength="1"
        maxLength="30"
        isRequired={true}/>
      <Input
        type="url"
        name="card-image-link"
        value={link}
        handleChange={handleLinkChange}
        placeholder="Image link"
        isRequired={true}/>
    </PopupWithForm>
  );
}

export default AddPlacePopup;