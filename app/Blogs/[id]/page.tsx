import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";

// Sample blog data - in a real app, this would come from a CMS or database
const blogPosts = {
  "1": {
    id: "1",
    title: "Getting Started with Next.js 15: A Complete Guide",
    excerpt: "Learn how to build modern web applications with Next.js 15, including the latest features like the App Router, Server Components, and more.",
    content: `
# Getting Started with Next.js 15: A Complete Guide

Next.js 15 represents a significant milestone in the evolution of React-based web development. With its enhanced App Router, improved Server Components, and better performance optimizations, it's never been easier to build modern, scalable web applications.

## What's New in Next.js 15?

Next.js 15 introduces several groundbreaking features:

### Enhanced App Router
The App Router has been refined with better performance and developer experience. Route groups, parallel routes, and intercepting routes make complex application structures more manageable.

### Improved Server Components
Server Components now offer better performance with reduced hydration overhead and improved streaming capabilities.

### Better TypeScript Support
Enhanced TypeScript integration with improved type inference and better error messages.

## Setting Up Your First Next.js 15 Project

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Key Concepts to Master

1. **File-based Routing**: Understanding how the file system maps to routes
2. **Server vs Client Components**: Knowing when to use each type
3. **Data Fetching**: Utilizing the new fetch API and caching strategies
4. **Styling**: Integrating CSS modules, styled-jsx, or Tailwind CSS

## Best Practices

- Use Server Components by default
- Implement proper error boundaries
- Optimize images with next/image
- Leverage the built-in performance features

## Conclusion

Next.js 15 continues to push the boundaries of what's possible in web development. By mastering these concepts, you'll be well-equipped to build modern, performant applications.
    `,
    date: "2024-03-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"]
  },
  // Add more blog posts as needed
};

interface BlogDetailPageProps {
  params: { id: string };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts[params.id as keyof typeof blogPosts];
  
  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/Blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none">
          <div className="whitespace-pre-wrap">
            {post.content}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              Thanks for reading! If you enjoyed this post, please share it.
            </p>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Article
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}
