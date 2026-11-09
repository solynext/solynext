/** Editable placeholder content for the SolyNext Businesses page. */
export const businessPageData = {
  businessTypes: [
    { name: "Software and SaaS", detail: "We build and sell ready software, online tools and apps that solve real business needs.", examples: ["SaaS products", "Business software", "Mobile and web apps"] },
    { name: "Digital agencies", detail: "Our marketing, web and creative teams serve clients and can grow as their own agencies.", examples: ["Marketing", "Web and software", "Design and content"] },
    { name: "Real estate agency", detail: "We can start or run a property agency and work with people who know their local market.", examples: ["Property sales", "Rentals", "Management"] },
    { name: "Travel and transport", detail: "We can build a tour company and transport services, including taxi services in Makkah and Madinah.", examples: ["Tours", "Travel services", "Makkah and Madinah taxis"] },
    { name: "E-commerce and stores", detail: "We can own and run online stores and marketplaces, or help partner shops sell online.", examples: ["Online shops", "Marketplaces", "Local products"] },
    { name: "New and partner businesses", detail: "We can start a new company, join an existing one, or share and grow a business with its owner.", examples: ["New ideas", "Existing owners", "SolyNext partners"] },
  ],
  industries: ["Real estate", "Travel and tourism", "E-commerce", "Automobile and transport", "Marketing company", "Consultancy", "Education and digital academy", "Organic and food", "Furniture and interior", "Retail and trading"],
  formula: {
    note: "These are sample profit shares and add to 100%. Agree whether shares use revenue or profit after costs, then set payment timing and reinvestment in writing.",
    shares: [
      { role: "Idea owner", share: "20%", detail: "Brings the idea and helps shape the plan." },
      { role: "Investor", share: "30%", detail: "Funds agreed launch or growth costs." },
      { role: "SolyNext team", share: "35%", detail: "Builds and runs the business, team and systems." },
      { role: "Skilled partner", share: "15%", detail: "Adds key skills and helps deliver the work." },
    ],
    steps: ["Idea", "Feasibility study", "Agreement", "Launch", "Growth"],
  },
  runningBusinesses: [
    { name: "Example business", industry: "E-commerce & online retail", status: "Running", role: "Placeholder: SolyNext supports digital setup, marketing and daily operations.", opportunities: ["Investment", "Jobs", "Partnership"] },
    { name: "Example academy", industry: "Education & digital academy", status: "Growing", role: "Placeholder: SolyNext supports course delivery, student systems and promotion.", opportunities: ["Jobs", "Partnership"] },
    { name: "Example studio", industry: "Marketing company", status: "Running", role: "Placeholder: SolyNext supports client work, team systems and business growth.", opportunities: ["Skilled partners", "Jobs"] },
  ],
  upcomingBusinesses: [
    { name: "Property services", industry: "Real estate", plan: "Help people find, market and manage property.", market: "Growing demand for trusted local property support.", cost: "To be estimated after local research.", return: "To be estimated from the final business plan.", risk: "Medium; depends on market conditions and local rules.", timeline: "6–12 months", status: "Feasibility" },
    { name: "Travel and tours", industry: "Travel and tourism", plan: "Offer local tours, travel planning and booking support.", market: "Interest in local trips and easier booking.", cost: "To be estimated after supplier and route checks.", return: "To be estimated from bookings and season plans.", risk: "Medium; demand changes by season.", timeline: "6–9 months", status: "Planning" },
    { name: "Online marketplace", industry: "E-commerce", plan: "Connect shoppers with useful local products.", market: "More customers are buying through mobile and social channels.", cost: "To be estimated from product and delivery needs.", return: "To be estimated from sales and repeat orders.", risk: "Medium; delivery and product quality matter.", timeline: "4–8 months", status: "Ready to launch" },
    { name: "Transport services", industry: "Automobile and transport", plan: "Make vehicle services and local transport easier to find.", market: "People need trusted transport and vehicle options.", cost: "To be estimated after operating model review.", return: "To be estimated from trips and service fees.", risk: "Medium; safety and operating costs need close review.", timeline: "6–12 months", status: "Planning" },
    { name: "Growth studio", industry: "Marketing company", plan: "Help local businesses reach more customers.", market: "Many businesses need steady online support.", cost: "To be estimated from team and tools.", return: "To be estimated from client plans.", risk: "Low to medium; depends on customer growth.", timeline: "3–6 months", status: "Ready to launch" },
    { name: "Business support desk", industry: "Consultancy", plan: "Give small businesses clear advice on growth and digital work.", market: "Owners often need practical help they can use right away.", cost: "To be estimated from team needs.", return: "To be estimated from service plans.", risk: "Low to medium; trust and results drive demand.", timeline: "3–6 months", status: "Planning" },
    { name: "Digital academy", industry: "Education and digital academy", plan: "Teach useful digital and business skills through real work.", market: "Young people want skills linked to real jobs.", cost: "To be estimated from lessons, space and tools.", return: "To be estimated from course plans.", risk: "Medium; course quality and access matter.", timeline: "6–9 months", status: "Feasibility" },
    { name: "Local harvest", industry: "Organic and food", plan: "Bring trusted food and natural goods to more customers.", market: "Interest in fresh, local and traceable products.", cost: "To be estimated from sourcing and delivery.", return: "To be estimated from product mix and repeat orders.", risk: "Medium; supply, storage and food rules matter.", timeline: "6–12 months", status: "Planning" },
    { name: "Home and living", industry: "Furniture and interior", plan: "Sell useful furniture and help customers plan their spaces.", market: "Homes and small businesses need practical furniture options.", cost: "To be estimated from stock and delivery needs.", return: "To be estimated from sales and custom orders.", risk: "Medium; stock and delivery costs need review.", timeline: "6–12 months", status: "Feasibility" },
    { name: "Community market", industry: "Retail and trading", plan: "Make everyday products easy to find and buy locally.", market: "Steady need for reliable local shops and supply.", cost: "To be estimated from location, stock and systems.", return: "To be estimated from sales and supplier terms.", risk: "Medium; stock and cash flow need planning.", timeline: "6–12 months", status: "Planning" },
  ],
  opportunities: [
    { title: "Invest", text: "Help fund a business after the idea, costs and risks are reviewed. Terms are agreed in writing before launch." },
    { title: "Jobs and skills", text: "Join a team, apply your skills or learn by doing. Some roles may offer an internship or learn-and-earn path." },
    { title: "Partnership", text: "Bring an existing business, a useful idea or skills that can help a new business grow." },
  ],
} as const;
