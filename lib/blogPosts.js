/**
 * Shared blog post data for the Blog section, blog index, and single post pages.
 *
 * Body blocks:
 * - { type: 'paragraph', content: string }
 * - { type: 'heading', content: string }
 * - { type: 'subheading', content: string }
 * - { type: 'list', items: string[] }
 */

function parseInline(content) {
  const parts = content.split(/(\*\*.+?\*\*|\*.+?\*|`.+?`)/g).filter(Boolean);

  return parts.map((part) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return { type: 'strong', text: part.slice(2, -2) };
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return { type: 'emphasis', text: part.slice(1, -1) };
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return { type: 'code', text: part.slice(1, -1) };
    }

    return { text: part };
  });
}

function parseMarkdown(markdown) {
  const blocks = [];
  const lines = markdown.trim().split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line || line.startsWith('# ')) continue;

    if (line === '---') {
      blocks.push({ type: 'divider' });
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'subheading', content: line.slice(4) });
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'heading', content: line.slice(3) });
      continue;
    }

    if (line.startsWith('* ')) {
      const items = [];

      while (index < lines.length && lines[index].trim().startsWith('* ')) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }

      index -= 1;
      blocks.push({ type: 'list', items });
      continue;
    }

    const flowMatch = line.match(/^\*\*(.+→.+)\*\*$/);

    if (flowMatch) {
      blocks.push({
        type: 'flow',
        items: flowMatch[1].split('→').map((item) => item.trim()),
      });
      continue;
    }

    blocks.push({ type: 'paragraph', content: parseInline(line) });
  }

  return blocks;
}

function excludeSections(blocks, excludedHeadings) {
  let isExcluded = false;

  return blocks.filter((block) => {
    if (block.type === 'heading') {
      isExcluded = excludedHeadings.includes(block.content);
    }

    return !isExcluded;
  });
}

const allBlogPosts = [
  {
    id: 2,
    slug: 'from-vhs-tapes-to-a-private-linux-media-server',
    title: 'From VHS Tapes to a Private Linux Media Server',
    date: 'Aug 23, 2026',
    dateTime: '2026-08-23',
    category: 'Homelab & Self-Hosting',
    readTime: '5 min read',
    tags: ['Linux', 'UbuntuServer', 'Jellyfin', 'SelfHosting', 'Cybersecurity'],
    excerpt:
      'How I preserved decades of family videos and turned an old PC into private family infrastructure built on Linux, Jellyfin, and self-hosted services.',
    thumb: '/blog-icon.svg',
    showHero: false,
    body: excludeSections(parseMarkdown(`
# From VHS Tapes to a Private Linux Media Server

## Origins of the Project

This project started with something much more personal than building a server.

My family has decades of home videos that were originally recorded on **VHS tapes**. Years ago, many of those tapes were transferred onto DVDs to preserve them as the original tapes aged.

But DVDs created a new problem.

The memories were technically preserved, but accessing them meant finding the right disc, putting it into a DVD player or computer, and navigating through old media. As technology continued moving away from physical media, I wanted a better long-term solution.

My goal was simple:

**Preserve our family videos digitally and make them easy for my family to watch, while keeping the data private and under our control.**

---

## Preserving the Archive

The project began with media preservation rather than Linux or server administration.

The immediate task was to move the collection off the DVDs.

The discs used the traditional **DVD-Video file structure**, which typically consists of \`VIDEO_TS\` directories containing files such as \`.VOB\`, \`.IFO\`, and \`.BUP\`.

While this format works for DVDs, it isn't ideal for a modern digital media library.

I transferred the contents of the discs to an SSD and converted the footage into modern video files, primarily MP4, that could be easily organized, played, and streamed across different devices.

After working through the collection, I ended up with more than **100 GB of digitized family footage**.

The journey of the data now looked something like this:

**VHS → DVD → DVD-Video files → MP4 → SSD**

At this point, the footage was finally digital and organized.

Digitization solved the format problem, but it did not solve storage or access.

---

## Choosing Privacy Over Convenience

The obvious solution would have been the cloud.

I could upload the videos to a video-sharing platform or cloud storage service and send my family links.

Technically, that would work.

But these aren't movies or public videos. They're personal family memories.

I didn't want convenience to automatically mean handing the entire collection to a third-party platform.

That changed the question from **"Where can I upload these videos?"** to **"Can I host them myself?"**

That question became the foundation for the technical decisions that followed.

---

## Repurposing Existing Hardware

I already had an older PC available, so rather than purchasing dedicated server hardware, I decided to repurpose what I had.

I removed Windows and installed **Ubuntu Server**, turning the machine into a dedicated Linux server.

The SSD containing the digitized footage became part of the server's storage.

This was also an opportunity to become more comfortable working with Linux outside of a virtual machine or temporary lab environment.

Instead of completing an exercise and shutting the machine down afterward, I was now administering a system that served an actual purpose.

That meant thinking about storage, file permissions, services, networking, remote administration, reliability, and security as parts of one system.

And because this was real data that mattered to me, mistakes suddenly mattered too.

---

## Building the Streaming Platform

Having the files on a server solved the storage problem, but I didn't want my family browsing through directories filled with MP4 files.

I wanted accessing the videos to feel natural.

That's where **Jellyfin** came in.

Jellyfin is an open-source, self-hosted media server. I installed it on the Ubuntu server and connected it to the family video library stored on the SSD.

Instead of navigating folders, the collection could now be accessed through a media interface.

In simple terms, I had created something resembling a **private family Netflix**, except the infrastructure and media remained under my control.

The initial architecture was relatively simple:

**Family Devices → Private Network Access → Ubuntu Linux Server → Jellyfin → SSD Media Library**

The simplicity is actually something I like about the project. There aren't unnecessary services or complicated infrastructure just for the sake of making the project sound impressive.

It solves a real problem.

---

## Lessons from a DIY Setup

Getting everything working also exposed some of the weaknesses of a DIY setup.

One of the biggest lessons was storage.

I was working with external SSDs, and at one point I had issues with media unexpectedly becoming unmounted. I had to troubleshoot the drives, mount points, file systems, and how Ubuntu was accessing the storage.

There were also physical limitations.

An external SSD might be extremely fast, but that doesn't matter as much if the connection between the drive and server becomes the bottleneck. My PC doesn't have all of the connectivity I would ideally want, so adapters and USB connections became another part of the system I had to think about.

These weren't necessarily major failures.

But they taught me an important distinction:

**Getting a server working is different from building a server you can trust.**

For a DIY project, using hardware I already owned was the perfect place to start.

For something that I eventually want my family to depend on, reliability becomes much more important.

---

## Remote Access and Usability

My family isn't all in the same place.

Some family members who I want to give access to the server live in different parts of the world.

For my first remote access solution, I configured **Tailscale**.

This allowed devices outside my home network to securely connect back to the server without immediately exposing Jellyfin directly to the public internet.

Technically, it works very well.

But it introduced another problem: usability.

Every family member needs Tailscale installed and configured on the device they want to use.

For me, that's easy.

For someone who simply wants to watch an old family video, it's unnecessary friction.

Ideally, I want the experience to be closer to any normal streaming service:

**Open the site → Sign in → Watch**

That means I'm now exploring a different architecture for remote access.

I'm looking at securely exposing the service through my home internet connection, including configuring the necessary networking through my Rogers equipment and using technologies such as HTTPS, a reverse proxy, firewall rules, strong authentication, and potentially IP-based restrictions where appropriate.

Opening a service to the internet changes the security model.

A username and password shouldn't automatically be treated as the entire security strategy.

The challenge is finding the right balance between **security and usability**.

If I make the system extremely secure but nobody in my family wants to use it, I haven't completely solved the original problem.

---

## Privacy as a Design Requirement

One of the most important parts of this project is something that isn't visible in a screenshot.

**Privacy influenced the architecture from the beginning.**

The entire reason for self-hosting was to avoid unnecessarily placing a large archive of private family footage on a public or third-party video platform.

That also means being intentional about what I document publicly.

I can explain the architecture, technologies, and lessons from this project without publishing information such as internal addresses, credentials, detailed network configurations, or other information that could unnecessarily expose the environment.

Security isn't just about adding security tools after building something.

Sometimes it begins with deciding **what data should leave your environment in the first place.**

---

## From Storage to Redundancy

Once Jellyfin was working reliably, another question became impossible to ignore:

**What happens if the SSD dies?**

These aren't replaceable media files.

If a movie disappears, I can get another copy.

If a family video disappears, that recording may be gone forever.

That changed the way I'm approaching the next stage of the project.

I'm currently researching dedicated NAS hardware, including systems from **QNAP**, and looking at moving away from relying primarily on external SSD storage.

One configuration I'm considering would use two large hard drives, potentially **12 TB each**, configured as mirrored storage.

Instead of:

**One drive → One copy of the data**

the system would look more like:

**12 TB Drive A ↔ 12 TB Drive B**

If one drive fails, the other still contains the data.

But redundancy isn't the same thing as a backup.

A mirrored system can protect against a drive failure, but it doesn't necessarily protect against accidental deletion, corruption, malware, hardware damage, or losing the entire NAS.

So the project has expanded again.

I'm no longer just thinking about **storage capacity**.

I'm thinking about:

**Storage → Redundancy → Backup → Recovery**

That's a very different problem from the one I originally set out to solve.

---

## Expanding the Scope

Once I had a computer running Linux 24/7, another question naturally came up:

**Why stop at media?**

The server could eventually become a private digital environment for my family.

Photos could be stored and organized there.

Important documents could be backed up there.

Computers and phones could automatically back up to it.

Family members could have their own accounts and private storage.

And one area I'm particularly interested in experimenting with is **AI**.

I would like to explore hosting a local LLM that could act as a private family assistant.

Instead of only asking a chatbot general questions, the interesting part would be allowing it to interact with information that belongs to the family while keeping that information within infrastructure I control.

Eventually, that could create some interesting possibilities.

Questions like:

*"Find the videos from our trip."*

*"Where did we store this document?"*

*"What year was this family video recorded?"*

*"Find the manual for this appliance."*

*"What was that recipe we saved?"*

The LLM itself isn't necessarily the most interesting part.

The interesting problem is connecting AI to private data in a useful way without automatically sending that data to external services.

At that point, what started as a Jellyfin server begins becoming something much larger:

**A private family cloud.**

---

## What I Learned

What started as a media conversion project ended up touching several areas of computing.

### Linux Administration

Running Ubuntu Server gave me more hands-on experience managing Linux as an actual persistent system rather than simply using it for an isolated lab.

When something breaks, I can't just delete the VM and start again.

I have to understand what happened.

### Data Migration and Media Formats

The footage has already survived multiple generations of technology:

**VHS → DVD → DVD-Video → MP4 → SSD → Linux Server**

Preserving data isn't only about keeping a copy.

The data also has to remain accessible as technology changes.

### Storage and Reliability

Working with external drives taught me about mounting, file systems, permissions, physical interfaces, and bottlenecks.

Thinking about a NAS then introduced another layer: redundancy, drive failure, backup strategies, and recovery planning.

### Networking

Jellyfin made networking concepts much more tangible.

Local access was one problem.

Remote access introduced another.

Tailscale solved that problem securely, but then usability became a consideration.

Now I'm learning how technologies such as DNS, HTTPS, reverse proxies, firewalls, authentication, and port forwarding fit together when a service needs to be accessible over the internet.

### Self-Hosting

This project changed how I think about cloud services.

The cloud is incredibly useful, but it isn't automatically the best answer to every problem.

Sometimes owning the hardware and hosting a service yourself gives you exactly what you need: control, privacy, flexibility, and an opportunity to understand the infrastructure underneath the application.

### Cybersecurity

Most importantly, the project reinforced that cybersecurity isn't isolated from the rest of computing.

Operating systems, networking, authentication, permissions, storage, services, privacy, availability, redundancy, and backups all intersect when you operate your own infrastructure.

Security becomes much easier to understand when the system you're protecting is actually yours.

---

## What Comes Next

The server works, but I definitely don't consider the project finished.

The next stage is turning the current proof of concept into something more reliable.

That means exploring:

* Dedicated NAS hardware
* Mirrored storage and redundancy
* A proper backup and recovery strategy
* Secure browser-based remote access for family members
* HTTPS and reverse proxy configuration
* Better monitoring and logging
* Additional system hardening
* Automatic backups from personal devices
* Private photo and document storage
* A locally hosted LLM and family knowledge system
* Continued improvements to Jellyfin and the overall user experience

The interesting thing is that none of these were part of my original plan.

Each solution created a new question.

---

## More Than a Media Server

The part I find most interesting is still the full lifecycle of the data.

These videos began as magnetic recordings on **VHS tapes**.

They were transferred to **DVDs**.

I extracted and converted them into modern digital video files.

Those files moved onto an **SSD**.

That SSD became storage for an **Ubuntu Linux server**.

Jellyfin turned the server into a **private streaming platform**.

Remote access allowed that platform to reach family members thousands of kilometres away.

And now I'm thinking about NAS storage, redundancy, backups, cybersecurity, private cloud services, and locally hosted AI.

The chain has become:

**VHS → DVD → Digital Files → SSD → Linux Server → Private Streaming → Remote Access → Redundant Storage → Private Family Infrastructure**

Decades of technological change are represented in that one chain.

And instead of throwing away an older PC, I was able to give it another purpose.

What began as an attempt to preserve family memories became a practical exercise in **Linux, networking, data migration, self-hosting, storage, privacy, cybersecurity, redundancy, and AI**.

But the biggest shift has been how I think about the project itself.

I started by asking:

**"How can I preserve these videos?"**

Now I'm asking:

**"What would private digital infrastructure for a family actually look like?"**

I don't have the complete answer yet.

That's what makes me want to keep building it.
    `), [
      'Lessons from a DIY Setup',
      'Remote Access and Usability',
      'From Storage to Redundancy',
      'Expanding the Scope',
      'What I Learned',
      'What Comes Next',
    ]),
  },
  {
    id: 1,
    published: false,
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

export const blogPosts = allBlogPosts.filter((post) => post.published !== false);

export function getPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs() {
  return blogPosts.map((p) => p.slug);
}
