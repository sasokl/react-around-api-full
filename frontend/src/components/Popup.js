import {useEffect} from "react";

function Popup({popupType, containerType, isOpen, onClose, children}) {

  useEffect(() => {
    if (!isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [isOpen, onClose])

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }
  return (
    <div
      className={`popup popup_type_${popupType}${isOpen ? ` popup_open` : ''}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_type_${containerType}`}>
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"/>
        {children}
      </div>
    </div>
  );
}

export default Popup;