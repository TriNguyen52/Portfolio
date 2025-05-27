import { ProjectGrid } from "../../components/ProjectGrid";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A collection of projects I&apos;ve worked on, showcasing my skills and passion
            for creating innovative solutions.
          </p>
        </div>
        <div className="w-full">
          <ProjectGrid />
        </div>
      </div>
    </main>
  );
}