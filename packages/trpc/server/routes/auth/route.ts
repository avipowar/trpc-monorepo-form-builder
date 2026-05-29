import { userService } from "../../services/index";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
} from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");
console.log("generatePath return :", getPath);
console.log("getpath from auto generator: ", getPath("/createUserWithEmailAndPassword"));

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/createUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input }) => {
      const { fullName, password, email } = input;

      const { id } = await userService.createUserWitEmailAndPassword({
        fullName,
        password,
        email,
      });

      return {
        id,
      };
    }),
});
