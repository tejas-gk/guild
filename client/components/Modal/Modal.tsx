import React from "react";
import styles from "./modal.module.scss";
export default function Modal({
  message,
  inputs,
  buttons,
  className,
  onChange,
  onSubmit,
}) {
  function handleSubmit() {
    console.log("submit");
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <h1>Modal</h1>
      {message}
      <div>
        {inputs?.map((input:any, index:number) => {
          return (
            <form key={index} onSubmit={onSubmit} method="Post">
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
            <button key={index} onClick={button.onClick} type="submit">
              {button.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
