import React, { type ReactNode } from "react";
import Head from "next/head";
import { Montserrat } from "next/font/google";
import styles from "./layout.module.css";
import { useRouter } from "next/router";
import { Button, Text } from "@radix-ui/themes";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import PageTransition from "./PageTransition";

type LayoutProps = {
  showHeader?: boolean;
  children: ReactNode;
};

type LayoutRef = React.ForwardedRef<HTMLDivElement>;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-montserrat",
});

const Layout = ({ showHeader, children }: LayoutProps, ref: LayoutRef) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Environment Manager</title>
        <meta name="description" content="Environment Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showHeader && (
        <header className=" fixed top-0 flex h-16 w-full items-center justify-between px-8">
          <Button
            color="orange"
            variant="surface"
            onClick={() => router.back()}
            size="3"
          >
            <ArrowLeftIcon />
            Back
          </Button>
          <div id="searchPortal" className=" w-96" />
        </header>
      )}
      <PageTransition ref={ref}>
        <main
          className={`${montserrat.variable} ${showHeader ? "mt-20" : ""} `}
        >
          <div className={`${styles.text} mx-24`}>{children}</div>
        </main>
      </PageTransition>

      <footer className="mb-4 flex h-16 w-full grow flex-col items-center justify-end">
        <Text className="bottom-0 flex h-16 items-center justify-center">
          <span className="text-sm text-gray-400">
            🚀 Created by Leon Bechhaus, 2023 🚀
          </span>
        </Text>
      </footer>
    </>
  );
};

export default Layout;
