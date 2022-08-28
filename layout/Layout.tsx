import { LayoutProps } from "./Layout.props";
import styles from "./Layout.module.css";
import cn from "classnames";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { Component, FunctionComponent, KeyboardEvent, useRef, useState } from "react";
import { AppContextProvider, IAppContext } from "../context/app.context";
import { Up } from "../components/index";

export const Layout = ({ children, ...props }: LayoutProps): JSX.Element => {
  const [isSkipedLinkVisible, setIsSkipedLinkVisible] = useState<boolean>(false);

  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code == "Space" || key.code == "Enter") {   
      key.preventDefault();  
      bodyRef.current.focus();
    }

    setIsSkipedLinkVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipedLinkVisible(true)}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.visible]: isSkipedLinkVisible,
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body} ref={bodyRef} tabIndex={0}> 
        {children}
      </div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
