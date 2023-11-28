import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const Root: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const pageKey = router.asPath;

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Theme>
          <div className="flex min-h-screen flex-col">
            <AnimatePresence initial={false} mode="wait">
              <Component key={pageKey} {...pageProps} />
            </AnimatePresence>
          </div>
        </Theme>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(Root);
