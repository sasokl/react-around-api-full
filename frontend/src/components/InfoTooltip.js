import Popup from "./Popup";

function InfoTooltip({isOpen, onClose, isSuccess = true}) {
  return (
    <Popup
      popupType="image-preview"
      containerType="white"
      isOpen={isOpen}
      onClose={onClose}>
      <div
        className={`popup__result-icon ${isSuccess ? 'popup__result-icon_type_success' : 'popup__result-icon_type_fail'}`}
        title={`${isSuccess ? 'success icon' : 'failure icon'}`}/>
      <h2
        className="title title_centered">{isSuccess ? 'Success! You have now been registered.' : 'Oops, something went wrong! Please try again.'}</h2>
    </Popup>
  );
}

export default InfoTooltip;