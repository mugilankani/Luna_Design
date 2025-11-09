"use client";

import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [value, setValue] = useState("");
  const trpc  = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("background started!");
    }
  }));
  return ( 
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
      <button disabled={invoke.isPending} className="bg-black text-white px-4 py-2 rounded" onClick={() => invoke.mutate({ value: value })}>
        Invoke Inngest
      </button>
    </div>
   );
}
 
export default Page;