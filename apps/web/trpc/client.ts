import { createTRPCReact } from "@trpc/react-query";
import { ServerRouter } from "@repo/trpc/client";

export const trpc = createTRPCReact<ServerRouter>();

//  createTRPCReact<ServerRouter>() => React sathi tRPC hooks banvto

//  ServerRouter => backend madhle sagle API routes
// frontend la mahit pahije backend madhe kay functions aahet

// tRPC hook => API call karto , loading manage karto, data store karto, error handle karto

// Backend router
//       ↓
// Frontend types generate
//       ↓
// Autocomplete + safety
