# Portfolio Website

A modern, feature-rich portfolio website built with Next.js 15, TypeScript, and React. This project showcases professional experience, projects, skills, and includes interactive features like a booking modal, blog, and social integrations.


## Features

- **Modern Tech Stack**: Built with Next.js 15 (App Router), TypeScript, and React
- **Responsive Design**: Fully responsive layout with custom CSS modules
- **Dark Mode**: Theme toggle functionality for better user experience
- **Smooth Scrolling**: Enhanced navigation with smooth scroll behavior
- **Dynamic Pages**:
  - Home page with Hero section
  - About page
  - Blog section
  - Projects showcase with detailed project pages
  - Work experience timeline
  - Skills overview
  - Feedback system
  - Code snippets collection
  - Spotify integration
  - Social corner
  - Dashboard

## Project Structure

```
app/
├── components/          # Reusable React components
│   ├── About.tsx
│   ├── BookingModal.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── SmoothScroll.tsx
│   └── ThemeToggle.tsx
├── projects/[slug]/     # Dynamic project detail pages
├── about/
├── blog/
├── dashboard/
├── feedback/
├── snippets/
├── social-corner/
├── spotify/
└── work/

public/
├── assets/             # Images and videos
│   ├── images/
│   │   ├── blogs/
│   │   ├── certificates/
│   │   └── projects/
│   └── video/
└── data/              # JSON data files
    ├── experience.json
    ├── projects.json
    └── skills.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd www
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Configuration

- **ESLint**: Configured with `eslint.config.mjs`
- **TypeScript**: Type checking with `tsconfig.json`
- **PostCSS**: Styling configuration in `postcss.config.mjs`
- **Next.js**: App configuration in `next.config.ts`

## Customization

### Update Content

1. **Experience**: Edit `/public/data/experience.json`
2. **Projects**: Edit `/public/data/projects.json`
3. **Skills**: Edit `/public/data/skills.json`

### Add Images

Place images in the appropriate directories:
- Blog images: `/public/assets/images/blogs/`
- Project images: `/public/assets/images/projects/`
- Certificates: `/public/assets/images/certificates/`

### Modify Components

All components are located in `/app/components/` with their corresponding CSS modules.

## Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Platforms

This app can also be deployed to:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform
- Any Node.js hosting service

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [React](https://react.dev/) - UI library
- CSS Modules - Scoped styling
- [ESLint](https://eslint.org/) - Code linting
- [PostCSS](https://postcss.org/) - CSS processing

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Next.js GitHub repository](https://github.com/vercel/next.js)
- [Learn Next.js](https://nextjs.org/learn) - interactive tutorial

## License

This project is open source and available under the [MIT License](LICENSE).
# personal-website
# freelancer-job
