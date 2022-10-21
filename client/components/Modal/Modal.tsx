import styles from "./modal.module.scss";
export default function Modal({
  message,
  inputs,
  buttons,
  className,
  onChange,
  submitForm
}) {
  return (
    <div className={`${styles.container} ${className}`}>
      <h1>Modal</h1>
      {message}
      <div>
        {inputs?.map((input:any, index:number) => {
          return (
            <form key={index} onSubmit={submitForm} method="POST">
              <input
                key={index}
                type={input.type}
                name={input.name}
                placeholder={input.placeholder}
                onChange={onChange}
              />
              <button type="submit">post</button>
            </form>
          );
        })}
       
      </div>
    </div>
  );
}
