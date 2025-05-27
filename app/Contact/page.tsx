import { ContactForm } from "../../components/ContactForm";
import { ContactInfo } from "../../components/ContactInfo";
import { ResumeSection } from "../../components/ResumeSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            I&apos;m always interested in new opportunities and exciting projects.
            Feel free to reach out if you&apos;d like to work together!
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <ContactInfo />
          <ContactForm />
        </div>
        <ResumeSection />
      </div>
    </main>
  );
}