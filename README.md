# Himalayas Continental

A modern, bilingual (English/Nepali) website for Himalayas Continental - a leading medical equipment and healthcare solutions provider. Built with Payload CMS and Next.js, featuring an enterprise-grade admin panel, fully-featured publication workflow, and a production-ready frontend.

## About Himalayas Continental

Himalayas Continental provides comprehensive healthcare solutions including medical equipment, hospital supplies, and professional services to healthcare institutions across Nepal.

## Core Features

- [Bilingual Support (English/Nepali)](#bilingual-support)
- [Pre-configured Payload CMS](#how-it-works)
- [Authentication & Role-based Access](#users-authentication)
- [Layout Builder](#layout-builder)
- [Draft Preview](#draft-preview)
- [Live Preview](#live-preview)
- [On-demand Revalidation](#on-demand-revalidation)
- [SEO Optimization](#seo)
- [Site Search](#search)
- [URL Redirects](#redirects)
- [Scheduled Publishing](#jobs-and-scheduled-publish)
- [Staff Management](#staff-management)
- [Hospital Sections](#hospital-sections)
- [Product Catalog](#products)
- [Photo Albums](#albums)

## Quick Start

### Prerequisites

- Node.js ^18.20.2 || >=20.9.0
- pnpm ^9 || ^10
- MongoDB instance (local or cloud)

### Development

1. Clone the repository
2. `cp .env.example .env` to copy the example environment variables and configure them
3. `pnpm install` to install dependencies
4. `pnpm dev` to start the development server
5. Open `http://localhost:3000` in your browser

Create your first admin user by visiting the admin panel at `http://localhost:3000/admin`.

## How it works

The Payload config is tailored specifically to the needs of most websites. It is pre-configured in the following ways:

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend this functionality.

- #### Users (Authentication)

  Users are auth-enabled with role-based access control. Users can access the admin panel and manage content based on their roles. See [Access Control](#access-control) for more details.

- #### Posts

  Blog posts, news articles, and announcements. Layout builder enabled with draft/preview support.

- #### Pages

  CMS-driven pages with layout builder for flexible content creation. Draft-enabled for preview before publishing.

- #### Products

  Medical equipment and healthcare products catalog with categories and subcategories.

- #### ProductCategories & ProductSubCategories

  Hierarchical product classification system for organizing the medical equipment catalog.

- #### HospitalSections

  Manage hospital department sections and specialized healthcare unit information.

- #### Staffs

  Staff directory and team management for showcasing medical professionals and administrative team.

- #### Albums

  Photo galleries and image collections for events, facilities, and activities.

- #### Media

  Image and file uploads with S3 storage integration. Features pre-configured sizes and focal point management.

- #### Files

  Document management for downloadable resources like brochures and medical documents.

- #### SuchiDarta

  A specialized collection for managing hospital records and official documents (Nepali: "सुची दर्ता").

- #### List

  Custom list management for various data needs.

- #### CommonFormSubmissions

  Contact form and inquiry submissions management.

- #### Categories

  Taxonomy for grouping posts with support for nested categories.

### Globals

See the [Globals](https://payloadcms.com/docs/configuration/globals) docs for details on how to extend this functionality.

- `TopBar`

  Announcement bar and top navigation elements.

- `Header`

  Main header configuration including logo, navigation links, and contact information.

- `Navigation`

  Site navigation structure and menu items.

- `Footer`

  Footer configuration with links, contact details, and social media.

## Access control

Role-based access control is configured to manage content permissions:

- `users`: Authenticated users can access the admin panel based on their assigned roles.
- `posts`, `pages`, `products`, `staffs`, `hospitalSections`, `albums`: Public access to published content; authenticated users with appropriate roles can create, update, or delete.
- `suchiDarta`, `files`, `commonFormSubmissions`: Restricted access based on user roles.

For more details, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## Bilingual Support

The website supports both **English** and **Nepali** languages:

- Content can be managed in both languages via the admin panel
- Automatic language switching based on user preference
- Nepali date picker integration for local date formatting
- SEO-optimized URLs with locale prefixes (`/en/`, `/ne/`)

## Layout Builder

Create unique page layouts for any type of content using a powerful layout builder. This template comes pre-configured with the following layout building blocks:

- Hero
- Content
- Media
- Call To Action
- Archive

Each block is fully designed and built into the front-end website that comes with this template. See [Website](#website) for more details.

## Lexical editor

A deep editorial experience that allows complete freedom to focus just on writing content without breaking out of the flow with support for Payload blocks, media, links and other features provided out of the box. See [Lexical](https://payloadcms.com/docs/rich-text/overview) docs.

## Draft Preview

All posts and pages are draft-enabled so you can preview them before publishing them to your website. To do this, these collections use [Versions](https://payloadcms.com/docs/configuration/collections#versions) with `drafts` set to `true`. This means that when you create a new post, project, or page, it will be saved as a draft and will not be visible on your website until you publish it. This also means that you can preview your draft before publishing it to your website. To do this, we automatically format a custom URL which redirects to your front-end to securely fetch the draft version of your content.

Since the front-end of this template is statically generated, this also means that pages, posts, and projects will need to be regenerated as changes are made to published documents. To do this, we use an `afterChange` hook to regenerate the front-end when a document has changed and its `_status` is `published`.

For more details on how to extend this functionality, see the official [Draft Preview Example](https://github.com/payloadcms/payload/tree/examples/draft-preview).

## Live preview

In addition to draft previews you can also enable live preview to view your end resulting page as you're editing content with full support for SSR rendering. See [Live preview docs](https://payloadcms.com/docs/live-preview/overview) for more details.

## On-demand Revalidation

We've added hooks to collections and globals so that all of your pages, posts, footer, or header changes will automatically be updated in the frontend via on-demand revalidation supported by Nextjs.

> Note: if an image has been changed, for example it's been cropped, you will need to republish the page it's used on in order to be able to revalidate the Nextjs image cache.

## SEO

This template comes pre-configured with the official [Payload SEO Plugin](https://payloadcms.com/docs/plugins/seo) for complete SEO control from the admin panel. All SEO data is fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Search

This template also pre-configured with the official [Payload Search Plugin](https://payloadcms.com/docs/plugins/search) to showcase how SSR search features can easily be implemented into Next.js with Payload. See [Website](#website) for more details.

## Redirects

If you are migrating an existing site or moving content to a new URL, you can use the `redirects` collection to create a proper redirect from old URLs to new ones. This will ensure that proper request status codes are returned to search engines and that your users are not left with a broken link. This template comes pre-configured with the official [Payload Redirects Plugin](https://payloadcms.com/docs/plugins/redirects) for complete redirect control from the admin panel. All redirects are fully integrated into the front-end website that comes with this template. See [Website](#website) for more details.

## Jobs and Scheduled Publish

We have configured [Scheduled Publish](https://payloadcms.com/docs/versions/drafts#scheduled-publish) which uses the [jobs queue](https://payloadcms.com/docs/jobs-queue/jobs) in order to publish or unpublish your content on a scheduled time. The tasks are run on a cron schedule and can also be run as a separate instance if needed.

> Note: When deployed on Vercel, depending on the plan tier, you may be limited to daily cron only.

## Staff Management

Manage and showcase your healthcare team with the Staffs collection. Features include:

- Staff profiles with photos, positions, and qualifications
- Department categorization
- Bilingual support for staff information
- Department-specific listings

## Hospital Sections

Organize hospital departments and specialized healthcare units:

- Section-specific pages with detailed descriptions
- Equipment and service listings per department
- Staff assignments to departments
- Gallery support for each section

## Products

Comprehensive medical equipment and healthcare products catalog:

- Hierarchical category structure (Categories → SubCategories)
- Product details with specifications and images
- Related products and recommendations
- Inquiry forms for product information

## Albums

Photo gallery management for showcasing facilities, events, and activities:

- Multiple album support
- Image captions and descriptions
- Cover image selection
- Gallery layouts for frontend display

## Suchi Darta

A specialized record-keeping system for hospital documentation (Nepali: "सुची दर्ता"):

- Official document management
- Record tracking and archival
- Date-based organization with Nepali calendar support

## Website

The frontend is built with the [Next.js App Router](https://nextjs.org) alongside the Payload CMS backend in a unified application.

Core features:

- [Next.js App Router](https://nextjs.org) with App Directory
- [TypeScript](https://www.typescriptlang.org) for type safety
- [React Hook Form](https://react-hook-form.com) with Zod validation
- [Payload Admin Bar](https://github.com/payloadcms/payload/tree/main/packages/admin-bar)
- [TailwindCSS v4](https://tailwindcss.com/) with custom styling
- [shadcn/ui components](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/) animations
- Bilingual routing (English/Nepali)
- User authentication
- Blog and news system
- Product catalog with categories
- Staff directory
- Hospital sections showcase
- Photo galleries
- Contact forms
- SEO optimization
- Site search
- Live preview

### Cache

Next.js caching is configured for optimal performance. The application uses S3 for media storage and implements on-demand revalidation for content updates.

## Development

After completing the [Quick Start](#quick-start), you can seed the database with sample content.

### Database

This project uses **MongoDB** via the `@payloadcms/db-mongodb` adapter. Ensure your `DATABASE_URL` environment variable is configured to point to your MongoDB instance.

### Docker

Alternatively, you can use Docker to run the application locally:

1. Configure your `.env` file
2. Run `docker-compose up`
3. Access the application at `http://localhost:3000`

### Seeding

Available seed scripts for populating the database:

```bash
# Seed staff members
pnpm seed:staffs

# Seed lists
pnpm seed:list

# Seed contact submissions
pnpm seed:contact-submissions

# Seed hospital sections
pnpm seed:hospital-sections

# Seed photo albums
pnpm seed:albums

# Seed home page
pnpm seed:home

# Seed services page
pnpm seed:our-services
```

> NOTICE: Seeding may be destructive. Only run these commands when starting a new project or when data loss is acceptable.

## Production

To run Payload in production:

1. Run `pnpm build` to create a production-ready bundle in the `.next` directory
2. Run `pnpm start` to serve the application in production mode
3. Ensure all environment variables are configured for production

Required environment variables:
- `DATABASE_URL` - MongoDB connection string
- `PAYLOAD_SECRET` - Secret key for Payload
- `NEXT_PUBLIC_SERVER_URL` - Public URL of the application
- `S3_ENDPOINT`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET` - S3 storage configuration
- `RESEND_API_KEY` - Email service API key

### Deploying to Vercel

This application can be deployed to Vercel:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Ensure MongoDB is accessible from Vercel's network
4. Deploy with `git push` or Vercel CLI

### Self-hosting

Deploy to any Node.js hosting platform:

- VPS or dedicated server
- DigitalOcean App Platform
- AWS, Google Cloud, or Azure
- Coolify or Dokku

See the [Payload deployment documentation](https://payloadcms.com/docs/production/deployment) for detailed guidance.

## Environment Variables

Copy `.env.example` to `.env` and configure:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection URL | Yes |
| `PAYLOAD_SECRET` | Payload CMS secret | Yes |
| `NEXT_PUBLIC_SERVER_URL` | Public site URL | Yes |
| `S3_ENDPOINT` | S3-compatible storage endpoint | Yes |
| `S3_ACCESS_KEY_ID` | S3 access key | Yes |
| `S3_SECRET_ACCESS_KEY` | S3 secret key | Yes |
| `S3_BUCKET` | S3 bucket name | Yes |
| `RESEND_API_KEY` | Resend email API key | Yes |
| `NEXT_PUBLIC_IS_LIVE` | Live site flag | No |

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm generate:types` | Generate TypeScript types |
| `pnpm generate:importmap` | Generate import map |
| `pnpm test` | Run all tests |
| `pnpm test:e2e` | Run Playwright E2E tests |
| `pnpm test:int` | Run Vitest integration tests |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |

## Support

For issues related to:
- **Payload CMS**: See [Payload Documentation](https://payloadcms.com/docs) or [Discord](https://discord.com/invite/payload)
- **This Project**: Contact the development team or create an issue in the repository
