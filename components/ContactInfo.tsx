import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "your.email@example.com",
      href: "mailto:your.email@example.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Your City, Country",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/yourusername"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/yourusername"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/yourusername"
    }
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{method.label}</p>
                  {method.href === "#" ? (
                    <p className="font-medium">{method.value}</p>
                  ) : (
                    <a 
                      href={method.href}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {method.value}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Follow Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Button key={index} variant="outline" size="icon" asChild>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Let&apos;s Work Together</h3>
          <p className="text-muted-foreground text-sm">
            I&apos;m currently available for freelance work and new opportunities. 
            Whether you have a project in mind or just want to chat about technology, 
            I&apos;d love to hear from you!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
