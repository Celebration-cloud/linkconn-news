import CommentsSection from '@/components/dashboard/CommentsSection';
import { Divider } from '@heroui/react';
import Image from 'next/image';

export const metadata = {
 title: 'Comments',
 description: 'Descrição da página'
}

export default function CommentsPage() {
 return (
   <div className="space-y-5">
     <h1 className="text-2xl font-bold mb-4">Comments({1})</h1>
     <Divider orientation="horizontal" className="w-full" />
     <div>
       <div className="flex items-center gap-5 px-5 py-2 bg-gray-200 dark:bg-slate-500">
         <div className="w-50 h-50 bg-blue-400">
           <Image
             src="/police.jpg"
             alt="Cover preview"
             className="w-full h-full object-cover rounded-md"
             width={100}
             height={100}
           />
         </div>
         <div>
           <h5 className="text-md font-bold text-gray-500 mt-2">
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
             eiusmod tempor incididunt ut labore et dolore magna aliqua.
           </h5>
           <p className="text-sm text-gray-400 mt-1">Feb 9, 2024</p>
         </div>
       </div>
     </div>
     <Divider orientation="horizontal" className="w-full" />
     <div className="">
       <CommentsSection />
     </div>
   </div>
 );
}