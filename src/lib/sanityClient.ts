import { createClient } from "@sanity/client";

export const hasSanityConfig = Boolean(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET);

export const sanityClient = hasSanityConfig
  ? createClient({
      projectId: process.env.SANITY_PROJECT_ID!,
      dataset: process.env.SANITY_DATASET!,
      apiVersion: process.env.SANITY_API_VERSION || "2023-10-01",
      useCdn: true,
      token: process.env.SANITY_READ_TOKEN,
    })
  : {
      fetch: async () => {
        throw new Error("Sanity not configured");
      },
    } as unknown as ReturnType<typeof createClient>;
