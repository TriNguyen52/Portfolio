"use client";

import Link from "next/link";
import { ProjectCard } from "@/components/Project_card";
import type { Project } from "@/types";

// Sample project data - replace with your actual projects
const projects: Project[] = [
	{
		id: "1",
		title: "E-Commerce Platform",
		description:
			"A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
		image: "/api/placeholder/400/300",
		technologies: [
			"Next.js",
			"TypeScript",
			"Stripe",
			"PostgreSQL",
			"Tailwind CSS",
		],
		githubUrl: "https://github.com/yourusername/ecommerce",
		liveUrl: "https://your-ecommerce-demo.vercel.app",
	},
	{
		id: "2",
		title: "Task Management App",
		description:
			"A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
		image: "/api/placeholder/400/300",
		technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
		githubUrl: "https://github.com/yourusername/task-manager",
		liveUrl: "https://your-task-manager.vercel.app",
	},
	{
		id: "3",
		title: "Weather Dashboard",
		description:
			"A responsive weather dashboard that displays current conditions, forecasts, and interactive maps using weather APIs.",
		image: "/api/placeholder/400/300",
		technologies: ["React", "Weather API", "Chart.js", "CSS3"],
		githubUrl: "https://github.com/yourusername/weather-dashboard",
		liveUrl: "https://your-weather-app.vercel.app",
	},
	{
		id: "4",
		title: "Portfolio Website",
		description:
			"A modern, responsive portfolio website showcasing projects and skills with smooth animations and optimized performance.",
		image: "/api/placeholder/400/300",
		technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
		githubUrl: "https://github.com/yourusername/portfolio",
		liveUrl: "https://your-portfolio.vercel.app",
	},
	{
		id: "5",
		title: "Blog Platform",
		description:
			"A full-featured blog platform with markdown support, comments system, and content management capabilities.",
		image: "/api/placeholder/400/300",
		technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
		githubUrl: "https://github.com/yourusername/blog-platform",
		liveUrl: "https://your-blog.vercel.app",
	},
	{
		id: "6",
		title: "Chat Application",
		description:
			"Real-time chat application with multiple rooms, file sharing, and user presence indicators.",
		image: "/api/placeholder/400/300",
		technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
		githubUrl: "https://github.com/yourusername/chat-app",
		liveUrl: "https://your-chat-app.vercel.app",
	},
];

export function ProjectGrid() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{projects.map((project) => (
				<Link key={project.id} href={`/Projects/${project.id}`}>
					<ProjectCard project={project} />
				</Link>
			))}
		</div>
	);
}
