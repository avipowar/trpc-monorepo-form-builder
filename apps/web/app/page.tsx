import { api } from "~/trpc/server";

export default async function Home() {
  const { message } = await api.chaicode.query({ email: "ashish@google.com" });
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>{message}</h2>
      </div>
    </main>
  );
}
