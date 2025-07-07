import Image from "next/image";
import Link from "next/link";

export const metadata = {
 title: 'Nome da página',
 description: 'Descrição da página'
}

export default function login() {
 return (
   <div className="min-h-screen flex items-center px-4 bg-background text-foreground">
     <div className="max-w-xl w-full space-y-6 text-left">
       <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
         Create. Share.
       </h1>
       <p className="text-lg md:text-xl text-muted-foreground">
         Share your stories, opinions and life with over{" "}
         <span className="text-primary font-semibold">350 million</span> global
         active users.
       </p>

       <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
     <div className="">
       <Image
         src="/Novelist writing-rafiki.svg"
         alt="Login Hero Image"
         width={500}
         height={500}
         className=" h-auto object-cover"
         priority
         quality={100}
       />
     </div>
   </div>
 );
}