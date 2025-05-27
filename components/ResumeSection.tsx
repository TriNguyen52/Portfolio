import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Briefcase, GraduationCap, Award } from "lucide-react";

export function ResumeSection() {
  const experience = [
    {
      title: "Senior Full Stack Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description: "Led development of multiple web applications using React, Next.js, and Node.js"
    },
    {
      title: "Full Stack Developer",
      company: "Startup Co.",
      period: "2020 - 2022",
      description: "Developed and maintained full-stack applications using modern web technologies"
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "University Name",
      period: "2016 - 2020",
      description: "Graduated with honors, focused on software engineering and web development"
    }
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", 
    "PostgreSQL", "MongoDB", "AWS", "Docker", "Git", "Tailwind CSS"
  ];

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Resume</h2>
        <p className="text-muted-foreground mb-6">
          Download my resume or view my experience and qualifications below
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <a href="/resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <Eye className="mr-2 h-4 w-4" />
              View Online
            </a>
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-sm text-muted-foreground">{exp.company} • {exp.period}</p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-4">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-sm text-muted-foreground">{edu.school} • {edu.period}</p>
                <p className="text-sm mt-2">{edu.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Technical Skills
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
