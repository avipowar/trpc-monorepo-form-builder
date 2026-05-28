"use client";
import { api } from "~/trpc/server";
import { trpc } from "~/trpc/client";

export default function Home() {
  // const { message } = await api.chaicode.query({ email: "ashish@google.com" });
  const { data } = trpc.chaicode.useQuery({ email: "avinash@gmail.com" });

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>{data?.message}</h2>
      </div>
    </main>
  );
}
