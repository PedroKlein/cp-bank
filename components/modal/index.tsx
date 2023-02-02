import React, { useEffect, useRef } from "react";

const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400;

type Props = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ children, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function closeOnESC(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", closeOnESC);
    return () => {
      document.removeEventListener("keydown", closeOnESC);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!modalRef) return;
    if (isOpen) {
      if (isScrollbarVisible()) {
        document.documentElement.style.setProperty(
          "--scrollbar-width",
          `${getScrollbarWidth()}px`
        );
      }
      document.documentElement.classList.add(isOpenClass, openingClass);
      setTimeout(() => {
        document.documentElement.classList.remove(openingClass);
      }, animationDuration);
      modalRef.current.setAttribute("open", "true");
    }
  }, [isOpen, modalRef]);

  function closeModal() {
    document.documentElement.classList.add(closingClass);
    setTimeout(() => {
      document.documentElement.classList.remove(closingClass, isOpenClass);
      document.documentElement.style.removeProperty("--scrollbar-width");
      modalRef.current.removeAttribute("open");
      onClose();
    }, animationDuration);
  }

  function getScrollbarWidth() {
    // Creating invisible container
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.overflow = "scroll";
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement("div");
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
  }

  function isScrollbarVisible() {
    return document.body.scrollHeight > screen.height;
  }

  return (
    <dialog id="modal-example" ref={modalRef} onClick={closeModal}>
      <article onClick={(e) => e.stopPropagation()}>
        <a
          href="#close"
          aria-label="Close"
          className="close"
          onClick={closeModal}
        ></a>
        <h3>Confirm your action!</h3>
        <p>
          Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue
          finibus pellentesque. Nullam finibus risus non semper euismod.
        </p>
        <footer>
          <a
            href="#cancel"
            role="button"
            className="secondary"
            onClick={closeModal}
          >
            Cancel
          </a>
          <a href="#confirm" role="button" onClick={closeModal}>
            Confirm
          </a>
        </footer>
      </article>
    </dialog>
  );
};

export default Modal;
