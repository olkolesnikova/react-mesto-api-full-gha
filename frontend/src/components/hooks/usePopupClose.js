import { useEffect } from "react";

export function usePopupClose(isOpen, closePopup) {

    useEffect(() => {

        if (!isOpen) return;

        const handleOverlay = (event) => {

            if (event.target.classList.contains("popup_opened")) {
                closePopup();
            }
        };

        const handleEscape = (event) => {

            if (event.key === 'Escape') {
                closePopup();
            }

        };

        document.addEventListener("mousedown", handleOverlay);
        document.addEventListener("keydown", handleEscape);

        return () => {

            document.removeEventListener("mousedown", handleOverlay);
            document.removeEventListener("keydown", handleEscape);

        };

    }, [isOpen, closePopup])

}