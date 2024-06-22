import { auth, signIn, signOut } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
  }

  return (
    <SessionProvider basePath={"/auth"} session={session}>
      <main>
        {!session ? (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button>Sign in with Google</button>
          </form>
        ) : (
          <>
            <Image
              alt="ユーザーアイコン"
              src={session?.user?.image ?? ""}
              width={24}
              height={24}
            />
            <br />
            name: {session?.user?.name}
            <br />
            email: {session?.user?.email}
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
              className="w-full"
            >
              <button>Sign Out</button>
            </form>
          </>
        )}
      </main>
    </SessionProvider>
  );
}
