import { BlogGrid } from "../../components/BlogGrid";

export default function BlogsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology, 
            and my journey as a developer.
          </p>
        </div>
        <div className="w-full">
          <BlogGrid />
        </div>
      </div>
    </main>
  );
}