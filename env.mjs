import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    // Mandatory environment variables
    APP_ID: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string().url(),
    WEBHOOK_SECRET: z.string(),
    PRIVATE_KEY: z.string(),

    // Optional environment variables
    LOG_LEVEL: z.string().optional().default('debug'),
    NODE_ENV: z.string().optional().default('development'),
    PUBLIC_ORG: z.string().optional(),
    PRIVATE_ORG: z.string().optional(),
    // Custom validation for a comma separated list of strings
    // ex: ajhenry,github,ahpook
    ALLOWED_HANDLES: z
      .string()
      .optional()
      .default('')
      .refine((val) => {
        if (val === '') return true
        return val.split(',').every((handle) => handle.trim().length > 0)
      }, 'Invalid comma separated list of GitHub handles'),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {},
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    APP_ID: process.env.APP_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    LOG_LEVEL: process.env.LOG_LEVEL,
    NODE_ENV: process.env.NODE_ENV,
    PUBLIC_ORG: process.env.PUBLIC_ORG,
    PRIVATE_ORG: process.env.PRIVATE_ORG,
    ALLOWED_HANDLES: process.env.ALLOWED_HANDLES,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATIONS === 'true',
})
