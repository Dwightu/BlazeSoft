"use client";

import { useEffect, type ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css";


interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              <span>
                <span>Done by Dwight Yu </span>
                <a className="link" href="https://www.linkedin.com/in/dwight-yu-3a7062227/" target="_blank" rel="noopener noreferrer">Linkedin</a>
              </span>
            </footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
