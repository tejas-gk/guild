export default function Label({ children, className = "", ...props }: any) {
  return (
    <label className={`${className} block text-gray-700`} {...props}>
      {children}
    </label>
  );
}
