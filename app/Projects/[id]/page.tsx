import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Sample project data - in a real app, this would come from a database or CMS
const projectDetails = {
  "1": {
    id: "1",
    title: "E-Commerce Platform",
    description: "A comprehensive e-commerce platform built with modern web technologies, featuring user authentication, payment processing, inventory management, and an intuitive admin dashboard.",
    longDescription: `This full-stack e-commerce platform was designed to provide a seamless shopping experience for users while offering powerful management tools for administrators. The project showcases modern web development practices and integrates multiple third-party services.

Key features include:
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and checkout process
- Stripe payment integration
- Order management system
- Admin dashboard for inventory management
- Responsive design for all devices

The application is built with performance in mind, utilizing Next.js for server-side rendering and optimal loading times. The database design ensures scalability and data integrity.`,
    image: "https://via.placeholder.com/800x400/6366f1/ffffff?text=E-Commerce+Platform",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS", "Prisma", "NextAuth.js"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://your-ecommerce-demo.vercel.app",
    features: [
      "User Authentication & Authorization",
      "Product Catalog Management",
      "Shopping Cart & Checkout",
      "Payment Processing with Stripe",
      "Order Management System",
      "Admin Dashboard",
      "Responsive Design",
      "SEO Optimized"
    ],
    challenges: [
      "Implementing secure payment processing",
      "Optimizing database queries for large product catalogs",
      "Creating a scalable admin interface",
      "Ensuring mobile responsiveness across all features"
    ]
  },
  // Add more projects as needed
};

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = projectDetails[id as keyof typeof projectDetails];
  
  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/Projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-4">
            {project.githubUrl && (
              <Button asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            
            {project.liveUrl && (
              <Button variant="outline" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="mb-12">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
              <div className="prose prose-gray max-w-none">
                {project.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {project.challenges && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Technical Challenges</h2>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
