
export const metadata = {
 title: 'Nome da página',
 description: 'Descrição da página'
}

export default function dashboard({children}) {
  const dashboard = [
    {title: "Published", count: 10, icon: "pi pi-check-circle"},
    {title: "Liked", count: 5, icon: "pi pi-heart"},
    {title: "Followers", count: 100, icon: "pi pi-users"},
    {title: "Comments", count: 20, icon: "pi pi-comments"},
    {title: "Shares", count: 15, icon: "pi pi-share-alt"},
  ]
 return (
   <div className="h-screen overflow-y-scroll scrollbar-hide min-w-[1024px] pr-5">
     <div className="flex items-center justify-around mb-6 gap-5 bg-gray-100 px-10 py-5 rounded-sm shadow-md dark:bg-gray-800 ">
       {dashboard.map((item, index) => (
         <div key={index} className="flex items-center gap-4 mb-4">
           <i className={item.icon + " text-2xl"}></i>
           <div>
             <h3 className="text-lg font-semibold">{item.title}</h3>
             <p className="text-sm text-gray-500">{item.count}</p>
           </div>
         </div>
       ))}
     </div>
     <div className="bg-slate-100 dark:bg-slate-800">
       <h3 className="text-2xl text-center">Welcome</h3>
       <article>
        
       </article>
     </div>
   </div>
 );
}