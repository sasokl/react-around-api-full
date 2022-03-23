import Popup from "./Popup";

function ImagePopup({isOpen, onClose, selectedCard}) {
  return (
    <Popup
      popupType="image-preview"
      containerType="transparent"
      isOpen={isOpen}
      onClose={onClose}>
      <figure className="popup__figure">
        <img src={selectedCard['link']} alt={selectedCard['name']} className="popup__figure-image"/>
        <figcaption className="popup__figure-caption">{selectedCard['name']}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;