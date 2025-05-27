import Link from "next/link";
import { BlogCard } from "./BlogCard";
import type { BlogPost } from "@/types";

// Sample blog data - replace with your actual blog posts
const blogPosts: BlogPost[] = [
	{
		id: "1",
		title: "Getting Started with Next.js 15: A Complete Guide",
		excerpt:
			"Learn how to build modern web applications with Next.js 15, including the latest features like the App Router, Server Components, and more.",
		content: "Full blog content would go here...",
		date: "2024-03-15",
		readTime: "8 min read",
		tags: ["Next.js", "React", "Web Development"],
		image: "/api/placeholder/400/200",
	},
	{
		id: "2",
		title: "Building Responsive UIs with Tailwind CSS",
		excerpt:
			"Discover best practices for creating beautiful, responsive user interfaces using Tailwind CSS utility classes and components.",
		content: "Full blog content would go here...",
		date: "2024-03-10",
		readTime: "6 min read",
		tags: ["CSS", "Tailwind", "UI/UX"],
		image: "/api/placeholder/400/200",
	},
	{
		id: "3",
		title: "TypeScript Best Practices for React Developers",
		excerpt:
			"Essential TypeScript patterns and practices that will make your React applications more robust and maintainable.",
		content: "Full blog content would go here...",
		date: "2024-03-05",
		readTime: "10 min read",
		tags: ["TypeScript", "React", "Best Practices"],
		image: "/api/placeholder/400/200",
	},
	{
		id: "4",
		title: "Database Design Principles for Modern Applications",
		excerpt:
			"Learn the fundamental principles of database design and how to structure your data for scalability and performance.",
		content: "Full blog content would go here...",
		date: "2024-02-28",
		readTime: "12 min read",
		tags: ["Database", "PostgreSQL", "Backend"],
		image: "/api/placeholder/400/200",
	},
	{
		id: "5",
		title: "Deploying Full-Stack Applications to Vercel",
		excerpt:
			"A step-by-step guide to deploying your full-stack applications to Vercel with continuous integration and custom domains.",
		content: "Full blog content would go here...",
		date: "2024-02-20",
		readTime: "7 min read",
		tags: ["Deployment", "Vercel", "DevOps"],
		image: "/api/placeholder/400/200",
	},
	{
		id: "6",
		title: "The Future of Web Development: Trends to Watch",
		excerpt:
			"Explore the emerging trends and technologies that are shaping the future of web development in 2024 and beyond.",
		content: "Full blog content would go here...",
		date: "2024-02-15",
		readTime: "9 min read",
		tags: ["Trends", "Web Development", "Future"],
		image: "/api/placeholder/400/200",
	},
];

export function BlogGrid() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{blogPosts.map((post) => (
				<Link key={post.id} href={`/Blogs/${post.id}`}>
					<BlogCard post={post} />
				</Link>
			))}
		</div>
	);
}
