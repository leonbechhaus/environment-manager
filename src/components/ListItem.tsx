import { type RootProject } from "~/types/projects-interface";
import { Card, Flex, Avatar, Box, Text, Button } from "@radix-ui/themes";
import { type RootModule } from "~/types/modules-interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function ListItem({
  index,
  data,
}: {
  index: number;
  data: RootProject[] | RootModule[];
}) {
  const router = useRouter();

  const getFallback = (item: RootProject | RootModule) => {
    if (item.short_name) {
      return item.short_name;
    } else if (item.project_number) {
      return item.project_number;
    } else {
      return "";
    }
  };

  return (
    <Card size="2" mb="4">
      <Link href={`${router.pathname}/${data[index]?._id}`}>
        <Flex>
          <Flex gap="4" align="center" grow="1">
            <Avatar
              size="8"
              radius="full"
              fallback={getFallback(data[index]!)}
              color="indigo"
            />
            <Box>
              <Text as="div" weight="bold">
                {data[index]?.name}
              </Text>
              <Text as="div" color="gray">
                {data[index]?.project_number}
              </Text>
            </Box>
          </Flex>
          <Flex align="center" justify="end">
            <Button color="indigo" variant="surface" size="3">
              Edit
              <ArrowRightIcon />
            </Button>
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
}
