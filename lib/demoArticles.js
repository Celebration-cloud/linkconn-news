// lib/demoArticles.js
// Demo dataset with 10 articles matching your schema

export const demoArticles = [
  {
    id: "1",
    title: "Nigeria’s Digital Economy Surges Amid Fintech Boom",
    slug: "nigeria-digital-economy-fintech-boom",
    summary:
      "A comprehensive look at how Nigeria's fintech sector is accelerating digital adoption, investments, and jobs.",
    content: `
      <p>Nigeria's digital economy is experiencing notable growth as fintech startups attract global capital and talent.</p>
      <p>Analysts say this momentum is driving <strong>financial inclusion</strong>, new jobs, and multi-sector innovation.</p>
      <h3>What’s Driving Growth?</h3>
      <ul>
        <li>Mobile-first products</li>
        <li>Regulatory sandboxes</li>
        <li>Cross-border partnerships</li>
      </ul>
      <blockquote>“We’re seeing a new generation of founders building for Africa first, and then the world.”</blockquote>
      <p>With more public-private collaboration, experts predict continued expansion over the next 3–5 years.</p>
    `,
    category: "Business",
    tags: ["Fintech", "Africa", "Startups"],
    authorId: "a1",
    authorName: "Ada N.",
    authorRole: "Editor",
    clicks: 1204,
    likes: 341,
    dislikes: 12,
    status: "published",
    isFeatured: true,
    comments: 18,
    shares: 95,
    impressions: 21567,
    cover:
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1600",
    newsSection: "Top News",
    createdAt: "2025-08-21T08:15:00.000Z",
    updatedAt: "2025-08-28T07:00:00.000Z",
  },
  {
    id: "2",
    title: "Election Reforms: What Voters Need to Know",
    slug: "election-reforms-what-voters-need-to-know",
    summary:
      "A breakdown of the latest election reform proposals and how they impact voter access and transparency.",
    content: `
      <p>Proposed reforms aim to streamline voter registration and strengthen audit trails.</p>
      <p>Key provisions include <em>digital registries</em> and improved polling logistics.</p>
      <p>Watchdogs say transparency will be critical for public trust.</p>
    `,
    category: "Politics",
    tags: ["Elections", "Policy"],
    authorId: "a2",
    authorName: "John D.",
    authorRole: "Writer",
    clicks: 987,
    likes: 211,
    dislikes: 7,
    status: "published",
    isFeatured: false,
    comments: 9,
    shares: 61,
    impressions: 15440,
    cover:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981d?q=80&w=1600",
    newsSection: "World News",
    createdAt: "2025-08-20T10:30:00.000Z",
    updatedAt: "2025-08-28T06:20:00.000Z",
  },
  {
    id: "3",
    title: "Premier League: Title Race Heats Up",
    slug: "premier-league-title-race-heats-up",
    summary:
      "The league narrows to a three-team sprint as tactical tweaks and depth prove decisive.",
    content: `
      <p>Managers emphasized <strong>rotation</strong> and <strong>press-resistance</strong> to survive a congested schedule.</p>
      <p>Analysts cite set-piece efficiency as a quiet differentiator.</p>
    `,
    category: "Sports",
    tags: ["Football", "Analysis"],
    authorId: "a3",
    authorName: "Kemi S.",
    authorRole: "Analyst",
    clicks: 2044,
    likes: 580,
    dislikes: 22,
    status: "published",
    isFeatured: true,
    comments: 34,
    shares: 140,
    impressions: 33210,
    cover:
      "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1600",
    newsSection: "Sports",
    createdAt: "2025-08-18T12:00:00.000Z",
    updatedAt: "2025-08-28T05:45:00.000Z",
  },
  {
    id: "4",
    title: "AI in Healthcare: Hospitals Pilot Diagnostic Models",
    slug: "ai-healthcare-hospitals-pilot-diagnostics",
    summary:
      "Early pilots show promise in triage, radiology assistance, and clinical decision support.",
    content: `
      <p>AI-assisted diagnostics are helping hospitals reduce turnaround times.</p>
      <p>Experts stress the importance of <em>human-in-the-loop</em> oversight and rigorous validation.</p>
    `,
    category: "Technology",
    tags: ["AI", "Healthcare"],
    authorId: "a4",
    authorName: "Lola M.",
    authorRole: "Reporter",
    clicks: 1322,
    likes: 410,
    dislikes: 10,
    status: "published",
    isFeatured: false,
    comments: 21,
    shares: 77,
    impressions: 20110,
    cover:
      "https://images.unsplash.com/photo-1581091014534-6df3c8c9b6cc?q=80&w=1600",
    newsSection: "Technology",
    createdAt: "2025-08-17T09:22:00.000Z",
    updatedAt: "2025-08-27T18:00:00.000Z",
  },
  {
    id: "5",
    title: "Nollywood Box Office Sets New Record",
    slug: "nollywood-box-office-sets-new-record",
    summary:
      "A strong slate of releases and streaming partnerships pushed Nollywood to new heights.",
    content: `
      <p>Producers credit diversified revenue models and improved marketing.</p>
      <p>Critics say quality and storytelling are on the rise.</p>
    `,
    category: "Entertainment",
    tags: ["Film", "Nigeria"],
    authorId: "a5",
    authorName: "Chisom U.",
    authorRole: "Critic",
    clicks: 1660,
    likes: 510,
    dislikes: 16,
    status: "published",
    isFeatured: false,
    comments: 27,
    shares: 102,
    impressions: 25400,
    cover:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1600",
    newsSection: "Entertainment",
    createdAt: "2025-08-16T11:05:00.000Z",
    updatedAt: "2025-08-27T15:20:00.000Z",
  },
  {
    id: "6",
    title: "University Admissions: New Funding Model Proposed",
    slug: "university-admissions-new-funding-model",
    summary:
      "A policy paper outlines performance-linked grants and student support to widen access.",
    content: `
      <p>Education stakeholders welcomed proposals but called for careful implementation.</p>
    `,
    category: "Education",
    tags: ["Policy", "Universities"],
    authorId: "a6",
    authorName: "Musa A.",
    authorRole: "Reporter",
    clicks: 740,
    likes: 190,
    dislikes: 5,
    status: "published",
    isFeatured: false,
    comments: 12,
    shares: 40,
    impressions: 12040,
    cover:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600",
    newsSection: "Education",
    createdAt: "2025-08-15T08:00:00.000Z",
    updatedAt: "2025-08-27T10:15:00.000Z",
  },
  {
    id: "7",
    title: "Opinion: The Future of Work Is Borderless",
    slug: "opinion-future-of-work-borderless",
    summary:
      "Remote collaboration and digital tools are reshaping talent markets—and policy must keep up.",
    content: `
      <p>Hybrid models are here to stay, but infrastructure and labor rules must adapt.</p>
      <p><em>Opinion pieces reflect the author's views, not necessarily Linkcon News.</em></p>
    `,
    category: "Opinion",
    tags: ["Future of Work", "Remote"],
    authorId: "a7",
    authorName: "Editorial Board",
    authorRole: "Editorial",
    clicks: 520,
    likes: 160,
    dislikes: 25,
    status: "published",
    isFeatured: false,
    comments: 33,
    shares: 64,
    impressions: 9800,
    cover:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600",
    newsSection: "Opinion",
    createdAt: "2025-08-14T07:42:00.000Z",
    updatedAt: "2025-08-27T09:40:00.000Z",
  },
  {
    id: "8",
    title: "Public Health: Local Clinics Expand Telemedicine",
    slug: "public-health-clinics-expand-telemedicine",
    summary:
      "Telemedicine pilots improve access in underserved regions, reducing travel time and costs.",
    content: `
      <p>Clinicians reported higher follow-up adherence and patient satisfaction.</p>
    `,
    category: "Health",
    tags: ["Telemedicine", "Access"],
    authorId: "a8",
    authorName: "Ngozi E.",
    authorRole: "Reporter",
    clicks: 910,
    likes: 245,
    dislikes: 9,
    status: "published",
    isFeatured: false,
    comments: 15,
    shares: 55,
    impressions: 14330,
    cover:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600",
    newsSection: "Health",
    createdAt: "2025-08-13T06:11:00.000Z",
    updatedAt: "2025-08-26T20:00:00.000Z",
  },
  {
    id: "9",
    title: "Global Markets: Oil Prices Stabilize After Spike",
    slug: "global-markets-oil-prices-stabilize",
    summary:
      "After a volatile week, oil prices show signs of stabilization as supply forecasts improve.",
    content: `
      <p>Traders are watching inventory data and OPEC commentary for direction.</p>
    `,
    category: "Business",
    tags: ["Markets", "Commodities"],
    authorId: "a9",
    authorName: "Peter O.",
    authorRole: "Analyst",
    clicks: 1100,
    likes: 300,
    dislikes: 13,
    status: "published",
    isFeatured: false,
    comments: 19,
    shares: 70,
    impressions: 20020,
    cover:
      "https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=1600",
    newsSection: "Business",
    createdAt: "2025-08-12T08:55:00.000Z",
    updatedAt: "2025-08-26T17:30:00.000Z",
  },
  {
    id: "10",
    title: "Tech Policy: Data Protection Guidelines Updated",
    slug: "tech-policy-data-protection-guidelines-updated",
    summary:
      "New guidance clarifies consent, retention, and cross-border transfers for digital services.",
    content: `
     <p>1. Introduction: The Role of NNPC and IOCs in Nigeria's Oil Sector</p><p>Recently, there has been a trend in which the National Assembly has been summoning officials from the Nigerian National Petroleum Corporation (NNPC) and International Oil Companies (IOCs) for what the Minister of State for Petroleum Resources, Timipre Sylva, describes as 'frivolous' reasons. This practice not only disrupts the operations of these key players in the oil and gas industry but also hinders progress in the sector as a whole. In a recent statement, Minister Sylva urged lawmakers to refrain from unnecessary summoning of these officials and instead focus on constructive dialogue and collaboration to address pressing issues. Read on to learn more about this important development in the Nigerian energy sector.</p><p><br></p><p>The Minister of State for Petroleum Resources (Oil), Sen. Heineken Lokpobiri,</p><p><br></p><p>2. Overview of Recent Tensions Between NASS and NNPC/Iocs</p><p>The recent tensions between the National Assembly and key players in the oil and gas industry, particularly the NNPC and IOCs, have raised concerns about the impact on Nigeria's energy sector. While oversight is crucial, the frequent summoning of officials for trivial matters can hamper productivity and divert attention from critical initiatives. It is imperative for both parties to find a balanced approach that ensures accountability without disrupting the operations vital to the nation's economic growth. In the upcoming section, we will delve deeper into the implications of these tensions and explore potential solutions to foster a more cooperative relationship for the benefit of Nigeria's energy sector.</p><p><br></p><p>3. The Minister's Stance on ‘Frivolous’ Summons to IOCs</p><p>The plea from the Minister to the National Assembly regarding the summoning of IOCs and NNPC for 'frivolous' reasons sheds light on the importance of maintaining a constructive working relationship in the energy sector. It is essential for both entities to prioritize effective communication and collaboration to ensure that oversight is meaningful and not disruptive. By heeding the Minister's advice and focusing on substantive issues during summonses, Nigeria can foster a conducive environment for growth and development in the oil and gas industry. In the following section, we will examine strategies to enhance accountability while promoting a harmonious partnership between the National Assembly and key industry stakeholders.</p><p><br></p><p>4. Implications of Unnecessary Summons on Industry Relations</p><p>Summoning IOCs and NNPC for 'frivolous' reasons not only disrupts their operational efficiency but also strains the delicate balance of relationships within the energy sector. Such actions can lead to decreased investor confidence, hampered project timelines, and a general atmosphere of uncertainty. Stakeholders must understand that frivolous summonses do not serve the industry's best interests but instead create roadblocks to progress. In the upcoming section, we will delve into the potential repercussions of unwarranted summoning on investment prospects and explore ways to mitigate these risks for the overall benefit of Nigeria's energy landscape.</p><p><br></p><p>5. Best Practices for Constructive Engagement Between NASS and IOCs</p><p>To foster a conducive and productive relationship between the National Assembly and IOCs, it is imperative to establish clear communication channels and adhere to a structured engagement framework. NASS should prioritize engagements based on substantial matters that genuinely require the attention of IOCs and NNPC. This strategic approach will not only uphold operational efficiency but also bolster investor confidence in Nigeria's energy sector. By promoting transparency, accountability, and mutual respect, both parties can work collaboratively towards achieving sustainable development goals while respecting each other's roles and responsibilities within the industry.</p><p><br></p><p>6. Case Study: Previous Instances of Summoning IOCs and Their Outcomes</p><p>Examining past instances where IOCs were summoned by the National Assembly can provide valuable insights into the impact of such actions. By analyzing the outcomes and consequences of these summonses, we can better understand the effectiveness and implications of summoning IOCs for various reasons. This case study approach will enable stakeholders to evaluate the necessity and benefits of summoning IOCs and NNPC and determine best practices for enhancing communication and collaboration between all parties involved. Stay tuned for detailed analysis and key takeaways from these case studies in our upcoming blog posts.</p>
    `,
    category: "Technology",
    tags: ["Privacy", "Policy"],
    authorId: "a10",
    authorName: "Salma R.",
    authorRole: "Reporter",
    clicks: 620,
    likes: 172,
    dislikes: 6,
    status: "published",
    isFeatured: false,
    comments: 8,
    shares: 32,
    impressions: 10550,
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600",
    newsSection: "Technology",
    createdAt: "2025-08-11T09:31:00.000Z",
    updatedAt: "2025-08-26T09:05:00.000Z",
  },
];

// Helpers
export function getArticleBySlug(slug) {
  return demoArticles.find((a) => a.id === slug);
}

export function getRelatedByCategory(category, currentSlug, limit = 4) {
  return demoArticles
    .filter((a) => a.category === category && a.id !== currentSlug)
    .slice(0, limit);
}
