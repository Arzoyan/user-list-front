"use client";
import { useRouter } from "next/navigation";
import "./HeaderStyles.css";

const Header = () => {
  const router = useRouter();
  return (
    <header className={"header"}>
      <div>
        <img src={"/page-log.png"} alt={`page-log`} />
      </div>

      <div onClick={() => router.push("/my-profile")} className="login-user">
        <img src={"/login-user.png"} alt={`page-log`} />
      </div>
    </header>
  );
};

export default Header;
