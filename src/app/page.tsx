
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Client } from "./client";
import { Suspense } from "react";

const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "hello from client" }));
  console.log("Server component");
  return ( 
    <HydrationBoundary state={dehydrate(queryClient)}>

    <Suspense fallback={<div>Loading client...</div>}>
      <Client />
    </Suspense>

    </HydrationBoundary>
   );
}
 
export default Page;