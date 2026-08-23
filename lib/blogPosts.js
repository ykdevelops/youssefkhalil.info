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
    id: 2,
    slug: 'from-vhs-tapes-to-a-private-linux-media-server',
    title: 'From VHS Tapes to a Private Linux Media Server',
    date: 'Aug 23, 2026',
    dateTime: '2026-08-23',
    category: 'Homelab & Self-Hosting',
    readTime: '8 min read',
    excerpt:
      'How I preserved decades of family videos and turned an old PC into a private, self-hosted Jellyfin media server.',
    thumb: '/blog-icon.svg',
    showHero: false,
    body: [
      { type: 'heading', content: 'The Problem' },
      {
        type: 'paragraph',
        content:
          'This project started with something much more personal than building a server.',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'My family has decades of home videos that were originally recorded on ' },
          { type: 'strong', text: 'VHS tapes' },
          {
            text:
              '. Years ago, many of those tapes were transferred onto DVDs to preserve them as the original tapes aged.',
          },
        ],
      },
      { type: 'paragraph', content: 'But DVDs created a new problem.' },
      {
        type: 'paragraph',
        content:
          'The memories were technically preserved, but accessing them meant finding the right disc, putting it into a DVD player or computer, and navigating through old media. As technology continued moving away from physical media, I wanted a better long-term solution.',
      },
      { type: 'paragraph', content: 'My goal was simple:' },
      {
        type: 'paragraph',
        content: [
          {
            type: 'strong',
            text:
              'Preserve our family videos digitally and make them easy for my family to watch, while keeping the data private and under our control.',
          },
        ],
      },
      { type: 'divider' },
      { type: 'heading', content: 'Step 1: Moving Years of Video Off Physical Media' },
      {
        type: 'paragraph',
        content: 'The first part of the project had nothing to do with Linux or servers.',
      },
      { type: 'paragraph', content: 'I needed to get everything off the DVDs.' },
      {
        type: 'paragraph',
        content: [
          { text: 'The discs used the traditional ' },
          { type: 'strong', text: 'DVD-Video file structure' },
          { text: ', which typically consists of ' },
          { type: 'code', text: 'VIDEO_TS' },
          { text: ' directories containing files such as ' },
          { type: 'code', text: '.VOB' },
          { text: ', ' },
          { type: 'code', text: '.IFO' },
          { text: ', and ' },
          { type: 'code', text: '.BUP' },
          { text: '.' },
        ],
      },
      {
        type: 'paragraph',
        content:
          'While this format works for DVDs, it isn’t ideal for a modern digital media library.',
      },
      {
        type: 'paragraph',
        content:
          'I transferred the contents of the discs to an SSD and converted the footage into modern video files, primarily MP4, that could be easily organized, played, and streamed across different devices.',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'After working through the collection, I ended up with more than ' },
          { type: 'strong', text: '100 GB of digitized family footage' },
          { text: '.' },
        ],
      },
      {
        type: 'paragraph',
        content: 'The journey of the data now looked something like this:',
      },
      {
        type: 'flow',
        items: ['VHS', 'DVD', 'DVD-Video files', 'MP4', 'SSD'],
      },
      {
        type: 'paragraph',
        content: 'At this point, the footage was finally digital and organized.',
      },
      { type: 'paragraph', content: 'But I had another problem.' },
      { type: 'divider' },
      {
        type: 'heading',
        content: 'Step 2: Where Do I Put 100 GB of Private Family Videos?',
      },
      { type: 'paragraph', content: 'The obvious solution would have been the cloud.' },
      {
        type: 'paragraph',
        content:
          'I could upload the videos to a video-sharing platform or cloud storage service and send my family links.',
      },
      { type: 'paragraph', content: 'Technically, that would work.' },
      {
        type: 'paragraph',
        content:
          'But these aren’t movies or public videos. They’re personal family memories.',
      },
      {
        type: 'paragraph',
        content:
          'I didn’t want convenience to automatically mean handing the entire collection to a third-party platform.',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'That changed the question from ' },
          { type: 'strong', text: '“Where can I upload these videos?”' },
          { text: ' to ' },
          { type: 'strong', text: '“Can I host them myself?”' },
        ],
      },
      {
        type: 'paragraph',
        content: 'That question eventually became the most interesting part of the project.',
      },
      { type: 'divider' },
      { type: 'heading', content: 'Step 3: Giving an Old PC a New Purpose' },
      {
        type: 'paragraph',
        content:
          'I already had an older PC available, so rather than purchasing dedicated server hardware, I decided to repurpose what I had.',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'I removed Windows and installed ' },
          { type: 'strong', text: 'Ubuntu Server' },
          { text: ', turning the machine into a dedicated Linux server.' },
        ],
      },
      {
        type: 'paragraph',
        content:
          'The SSD containing the digitized footage became part of the server’s storage.',
      },
      {
        type: 'paragraph',
        content:
          'This was also an opportunity to become more comfortable working with Linux outside of a virtual machine or temporary lab environment.',
      },
      {
        type: 'paragraph',
        content:
          'Instead of completing an exercise and shutting the machine down afterward, I was now administering a system that served an actual purpose.',
      },
      {
        type: 'paragraph',
        content:
          'That meant thinking about storage, file permissions, services, networking, remote administration, reliability, and security as parts of one system.',
      },
      { type: 'divider' },
      { type: 'heading', content: 'Step 4: Building a Private Streaming Platform' },
      {
        type: 'paragraph',
        content:
          'Having the files on a server solved the storage problem, but I didn’t want my family browsing through directories filled with MP4 files.',
      },
      { type: 'paragraph', content: 'I wanted accessing the videos to feel natural.' },
      {
        type: 'paragraph',
        content: [
          { text: 'That’s where ' },
          { type: 'strong', text: 'Jellyfin' },
          { text: ' came in.' },
        ],
      },
      {
        type: 'paragraph',
        content:
          'Jellyfin is an open-source, self-hosted media server. I installed it on the Ubuntu server and connected it to the family video library stored on the SSD.',
      },
      {
        type: 'paragraph',
        content:
          'Instead of navigating folders, the collection could now be accessed through a media interface.',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'In simple terms, I had created something resembling a ' },
          { type: 'strong', text: 'private family Netflix' },
          {
            text:
              ', except the infrastructure and media remained under my control.',
          },
        ],
      },
      { type: 'paragraph', content: 'The architecture is relatively simple:' },
      {
        type: 'flow',
        items: [
          'Family Devices',
          'Private Network Access',
          'Ubuntu Linux Server',
          'Jellyfin',
          'SSD Media Library',
        ],
        vertical: true,
      },
      {
        type: 'paragraph',
        content:
          'The simplicity is actually something I like about the project. There aren’t unnecessary services or complicated infrastructure just for the sake of making the project sound impressive.',
      },
      { type: 'paragraph', content: 'It solves a real problem.' },
      { type: 'divider' },
      { type: 'heading', content: 'Privacy as a Design Requirement' },
      {
        type: 'paragraph',
        content:
          'One of the most important parts of this project was something that isn’t visible in a screenshot.',
      },
      {
        type: 'paragraph',
        content: [
          { type: 'strong', text: 'Privacy influenced the architecture from the beginning.' },
        ],
      },
      {
        type: 'paragraph',
        content:
          'The entire reason for self-hosting was to avoid unnecessarily placing a large archive of private family footage on a public or third-party video platform.',
      },
      {
        type: 'paragraph',
        content:
          'That also means being intentional about what I document publicly.',
      },
      {
        type: 'paragraph',
        content:
          'I can explain the architecture, technologies, and lessons from this project without publishing information such as internal addresses, credentials, detailed network configurations, or other information that could unnecessarily expose the environment.',
      },
      {
        type: 'paragraph',
        content: [
          {
            text:
              'Security isn’t just about adding security tools after building something. Sometimes it begins with deciding ',
          },
          {
            type: 'strong',
            text: 'what data should leave your environment in the first place.',
          },
        ],
      },
      { type: 'divider' },
      { type: 'heading', content: 'What I Learned' },
      {
        type: 'paragraph',
        content:
          'What started as a media conversion project ended up touching several areas of computing.',
      },
      { type: 'subheading', content: 'Linux Administration' },
      {
        type: 'paragraph',
        content:
          'Running Ubuntu Server gave me more hands-on experience managing Linux as an actual persistent system rather than simply using it for an isolated lab.',
      },
      { type: 'subheading', content: 'Data Migration and Media Formats' },
      {
        type: 'paragraph',
        content:
          'The footage had already survived one technology transition from VHS to DVD. Moving from DVD-Video structures into modern digital files taught me another side of data preservation: keeping the data isn’t enough if the format becomes increasingly inconvenient to access.',
      },
      { type: 'subheading', content: 'Storage Management' },
      {
        type: 'paragraph',
        content:
          'Working with more than 100 GB of footage required thinking about where the data lives, how it is organized, how applications access it, and how it should eventually be backed up.',
      },
      { type: 'subheading', content: 'Networking' },
      {
        type: 'paragraph',
        content:
          'A server isn’t particularly useful if nothing can communicate with it. Deploying Jellyfin turned networking concepts into something tangible because I could see the relationship between the server, services, network, and client devices.',
      },
      { type: 'subheading', content: 'Self-Hosting' },
      {
        type: 'paragraph',
        content:
          'This project also changed how I think about cloud services. The cloud is incredibly useful, but it isn’t automatically the best answer to every problem.',
      },
      {
        type: 'paragraph',
        content:
          'Sometimes owning the hardware and hosting a service yourself gives you exactly what you need: control, privacy, flexibility, and an opportunity to understand the infrastructure underneath the application.',
      },
      { type: 'subheading', content: 'Cybersecurity' },
      {
        type: 'paragraph',
        content:
          'Most importantly, the project reinforced that cybersecurity isn’t isolated from the rest of computing.',
      },
      {
        type: 'paragraph',
        content:
          'Operating systems, networking, authentication, permissions, storage, services, privacy, and availability all intersect when you operate your own infrastructure.',
      },
      { type: 'divider' },
      { type: 'heading', content: 'What Comes Next' },
      {
        type: 'paragraph',
        content: 'The server works, but I don’t consider the project finished.',
      },
      {
        type: 'paragraph',
        content:
          'There are several areas I want to continue exploring, including:',
      },
      {
        type: 'list',
        items: [
          'Secure remote access for family members outside the local network',
          'Stronger access controls and account management',
          'Automated backups',
          'Server monitoring and logging',
          'Additional system hardening',
          'Storage redundancy and recovery planning',
          'Improving the media organization and user experience',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Each improvement gives me another opportunity to learn while making the system more reliable.',
      },
      { type: 'divider' },
      { type: 'heading', content: 'More Than a Media Server' },
      {
        type: 'paragraph',
        content: 'The part I find most interesting is the full lifecycle of the data.',
      },
      {
        type: 'paragraph',
        content: [
          { text: 'These videos began as magnetic recordings on ' },
          { type: 'strong', text: 'VHS tapes' },
          { text: '. They were later transferred to ' },
          { type: 'strong', text: 'DVDs' },
          {
            text:
              '. I extracted and converted them into modern digital video files. Those files now live on an ',
          },
          { type: 'strong', text: 'SSD connected to a Linux server' },
          { text: ', where they can be streamed through a self-hosted application.' },
        ],
      },
      {
        type: 'flow',
        items: [
          'VHS',
          'DVD',
          'Digital Files',
          'SSD',
          'Linux Server',
          'Private Streaming',
        ],
      },
      {
        type: 'paragraph',
        content:
          'Decades of technological change are represented in that one chain.',
      },
      {
        type: 'paragraph',
        content:
          'And instead of throwing away an older PC, I was able to give it another purpose.',
      },
      {
        type: 'paragraph',
        content: [
          {
            text:
              'What began as an attempt to preserve family memories became a practical exercise in ',
          },
          {
            type: 'strong',
            text:
              'Linux, networking, data migration, self-hosting, privacy, and cybersecurity',
          },
          { text: '.' },
        ],
      },
      {
        type: 'paragraph',
        content:
          'That’s the type of project I enjoy most: learning technology by using it to solve a real problem.',
      },
    ],
  },
  {
    id: 1,
    slug: 'do-you-actually-need-a-website-2026-edition',
    title: 'Do You Actually Need a Website? (2026 Edition)',
    date: 'Feb 1, 2026',
    dateTime: '2026-02-01',
    category: 'Web Development',
    readTime: '7 min read',
    excerpt:
      'In 2026, a website is no longer just an online business card. It can be a product, a platform, a payment system, an AI tool, or a full software application.',
    thumb: 'https://ykdevelops.s3.us-east-2.amazonaws.com/intro/introArtCompressed.gif',
    showHero: false,
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
