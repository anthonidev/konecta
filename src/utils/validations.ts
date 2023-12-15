const validateEmail = (value: string) =>
  value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);


const onlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const isCtrlKeyPressed = e.ctrlKey || e.metaKey;
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Tab" &&
    !(isCtrlKeyPressed && (e.key === "x" || e.key === "c" || e.key === "v"))
  ) {
    e.preventDefault();
  }
};

const onlyLetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (
    (!/[a-zA-Z]/.test(e.key) &&
      e.key !== "Backspace" &&
      e.key !== "Tab" &&
      e.key !== " ") ||
    (e.key === "." && e.currentTarget.value === "") ||
    (e.key === "." && e.currentTarget.value.includes("."))
  ) {
    e.preventDefault();
  }
};

export { validateEmail,  onlyNumber, onlyLetter };
