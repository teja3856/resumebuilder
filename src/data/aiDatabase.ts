export interface FieldExplanation {
  fieldId: string;
  fieldName: string;
  whyItMatters: string;
  recruiterExpectations: string;
  goodExamples: string[];
  badExamples: string[];
  commonMistakes: string[];
  atsTips: string[];
}

export const SUMMARY_SUGGESTIONS: Record<string, string[]> = {
  "Student": [
    "Ambitious Computer Science undergraduate with a strong foundation in data structures, algorithms, and full-stack web development. Eager to leverage project experience and analytical skills in a fast-paced software engineering internship.",
    "Detail-oriented Business & Marketing student with proven leadership experience in campus organizations. Skilled in digital analytics, content strategy, and market research with a passion for driving brand growth.",
    "Motivated Engineering student with hands-on experience in CAD modeling, Python automation, and hardware prototyping. Demonstrated problem-solving ability through competitive robotics and hackathon achievements.",
    "Enthusiastic Data Science student adept at statistical modeling, Python, and SQL. Seeking an entry-level analyst position to transform raw data into actionable business intelligence.",
    "Driven Design student with a keen eye for modern UI/UX aesthetics, visual hierarchy, and accessibility standards. Experienced in Figma wireframing and interactive prototyping for mobile applications."
  ],
  "Fresher": [
    "Results-driven Recent Graduate in Information Technology with hands-on experience building scalable MERN stack web applications and RESTful APIs. Possesses strong analytical problem-solving skills and a commitment to clean code practices.",
    "Proactive Finance graduate with solid grounding in financial modeling, Excel VBA, and equity research. Eager to contribute analytical rigor and financial acumen to an investment banking or corporate finance team.",
    "Passionate Junior Full Stack Developer with a background in TypeScript, React, and Node.js. Completed 3 comprehensive full-stack projects with over 500 active users. Ready to solve complex backend challenges.",
    "Adaptable Communications graduate with exceptional written and verbal skills. Proven track record managing multi-channel social media campaigns and increasing organic engagement by 45% during university internship.",
    "Innovative Junior UI/UX Designer dedicated to crafting intuitive digital products. Proficient in user research, design systems, and responsive web layouts."
  ],
  "Software Engineer": [
    "Innovative Senior Software Engineer with 5+ years of experience architecting resilient cloud microservices, optimizing CI/CD pipelines, and driving React/Node.js frontend performance. Reduced application latency by 35% across high-traffic platforms.",
    "Full-Stack Developer with expertise in TypeScript, React, Python, and AWS. Proven track record leading cross-functional teams to deliver enterprise SaaS applications serving 100k+ daily active users.",
    "Backend Engineer specializing in Distributed Systems, Go, and PostgreSQL. Skilled in high-throughput API design, database query optimization, and Kubernetes orchestration.",
    "Frontend Engineer focused on modern web design, Web Vitals performance tuning, and accessible React design systems. Increased conversion rates by 22% through UX overhaul.",
    "DevOps & Cloud Engineer proficient in Terraform, Docker, AWS, and automated deployment pipelines. Successfully reduced cloud infrastructure costs by 28% while improving system uptime to 99.99%."
  ],
  "Designer": [
    "Product Designer with 4+ years of experience designing end-to-end user experiences for mobile and web platforms. Expert in user interviews, design tokens, Figma component systems, and WCAG AA accessibility compliance.",
    "Creative Lead UI/UX Designer skilled in turning complex workflow requirements into sleek, minimalist interfaces. Increased onboarding completion rates by 40% for a Fintech mobile application.",
    "Brand & Visual Designer with a track record of elevating brand identities across digital and print media. Adept at motion graphics, Adobe Creative Cloud, and design system governance.",
    "UX Researcher & Interaction Designer specialized in data-driven usability testing, customer journey mapping, and low-to-high fidelity wireframing.",
    "Frontend Designer blending UI design mastery with React, Tailwind CSS, and Framer Motion code implementations for flawless visual execution."
  ],
  "Data Analyst": [
    "Analytical Data Analyst with 3+ years of experience extracting actionable business insights using SQL, Python, Tableau, and BigQuery. Built predictive churn models that saved $150k annually.",
    "Business Intelligence Analyst skilled in ETL data pipeline design, PowerBI dashboard creation, and statistical hypothesis testing. Experienced in communicating findings to C-suite executives.",
    "Data Scientist with expertise in machine learning classification algorithms, natural language processing, and pandas data manipulation. Published 2 research projects in automated data pipelines.",
    "Financial Data Analyst adept at financial forecasting, risk modeling, and automating multi-source spreadsheet reporting processes.",
    "Growth Data Analyst specializing in A/B testing, cohort retention analysis, and Google Analytics 4 event tracking for e-commerce platforms."
  ]
};

export const NO_EXPERIENCE_TYPES = [
  { id: 'internship', label: 'Internship', desc: 'Summer, winter, or virtual internships' },
  { id: 'academic', label: 'Academic Projects', desc: 'Major coursework, capstone, thesis projects' },
  { id: 'personal', label: 'Personal Projects', desc: 'Side projects, apps, websites built independently' },
  { id: 'volunteer', label: 'Volunteer Work', desc: 'Non-profit, community, or university student clubs' },
  { id: 'freelance', label: 'Freelancing / Client Work', desc: 'Contract work, local business sites, gig projects' },
  { id: 'hackathons', label: 'Hackathons & Contests', desc: '24-48hr build competitions and coding challenges' }
];

export const NO_EXPERIENCE_GENERATORS: Record<string, { role: string; company: string; bullets: string[] }> = {
  internship: {
    role: "Software Engineering Intern",
    company: "Tech Solutions Inc.",
    bullets: [
      "Collaborated with senior developers to construct 5+ responsive React components, reducing page load time by 18%.",
      "Wrote comprehensive unit tests achieving 85% code coverage and preventing regression bugs prior to deployment.",
      "Participated in daily Agile standups, code reviews, and sprint planning meetings to deliver features on schedule."
    ]
  },
  academic: {
    role: "Lead Developer (Capstone Project)",
    company: "University Academic Department",
    bullets: [
      "Architected a full-stack web application using React, Node.js, and MongoDB to streamline student course registration.",
      "Implemented secure JWT authentication and role-based access control for 500+ simulated active user accounts.",
      "Presented project demonstration to a panel of industry judges, securing 1st place in the annual department showcase."
    ]
  },
  personal: {
    role: "Creator & Lead Developer",
    company: "Open Source / Independent Side Project",
    bullets: [
      "Designed and deployed an interactive productivity application deployed on Vercel with 200+ monthly active users.",
      "Integrated third-party REST APIs and Webhooks to deliver real-time data sync and push notification alerts.",
      "Utilized Git version control and GitHub Actions for continuous integration and automated testing workflows."
    ]
  },
  volunteer: {
    role: "Tech Coordinator & Volunteer",
    company: "Community Tech Initiative",
    bullets: [
      "Redesigned the non-profit organization's website, boosting monthly online volunteer registrations by 60%.",
      "Mentored 20+ high school students in basic HTML, CSS, and JavaScript programming fundamentals.",
      "Organized digital fundraising campaigns that raised $12,000 for local educational workshops."
    ]
  },
  freelance: {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    bullets: [
      "Developed custom responsive websites for 4 local small businesses, increasing their online leads by average of 35%.",
      "Configured SEO meta tags, Google Analytics, and speed optimizations resulting in 95+ Google Lighthouse scores.",
      "Managed end-to-end client communication, requirements gathering, contract negotiation, and deployment schedules."
    ]
  },
  hackathons: {
    role: "Hackathon Participant & Frontend Lead",
    company: "Global 48-Hour Hackathon",
    bullets: [
      "Built a functional AI-powered web prototype within 36 hours using React, Tailwind CSS, and OpenAI API.",
      "Engineered real-time UI components with instant visual feedback and seamless mobile responsiveness.",
      "Awarded 'Best User Experience' out of 50 participating international teams."
    ]
  }
};

export const PROFESSION_SKILLS: Record<string, { technical: string[]; soft: string[]; tools: string[] }> = {
  "Software Developer": {
    technical: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "HTML5/CSS3", "REST APIs", "SQL", "GraphQL", "Data Structures"],
    soft: ["Problem Solving", "Team Collaboration", "Agile/Scrum", "Code Review", "Adaptability", "Communication"],
    tools: ["Git & GitHub", "VS Code", "Docker", "Postman", "Vercel", "Webpack", "Vite", "Linux"]
  },
  "Data Scientist / Analyst": {
    technical: ["Python", "SQL", "R", "Pandas", "NumPy", "Scikit-Learn", "Machine Learning", "Statistical Modeling", "ETL", "A/B Testing", "BigQuery"],
    soft: ["Data Storytelling", "Critical Thinking", "Analytical Mindset", "Business Acumen", "Presentation Skills"],
    tools: ["Tableau", "Power BI", "Jupyter Notebooks", "Google Analytics", "Excel (Advanced)", "Snowflake", "Git"]
  },
  "UI/UX Designer": {
    technical: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Visual Design", "Information Architecture", "Usability Testing", "Accessibility (WCAG)"],
    soft: ["Empathy", "Design Thinking", "Feedback Integration", "Cross-functional Collaboration", "Creative Direction"],
    tools: ["Figma", "Adobe XD", "Illustrator", "Photoshop", "Framing / Principle", "Miro", "Zeplin"]
  },
  "Product Manager": {
    technical: ["Product Roadmap", "User Stories", "Market Research", "Feature Prioritization", "KPI Tracking", "Agile Methodology", "A/B Testing"],
    soft: ["Strategic Leadership", "Stakeholder Management", "Conflict Resolution", "Customer Focus", "Decision Making"],
    tools: ["Jira", "Confluence", "Productboard", "Mixpanel", "Notion", "Slack", "Figma"]
  },
  "Marketing Specialist": {
    technical: ["Digital Marketing", "SEO / SEM", "Content Strategy", "Social Media Marketing", "Copywriting", "Email Campaigns", "Conversion Rate Optimization"],
    soft: ["Creativity", "Analytical Skills", "Brand Voice", "Project Management", "Customer Engagement"],
    tools: ["Google Ads", "HubSpot", "Mailchimp", "Google Search Console", "Canva", "Meta Business Suite"]
  },
  "Finance & Accounting": {
    technical: ["Financial Analysis", "Financial Modeling", "Budgeting & Forecasting", "Accounting Standards (GAAP/IFRS)", "Auditing", "Tax Compliance", "Variance Analysis"],
    soft: ["Attention to Detail", "Ethical Integrity", "Quantitative Reasoning", "Time Management"],
    tools: ["Excel (VBA / Macros)", "QuickBooks", "SAP", "Oracle Financials", "Bloomberg Terminal"]
  }
};

export const FIELD_EXPLANATIONS: Record<string, FieldExplanation> = {
  fullName: {
    fieldId: "fullName",
    fieldName: "Full Name",
    whyItMatters: "Your name is the primary identifier on your resume. It sets the tone for your personal brand.",
    recruiterExpectations: "Recruiters expect your legal or preferred professional name in large, clear typography at the top.",
    goodExamples: ["Johnathon Vance", "Dr. Sarah Jenkins", "Alex Rivera, PMP"],
    badExamples: ["cool_coder_99", "John (The Beast)", "mr. Smith"],
    commonMistakes: ["Using middle names unnecessarily if not used professionally", "Adding informal nicknames in quotes"],
    atsTips: ["Use plain text without special characters or icons inside the name field."]
  },
  jobTitle: {
    fieldId: "jobTitle",
    fieldName: "Target Job Title",
    whyItMatters: "Tells the recruiter in 1 second exact role alignment with their open vacancy.",
    recruiterExpectations: "A standard industry job title matching or closely related to the position applied for.",
    goodExamples: ["Senior Full Stack Engineer", "Digital Marketing Specialist", "Data Analyst"],
    badExamples: ["Guru of Code", "Seeking Opportunities", "Hardworking Student"],
    commonMistakes: ["Putting a generic phrase like 'Looking for a Job' instead of a role title"],
    atsTips: ["Mirror the exact title used in the job description to boost ATS keyword matching score."]
  },
  email: {
    fieldId: "email",
    fieldName: "Email Address",
    whyItMatters: "The primary contact method recruiters use for interview invites.",
    recruiterExpectations: "A simple, professional email address using standard domain providers (Gmail, Outlook, University).",
    goodExamples: ["alex.smith@gmail.com", "j.vance@university.edu"],
    badExamples: ["partyboy2004@yahoo.com", "skater_girl_xoxo@hotmail.com"],
    commonMistakes: ["Using work email from current employer", "Using obsolete or funny childhood emails"],
    atsTips: ["Ensure email is hyperlinked correctly or written in standard name@domain.com format."]
  },
  summary: {
    fieldId: "summary",
    fieldName: "Professional Summary",
    whyItMatters: "Your 3-line elevator pitch. Recruiters read this in 6 seconds to decide whether to read further.",
    recruiterExpectations: "A concise overview highlighting years of experience, core skills, and key quantifiable value provided.",
    goodExamples: [
      "Results-driven Full Stack Engineer with 4+ years building high-throughput Node.js microservices. Reduced latency by 30% for 100k+ daily users."
    ],
    badExamples: [
      "I am a nice person looking for a good job where I can grow and learn lots of things."
    ],
    commonMistakes: ["Focusing on what you want from the company instead of what value you bring to them."],
    atsTips: ["Include 3-4 top industry keywords from the job description directly in your summary."]
  },
  experience: {
    fieldId: "experience",
    fieldName: "Work Experience",
    whyItMatters: "The core evidence of your capabilities and career progression.",
    recruiterExpectations: "Reverse chronological order with quantifiable bullet points starting with strong action verbs.",
    goodExamples: ["Engineered automated ETL pipelines handling 2TB daily data, reducing processing time by 40%."],
    badExamples: ["Responsible for writing code and fixing bugs when asked."],
    commonMistakes: ["Listing duties instead of achievements", "Using passive verbs like 'helped with' or 'worked on'"],
    atsTips: ["Use standard headers (Experience, Work History). State numbers, percentages, and metrics clearly."]
  },
  skills: {
    fieldId: "skills",
    fieldName: "Key Skills",
    whyItMatters: "ATS software filters candidates primarily based on matching hard skills listed in the job description.",
    recruiterExpectations: "A clean, categorized list of relevant technical tools, frameworks, and methodologies.",
    goodExamples: ["React, TypeScript, Node.js, PostgreSQL, Docker, AWS"],
    badExamples: ["Fast Learner, Microsoft Word, Hard Worker, Breathing"],
    commonMistakes: ["Overloading with basic soft skills while omitting essential technical skills"],
    atsTips: ["Group skills into technical and soft skill categories. Match spelling with job post requirements."]
  }
};
