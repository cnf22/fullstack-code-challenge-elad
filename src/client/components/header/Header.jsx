import styles from "./header.module.scss";

function Header() {
  return (
    <header className="w-full flex flex-row justify-center items-center shadow-sm shadow-black py-2">
      <img src="/tomorrow.svg" alt="tomorrow.io logo" className="h-8 w-auto" />
      <span className="text-black font-semibold">Tomorrow.io </span>
    </header>
  );
}

export { Header };
