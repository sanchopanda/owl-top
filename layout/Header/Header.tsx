import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Logo from "../logo.svg";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { motion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opecity: 0,
      x: "100%",
    },
  };

  return (
    <header className={cn(className, styles.header)} {...props}>
      <Logo />
      <ButtonIcon appearence="white" icon="menu" onClick={() => setIsOpened(true)} />
      <motion.div className={styles.mobileMenu} variants={variants} initial={"clodes"} animate={isOpened ? "opened" : "closed"}>
        <Sidebar className="sidebar" />
        <ButtonIcon className={styles.menuClose} appearence="white" icon="close" onClick={() => setIsOpened(false)} />
      </motion.div>
    </header>
  );
};
