import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import {useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const submitButtonDefaultText = 'Save';
  const submittingText = 'Saving...';
  const [submitButtonText, setSubmitButtonText] = useState(submitButtonDefaultText);

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitButtonText(submittingText);
    onUpdateUser({
      name,
      about: description,
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
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      popupType="profile"
      popupTitle="Edit profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText={submitButtonText}>
      <Input
        type="text"
        name="name"
        value={name}
        handleChange={handleNameChange}
        placeholder="Name"
        minLength="2"
        maxLength="40"
        isRequired={true}/>
      <Input
        type="text"
        name="about"
        value={description}
        handleChange={handleDescriptionChange}
        placeholder="About me"
        minLength="2"
        maxLength="200"
        isRequired={true}/>
    </PopupWithForm>
  );
}

export default EditProfilePopup;