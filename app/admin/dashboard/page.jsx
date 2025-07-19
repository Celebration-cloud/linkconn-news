import DashboardContent from "@/components/dashboard/dashboard-content";
import { createPublisher } from "@/lib/actions/publisher";

export const metadata = {
 title: 'Nome da página',
 description: 'Descrição da página'
}

export default async function  dashboard({children}) {

  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide min-w-[1024px] pr-5 py-5">
      <DashboardContent />
    </div>
  );
}