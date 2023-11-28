import { z } from "zod";
import Project from "~/models/project.model";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(({ input }) => {
      // simulate a slow db call

      const post = { id: 1 + 1, name: input.name };
      return post;
    }),

  getData: publicProcedure.query(async () => {
    return await Project().find({}, "-__v -versions");
  }),

  getSpecificData: publicProcedure
    .input(z.string().min(1))
    .query(async ({ input }) => {
      return await Project().findById(input);
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
