import { redirect } from "next/navigation";

export default async function SectionRedirect({ params }) {
  const { section } = await params;

  // Redirect to the main section route
  redirect(`/${section}`);
}
