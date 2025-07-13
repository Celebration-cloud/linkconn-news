import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Login | Linkcon News",
  description: "Join millions sharing stories on Linkcon.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex justify-center px-4">
      <div className="w-[1024px] flex items-center justify-between py-10 px-5 gap-32">
        {/* Text Section */}
        <div className="w-full space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            Create. Share.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Share your stories, opinions and life with over{" "}
            <span className="text-primary font-semibold">350 million</span>{" "}
            global active users.
          </p>

          <div className="flex gap-4 pt-4">
            <Link
              href="/admin"
              className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition"
            >
              Sign Up
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full  flex justify-center mb-8 md:mb-0">
          <Image
            src="/Novelist writing-rafiki.svg"
            alt="Login Hero Image"
            width={500}
            height={500}
            className="h-auto object-contain max-w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
