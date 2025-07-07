import DashboardCreate from "@/components/dashboard/dashboard-create";

export const metadata = {
 title: 'Nome da página',
 description: 'Descrição da página'
}

export default function create() {
 return (
   <div className="mb-10 ">
    <DashboardCreate />
   </div>
 );
}