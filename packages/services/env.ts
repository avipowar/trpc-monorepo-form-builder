import { z } from "zod";

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_OAUTH_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string().optional(),
  GOOGLE_OAUTH_REDIRECT_URI: z.string(),
});

type ServiceEnv = z.infer<typeof envSchema> & {
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_OAUTH_CLIENT_ID: string;
  GOOGLE_OAUTH_CLIENT_SECRET: string;
};

function createEnv(env: NodeJS.ProcessEnv): ServiceEnv {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);

  const googleClientId =
    safeParseResult.data.GOOGLE_CLIENT_ID ?? safeParseResult.data.GOOGLE_OAUTH_CLIENT_ID;
  const googleClientSecret =
    safeParseResult.data.GOOGLE_CLIENT_SECRET ?? safeParseResult.data.GOOGLE_OAUTH_CLIENT_SECRET;

  if (!googleClientId || !googleClientSecret) {
    throw new Error(
      "Missing Google OAuth client config. Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET or GOOGLE_OAUTH_CLIENT_ID/GOOGLE_OAUTH_CLIENT_SECRET.",
    );
  }

  return {
    ...safeParseResult.data,
    GOOGLE_CLIENT_ID: googleClientId,
    GOOGLE_OAUTH_CLIENT_ID: googleClientId,
    GOOGLE_CLIENT_SECRET: googleClientSecret,
    GOOGLE_OAUTH_CLIENT_SECRET: googleClientSecret,
  };
}

export const env = createEnv(process.env);
