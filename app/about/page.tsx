import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, Github, MapPin } from "lucide-react"

const skills = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Kubernetes",
  "Docker",
  "MLflow",
  "Kubeflow",
  "Apache Airflow",
  "Git",
  "CI/CD",
  "AWS",
  "GCP",
  "Linux",
  "Bash",
  "SQL",
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-8 md:px-8 lg:px-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">About Me</h1>
            <p className="text-muted-foreground mb-8">Get to know more about my background and skills</p>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm Mustafa Çavuşoğlu, an ML/MLOps Engineer passionate about building scalable machine learning
                    systems. I specialize in taking ML models from experimentation to production, focusing on
                    automation, monitoring, and infrastructure.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    With a strong background in both software engineering and data science, I bridge the gap between
                    research and production. I believe in clean code, reproducible experiments, and robust deployment
                    pipelines.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Skills & Technologies</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Contact</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Turkey</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href="mailto:contact@example.com" className="hover:text-primary">
                        contact@example.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Linkedin className="h-4 w-4" />
                      <a href="#" className="hover:text-primary">
                        LinkedIn Profile
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Github className="h-4 w-4" />
                      <a href="#" className="hover:text-primary">
                        GitHub Profile
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
