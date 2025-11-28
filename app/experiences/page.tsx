import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    title: "MLOps Engineer",
    company: "Intertech",
    period: "Nov 2025 - Present",
    location: "Hybrid",
    description:
      "Deploying machine learning models at scale. Developing MLOps infrastructure and CI/CD pipelines for ML workflows using RedHat Openshift Cluster.",
    technologies: ["Python", "Kubernetes", "MLflow", "Docker", "AWS"],
  },
  {
    title: "Data Scientist",
    company: "Teknosa",
    period: "Sept 2023 - Oct 2025",
    location: "Hybrid",
    description:"Developed end-to-end data pipelines for predictive modeling using Dask and SQL.",
    technologies: ["Python", "Dask", "SQL", "FastAPI"],
  },
  {
    title: "AI Engineer",
    company: "MLP Care",
    period: "Sept 2022 - Sept 2023",
    location: "Hybrid",
    description: "Develop deep learning–based computer vision models for mammography analysis.",
    technologies: ["Python", "HPC", "Bash"],
  },
]

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-8 md:px-8 lg:px-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Experiences</h1>
            <p className="text-muted-foreground mb-8">My professional journey and work history</p>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border ml-4 md:ml-6" />

              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-12 md:pl-16">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-2 w-9 h-9 md:w-13 md:h-13 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                          <h2 className="text-xl font-semibold">{exp.title}</h2>
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                        <p className="text-primary font-medium mb-1">{exp.company}</p>
                        <p className="text-sm text-muted-foreground mb-4">{exp.location}</p>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
