import { signInUserWithEmailAndPasswordInput } from "@repo/services/user/model";
import { userService } from "../../services/index";
import { authenticatedProcedure, publicProcedure, router } from "../../trpc";
import { getAuthenticationCookie, setAuthenticationCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  getLoggedInUserInfoInputModel,
  getLoggedInUserInfoOutputModel,
  signInUserWithEmailAndPasswordInputModel,
  signInUserWithEmailAndPasswordOutputModel,
  updateUserInputModel,
  updateUserOutputModel,
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
    .mutation(async ({ input, ctx }) => {
      const { fullName, password, email } = input;

      const { id, token } = await userService.createUserWitEmailAndPassword({
        fullName,
        password,
        email,
      });

      setAuthenticationCookie(ctx, token);

      return {
        id,
      };
    }),

  signInUserWithEmailPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/signInUserWithEmailAndPassword"),
        tags: TAGS,
      },
    })
    .input(signInUserWithEmailAndPasswordInputModel)
    .output(signInUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const { id, token } = await userService.signInUserWithEmailAndPassword({ email, password });

      setAuthenticationCookie(ctx, token);

      return {
        id,
      };
    }),

  getLoggedInUserInfo: authenticatedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/getLoggedInUserInfo"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(getLoggedInUserInfoInputModel)
    .output(getLoggedInUserInfoOutputModel)
    .query(async ({ ctx }) => {
      const { id, email, fullName, profileImageUrl } = await userService.getUserInfoById(
        ctx?.user.id,
      );

      return {
        id,
        email,
        fullName,
        profileImageUrl,
      };
    }),

  updateUser: authenticatedProcedure
    .meta({
      openapi: {
        method: "PATCH",
        path: getPath("/updateUser"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(updateUserInputModel)
    .output(updateUserOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { id, fullName, email } = await userService.updateUser(ctx?.user.id, input);

      return {
        id,
        fullName,
        email,
      };
    }),
});
