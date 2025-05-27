import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m a passionate developer with a love for creating innovative solutions
            and bringing ideas to life through code.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-muted-foreground leading-relaxed">
                With over X years of experience in web development, I&apos;ve had the 
                privilege of working on diverse projects ranging from small business 
                websites to large-scale enterprise applications. My passion lies in 
                creating user-centered solutions that are both beautiful and functional.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">What I Do</h3>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in full-stack web development, with expertise in modern 
                JavaScript frameworks, responsive design, and cloud technologies. 
                I believe in writing clean, maintainable code and following best 
                practices to deliver high-quality solutions.
              </p>
            </div>
          </div>
          <Card className="w-full max-w-md mx-auto md:mx-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span>Your City, Country</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span>X+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects</span>
                  <span>XX+ Completed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Focus</span>
                  <span>Full Stack Development</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
