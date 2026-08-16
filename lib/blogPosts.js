/**
 * Shared blog post data for the Blog section, blog index, and single post pages.
 *
 * Body blocks:
 * - { type: 'paragraph', content: string }
 * - { type: 'heading', content: string }
 * - { type: 'subheading', content: string }
 * - { type: 'list', items: string[] }
 */

export const blogPosts = [
  {
    id: 1,
    slug: 'do-you-actually-need-a-website-2026-edition',
    title: 'Do You Actually Need a Website? (2026 Edition)',
    date: 'Feb 1, 2026',
    dateTime: '2026-02-01',
    excerpt:
      'In 2026, a website is no longer just an online business card. It can be a product, a platform, a payment system, an AI tool, or a full software application.',
    thumb: 'https://ykdevelops.s3.us-east-2.amazonaws.com/intro/introArtCompressed.gif',
    body: [
      {
        type: 'paragraph',
        content:
          'In 2026, a website is no longer just an online business card. It can be a product, a platform, a payment system, an AI tool, or a full software application.',
      },
      {
        type: 'paragraph',
        content: 'The real question is not “Do I need a website?” It is “What am I trying to build?”',
      },
      {
        type: 'paragraph',
        content:
          'This guide breaks down what modern web development actually looks like in 2026 and helps you decide what level of complexity you need.',
      },
      {
        type: 'heading',
        content: '1. No Code vs Full Code, The Real Difference in 2026',
      },
      { type: 'subheading', content: 'No Code Platforms' },
      {
        type: 'paragraph',
        content:
          'Platforms like Wix, Squarespace, Shopify, and Webflow allow you to build using visual editors.',
      },
      { type: 'subheading', content: 'They are ideal for:' },
      {
        type: 'list',
        items: ['Landing pages', 'Personal portfolios', 'Small local businesses', 'Simple ecommerce stores'],
      },
      { type: 'subheading', content: 'Advantages:' },
      {
        type: 'list',
        items: ['Fast launch', 'Low upfront cost', 'Hosting included', 'No programming knowledge required'],
      },
      { type: 'subheading', content: 'Limitations:' },
      {
        type: 'list',
        items: [
          'Restricted customization',
          'Performance ceilings',
          'Limited backend logic',
          'Platform lock in',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Modern no code tools are better than ever, but they are still best suited for simpler use cases.',
      },
      {
        type: 'paragraph',
        content: 'If your website is primarily informational, no code may be enough.',
      },
      { type: 'subheading', content: 'Full Code Websites' },
      {
        type: 'paragraph',
        content: 'If you need:',
      },
      {
        type: 'list',
        items: [
          'User accounts',
          'Custom dashboards',
          'File uploads',
          'AI features',
          'Automation',
          'Complex business logic',
        ],
      },
      {
        type: 'paragraph',
        content: 'You are entering full code territory.',
      },
      {
        type: 'paragraph',
        content: 'The modern 2026 stack often looks like:',
      },
      { type: 'subheading', content: 'Frontend:' },
      { type: 'list', items: ['Next.js', 'React', 'Vue'] },
      { type: 'subheading', content: 'Hosting:' },
      { type: 'list', items: ['Vercel', 'Cloudflare'] },
      { type: 'subheading', content: 'Backend:' },
      { type: 'list', items: ['Serverless functions', 'Edge functions'] },
      { type: 'subheading', content: 'Database:' },
      { type: 'list', items: ['Supabase', 'Firebase', 'Managed Postgres'] },
      { type: 'subheading', content: 'Payments:' },
      { type: 'list', items: ['Stripe'] },
      { type: 'subheading', content: 'Authentication:' },
      { type: 'list', items: ['Clerk', 'Auth.js', 'Passkeys'] },
      {
        type: 'paragraph',
        content: 'This approach gives you:',
      },
      {
        type: 'list',
        items: ['Full control', 'Performance optimization', 'Scalability', 'Long term flexibility'],
      },
      {
        type: 'paragraph',
        content:
          'It costs more in time and expertise, but it allows you to build real products, not just pages.',
      },
      { type: 'heading', content: '2. SEO in 2026' },
      {
        type: 'paragraph',
        content: 'Search Engine Optimization is now heavily tied to:',
      },
      {
        type: 'list',
        items: [
          'Core Web Vitals',
          'Page speed',
          'Interaction latency',
          'Layout stability',
          'Structured data',
        ],
      },
      {
        type: 'paragraph',
        content: 'With a coded site, you can control:',
      },
      {
        type: 'list',
        items: ['Metadata', 'Schema markup', 'Dynamic sitemaps', 'Semantic HTML', 'Server side rendering'],
      },
      {
        type: 'paragraph',
        content:
          'No code platforms provide SEO settings, but custom builds give deeper technical control.',
      },
      {
        type: 'paragraph',
        content: 'If ranking on Google is central to your strategy, performance architecture matters.',
      },
      { type: 'heading', content: '3. AI Is Now Built In' },
      {
        type: 'paragraph',
        content: 'In 2026, AI is not a bonus feature. It is expected.',
      },
      {
        type: 'paragraph',
        content: 'Modern websites integrate:',
      },
      {
        type: 'list',
        items: [
          'AI chat assistants',
          'Semantic search',
          'Personalized content',
          'AI generated summaries',
          'Intelligent recommendations',
        ],
      },
      {
        type: 'paragraph',
        content:
          'If your website includes any form of automation, personalization, or smart search, you are likely using AI APIs behind the scenes.',
      },
      {
        type: 'paragraph',
        content: 'This is one of the biggest shifts in web development in the past five years.',
      },
      { type: 'heading', content: '4. Authentication and Security' },
      {
        type: 'paragraph',
        content: 'Password only login systems are fading.',
      },
      {
        type: 'paragraph',
        content: 'Modern authentication includes:',
      },
      {
        type: 'list',
        items: [
          'OAuth login with Google or GitHub',
          'Passkeys',
          'Multi factor authentication',
          'Rate limiting',
          'Bot protection',
        ],
      },
      {
        type: 'paragraph',
        content: 'Security and privacy are no longer optional. Users expect safe systems by default.',
      },
      { type: 'heading', content: '5. Cloud Storage and Infrastructure' },
      {
        type: 'paragraph',
        content: 'Websites are now connected systems.',
      },
      {
        type: 'paragraph',
        content: 'If users upload:',
      },
      {
        type: 'list',
        items: ['Images', 'Videos', 'Documents', 'Audio'],
      },
      {
        type: 'paragraph',
        content: 'You will need cloud storage like S3 or similar managed storage providers.',
      },
      {
        type: 'paragraph',
        content: 'Infrastructure in 2026 is typically:',
      },
      {
        type: 'list',
        items: ['Serverless', 'Managed', 'Auto scaling', 'Git based deployment'],
      },
      {
        type: 'paragraph',
        content: 'Most serious products are built using composable architecture, meaning separate services for:',
      },
      {
        type: 'list',
        items: ['Frontend', 'Database', 'Authentication', 'Payments', 'AI', 'Analytics'],
      },
      {
        type: 'paragraph',
        content: 'These systems communicate through APIs.',
      },
      { type: 'heading', content: '6. Payments and Monetization' },
      {
        type: 'paragraph',
        content: 'If your website generates revenue, you likely use:',
      },
      {
        type: 'list',
        items: [
          'Stripe for subscriptions and one time payments',
          'International payment support',
          'Webhook based automation',
        ],
      },
      {
        type: 'paragraph',
        content: 'You can implement:',
      },
      {
        type: 'list',
        items: ['Paywalls', 'Subscription tiers', 'Digital product sales', 'Usage based billing'],
      },
      {
        type: 'paragraph',
        content: 'Modern payment systems are deeply integrated with backend logic and user permissions.',
      },
      { type: 'heading', content: 'So, Do You Need a Website?' },
      {
        type: 'paragraph',
        content: 'If you need:',
      },
      {
        type: 'list',
        items: [
          'Visibility → No code may be enough.',
          'Authority → A polished portfolio works.',
          'A product → You need full code.',
          'Automation → You need backend logic.',
          'AI integration → You need APIs and architecture.',
          'Scalability → You need modern infrastructure.',
        ],
      },
      {
        type: 'paragraph',
        content: 'The complexity of your website should match the ambition of your goal.',
      },
      {
        type: 'paragraph',
        content: 'In 2026, a website is not just design.',
      },
      {
        type: 'paragraph',
        content: 'It is infrastructure. It is performance. It is security. It is integration. It is automation.',
      },
      {
        type: 'paragraph',
        content: 'And sometimes, it is the foundation of your entire business.',
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
  return blogPosts.map((p) => p.slug);
}
