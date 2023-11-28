import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Layout from "~/components/Layout";

import { Card, Flex, Box, Text, Grid, IconButton } from "@radix-ui/themes";
import { api } from "~/utils/api";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <Layout>
      <h1 className="my-10 text-5xl font-extrabold tracking-tight">
        nrEnvManager
      </h1>
      <Grid columns="2" gap="4" align="start">
        <Link href="/modules">
          <Card size="3">
            <Flex>
              <Flex gap="4" align="center" grow="1">
                <Box>
                  <Text as="div" weight="bold">
                    Manage Modules
                  </Text>
                  <Text as="div" color="gray">
                    Edit module informations
                  </Text>
                </Box>
              </Flex>
              <Flex align="center" justify="end">
                <IconButton size="2" variant="ghost">
                  <ArrowRightIcon height="24" width="24" />
                </IconButton>
              </Flex>
            </Flex>
          </Card>
        </Link>

        <Link href="/projects">
          <Card size="3">
            <Flex>
              <Flex gap="4" align="center" grow="1">
                <Box>
                  <Text as="div" weight="bold">
                    Manage Projects
                  </Text>
                  <Text as="div" color="gray">
                    Edit project informations
                  </Text>
                </Box>
              </Flex>
              <Flex align="center" justify="end">
                <IconButton size="2" variant="ghost">
                  <ArrowRightIcon height="24" width="24" />
                </IconButton>
              </Flex>
            </Flex>
          </Card>
        </Link>
      </Grid>
    </Layout>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.modules.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
