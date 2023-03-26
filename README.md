# Libera Frontend

This is a [Next.js](https://nextjs.org/) project that has been bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It includes an API route and uses `next/font` for automatic font optimization.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Then, open http://localhost:3000 in your browser to see the result. The page auto-updates as you edit the pages/index.tsx file.

**Alternatively**, you can use Docker to initialize the project. First, build the Docker image:

`docker build -t front .`

Then, run the Docker container:

`docker run -p 3000:3000 front`

This will expose the application on http://localhost:3000 as well.

## API Routes

This project include [API routes](https://nextjs.org/docs/api-routes/introduction) that can be accessed at [http://localhost:3000/api/hello](http://localhost:3000/api/hello). You can edit this endpoint in `pages/api/hello.ts`. The `pages/api` directory is mapped to `/api/*` and any file in this directory is treated as an [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
