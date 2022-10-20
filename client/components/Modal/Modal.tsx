import React from "react";
import styles from "./modal.module.scss";
export default function Modal({
  message,
  inputs,
  buttons,
  className,
  onChange,
}) {
  function handleSubmit() {
    console.log("submit");
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <h1>Modal</h1>
      {message}
      <div>
        {inputs?.map((input, index) => {
          return (
            <form key={index}>
              <input
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={onChange}
              />
            </form>
          );
        })}
        {buttons?.map((button, index) => {
          return (
            <button key={index} onClick={button.onClick}>
              {button.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
