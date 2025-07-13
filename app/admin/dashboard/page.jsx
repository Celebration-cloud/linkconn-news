
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
       <desc>
         Farman Project Roadmap Document Product Summary Farman is a SAAS
         ecommerce platform designed to empower Agro business vendors in Nigeria
         to easily manage their businesses professionally using their custom
         domains or our subdomain. Additionally, Farman also provides a unified
         general marketplace where all vendor stores are discoverable to enable
         broader customer reach and product visibility. We aim to address the
         growing need for the digital presence of agro SME business vendors
         within the agricultural sector. Motto: Farman…. the one market for all
         Agro business. Product roles & functionality Agro Business vendors
         Role: These are small scale agro businesses who are interested in
         upgrading their business using our Agro-marketplace & the E-commerce
         website platform we offer for their inventory,order taking, sales &
         payment. Customer: These are random individuals who make purchases of
         their agro products online. These product can include food item, Super
         Admin: This is for farman to be able to view/moderate/edit/delete
         vendor & customer activities via a robust dashboard. Key MVP Features ●
         Agro business store ● Agro market place ● Product listing ● Inventory &
         Order management ● Payment (Wallet) MVP focus: Agro vendor business
         store, Agro marketplace, Customer role and Admin role MVP Development
         Timeline: 2-3 months Date: June - September Sloth time : 1 week Week 1
         JTBD: Authentication, onboarding, farman landing page (Waitlist) This
         includes: the authentication flow for vendors (sign up, onboard, kyc
         verify business & login), for customers (signup & login) and for Admin
         (sign up & Sign in). Change the previous waitlist to fit for
         Agro-vendors with countdown to September 5 as Launch Date.
         Deliverables: UI/UX Team - Iterate the previous UI pages to fit for all
         roles (website vendor, customer vendor & Admin) Backend Team - Iterate
         the previous APIs and create new endpoints to function Frontend Team -
         Fetch, Consume the ApIs and make the UI pages fully responsive Social
         Media Team - Share content across socials on introducing a new product
         (product name, target audience, vision, mission, Values, agro facts,
         international days, Stakeholder Team - Meet to share team update,
         feedback & demo the work progress Week 2 JTBD: Agro business store
         customization & landing page This includes: Vendors can create stores,
         customize their website with brand color, Business name, motto,
         banners, etc and access through farman subdomain. Landing page
         (dashboard): vendors can view basic business analytics like total
         sales, total orders, total earnings, total available stock,
         Deliverables: UI/UX Team - Create all required UI pages to fit for all
         roles and prototype the flow Backend Team - Design database, build
         APIs, define endpoints and handle request Frontend Team - Fetch,
         Consume the ApIs and make the UI pages fully responsive Social Media
         Team - Share content across socials on product services, benefits and
         early vendors onboarding on waitlist Stakeholder Team - Meet to share
         team update, feedback & demo the work progress Week 3 JTBD: Product
         (listing, catalogue, filtering & search) This includes: Vendors can set
         product categories, upload product catalogue information (product
         name,categories, images, price, quantity, weight). Customer can view
         product list in catalogs, search for a product(both website &
         marketplace) Deliverables: UI/UX Team - Create all required UI pages to
         fit for all roles and prototype the flow Backend Team - Design
         database, build APIs, define endpoints and handle request Frontend Team
         - Fetch, Consume the ApIs and make the UI pages fully responsive Social
         Media Team - Share content across socials on product services, benefits
         and early vendors onboarding on waitlist Stakeholder Team - Meet to
         share team update, feedback & demo the work progress Week 4 JTBD:
         Inventory & Order management This includes: vendors can view product
         remains, out of stock, current quantity and view recent received
         orders. Customers can pick a product, add to cart, place orders and
         view order history Deliverables: UI/UX Team - Create all required UI
         pages to fit for all roles and prototype the flow Backend Team - Design
         database, build APIs, define endpoints and handle request Frontend Team
         - Fetch, Consume the ApIs and make the UI pages fully responsive Social
         Media Team - Share content across socials on product services, benefits
         and early vendors onboarding on waitlist Stakeholder Team - Meet to
         share team update, feedback & demo the work progress Week 5 JTBD:
         Notification and Rating & Review This includes: Email notifications of
         new orders or customer support for vendors, customer notification to
         receive new order email notification. For reviews and rating; customers
         can rate & view ratings of vendors from website after a transaction or
         direct from marketplace, vendors can see the customer review & ratings.
         Deliverables: UI/UX Team - Create all required UI pages to fit for all
         roles and prototype the flow Backend Team - Setup business logic, Build
         APIs, define endpoints and handle request Frontend Team - Fetch,
         Consume the ApIs and make the UI pages fully responsive Social Media
         Team - Share content across socials on product services, benefits and
         vendor onboarding on waitlist Stakeholder Team - Meet to share team
         update, feedback & demo the work progress Week 6 JTBD: Payment Wallet
         System setup This includes: Vendors can receive payment through their
         in-App wallet, set preferred payment account, view transaction &
         customer information, number of sales. status of payment. Customers can
         make payment from wallet, fund wallet, view payment history,
         Deliverables: UI/UX Team - Create all required UI pages to fit for all
         roles and prototype the flow Backend Team - set up payment system,
         build APIs, define endpoints and handle request Frontend Team - Fetch,
         Consume the ApIs and make the UI pages fully responsive Social Media
         Team - Share content across socials on product services, benefits and
         vendor onboarding on waitlist Stakeholder Team - Meet to share team
         update, feedback & demo the work progress Week 7 JTBD: Admin role This
         includes: Admin can view/moderate all vendors and customers,edit,delete
         products, view orders status, payment (wallets) information, Agro
         business analytics, view Farman revenue (Subscriptions paid, unpaid,)
         Send out email notifications (marketing, announcement purposes) to both
         vendors & customers, Deliverables: UI/UX Team - Create all required UI
         pages to fit for all roles and prototype the flow Backend Team - Design
         database, build APIs, define endpoints and handle request Frontend Team
         - Fetch, Consume the ApIs and make the UI pages fully responsive Social
         Media Team - Share content across socials on Launch hints and UI tease
         Stakeholder Team - Meet to share team update, feedback & demo the work
         progress Week 8 JTBD: Final Product Adjustments & Testing Deliverables:
         UI/UX Team - Demo full product UI design prototype and make Backend
         Team - Test APIs for functionality, scalability, adjustments and high
         inflow of users Frontend Team - Hosted to farman domain and internal
         team testing & adjustment. Social Media Team - Share content across
         socials on Pre launch countdown Stakeholder Team - Meet to share team
         update, plans & prepare for product mvp launch Team Meeting Schedule ●
         Stakeholders Meeting - Twice a week (Wednesday,Tuesday) ● Individual
         Team Meeting - Twice a week (as fit by Team lead) ● General Team
         Meeting - Once a week (Every Tuesday) Please note: This meeting
         schedule is aimed at ensuring a smooth and clear communication amongst
         all the team members therefore it comprises both virtual meeting and
         Chat meetings. Figma:
         https://www.figma.com/design/ObWMFnveGFfit5b28N8TsA/Farman?node-id=8-139&p=f&t=A5r
         ayw7JaT1UUnDc-0 GITHUB: https://github.com/organizations/FarmHub-ng
         Previous project idea for reference: https://farman.ng
       </desc>
     </div>
   </div>
 );
}