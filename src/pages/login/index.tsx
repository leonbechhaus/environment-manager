// app/components/LoginForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import z from "zod";
import Layout from "~/components/Layout";
import {
  Flex,
  Card,
  Button,
  TextField,
  Separator,
  Callout,
  Text,
  Heading,
} from "@radix-ui/themes";
import {
  PersonIcon,
  LockClosedIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type FormData = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  name: z.string(),
  password: z.string().min(8),
});

export type User = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    void router.replace("/");
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid, dirtyFields },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/modules";

  async function onSubmit(data: FormData) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        name: data.name,
        password: data.password,
        callbackUrl,
      });
      if (res?.error) {
        setError(res?.error);
      } else {
        await router.push(callbackUrl);
      }
    } catch (error: unknown) {
      setError(error as string);
    }
  }

  return (
    <Layout>
      {sessionData && !sessionData.user && (
        <Flex align="center" justify="center" className="py-32">
          {/* Form Header */}
          <Card size="5" className="max-w-[600px] flex-1">
            {/* Form Body */}
            <Heading size="7" className="text-2xl font-semibold">
              Welcome back!
            </Heading>
            <form
              className="mt-12"
              action=""
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="flex text-xs text-gray-200/70">Username</label>
              <TextField.Root>
                <TextField.Input
                  {...register("name", { required: true })}
                  id="name"
                  size="3"
                  placeholder="Username... "
                  width={"100%"}
                />
                <TextField.Slot pr="3">
                  <PersonIcon
                    height="16"
                    width="16"
                    color={`${
                      !errors?.name && dirtyFields?.name
                        ? "cyan"
                        : "currentColor"
                    }`}
                  />
                </TextField.Slot>
              </TextField.Root>
              {errors?.name && (
                <p className="text-sm text-red-600">{errors?.name?.message}</p>
              )}

              <div className="mb-4" />
              <label className="flex text-xs text-gray-200/70">Password</label>
              <TextField.Root>
                <TextField.Input
                  {...register("password", { required: true })}
                  id="password"
                  type="password"
                  size="3"
                  placeholder="Enter password... "
                  width={"100%"}
                />
                <TextField.Slot pr="3">
                  <LockClosedIcon
                    height="16"
                    width="16"
                    color={`${
                      !errors?.password && dirtyFields?.password
                        ? "cyan"
                        : "currentColor"
                    }`}
                  />
                </TextField.Slot>
              </TextField.Root>

              {errors?.password && (
                <Text className="text-sm text-red-600">
                  {errors?.password?.message}
                </Text>
              )}

              <Separator my="4" size="4" />

              {error && (
                <Callout.Root className="mb-4" color="red">
                  <Callout.Icon>
                    <CrossCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
              )}

              <Button
                type="submit"
                size="2"
                color="cyan"
                variant="surface"
                className="w-full"
                disabled={!isDirty || !isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="mr-2 inline h-6 w-6 animate-spin fill-rose-600 text-white opacity-100"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Card>
        </Flex>
      )}
    </Layout>
  );
}
