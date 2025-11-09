"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () => {
  const trpc  = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("background started!");
    }
  }));
  return ( 
    <div>
      <button disabled={invoke.isPending} className="bg-black text-white px-4 py-2 rounded" onClick={() => invoke.mutate({ text: "Inngest from tRPC!" })}>
        Invoke Inngest
      </button>
    </div>
   );
}
 
export default Page;