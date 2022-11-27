import styles from './input.module.css';
export default function Input({
  disabled = false,
  className = "",
  ...props
}: any) {
  return (
    <input
      disabled={disabled}
      className={`${className} ${styles.input}  outline-none border rounded border-gray-200 h-10 px-2
      dark:text-black dark:bg-gray-800 dark:border-gray-100
      `}
      {...props}
    />
  );
}
