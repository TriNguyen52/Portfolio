import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TechStackSection() {
  const techCategories = [
    {
      title: "Frontend",
      technologies: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"
      ]
    },
    {
      title: "Backend",
      technologies: [
        "Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL"
      ]
    },
    {
      title: "Tools & Others",
      technologies: [
        "Git", "Docker", "AWS", "Vercel", "Figma", "VS Code", "Linux"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techCategories.map((category, index) => (
            <Card key={index} className="h-full w-full max-w-md mx-auto md:mx-0">
              <CardHeader>
                <CardTitle className="text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
