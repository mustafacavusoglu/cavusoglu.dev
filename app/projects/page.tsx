import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Star } from "lucide-react"

const projects = [
  {
    name: "RAG-Langchain",
    description: "RAG Chat application using Langchain, OpenAI and Streamlit",
    url: "https://github.com/mustafacavusoglu/RAG-Langchain",
    language: "Python",
    stars: 3,
  },
  {
    name: "fast-api-yolov5-deploy-on-aws",
    description: "YOLOv5 model deployment on AWS using FastAPI",
    url: "https://github.com/mustafacavusoglu/fast-api-yolov5-deploy-on-aws",
    language: "Python",
    stars: 1,
  },
  {
    name: "pytube-PyQt5",
    description: "YouTube video downloader desktop application built with PyQt5",
    url: "https://github.com/mustafacavusoglu/pytube-PyQt5",
    language: "Python",
    stars: 1,
  },
  {
    name: "PyTorch-Training-Script",
    description: "Reusable PyTorch training script template for deep learning projects",
    url: "https://github.com/mustafacavusoglu/PyTorch-Training-Script",
    language: "Python",
    stars: 1,
  },
  {
    name: "yolo-5-7-DataPrep",
    description: "Mask olan segmentation verilerinden yolo modelleri için eğitim verilerinin hazırlanması",
    url: "https://github.com/mustafacavusoglu/yolo-5-7-DataPrep",
    language: "Python",
    stars: 1,
  },
  {
    name: "segmentation-flask-app",
    description: "Image segmentation web application built with Flask",
    url: "https://github.com/mustafacavusoglu/segmentation-flask-app",
    language: "JavaScript",
    stars: 1,
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container px-4 py-8 md:px-8 lg:px-12 max-w-5xl">
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground mb-8">Open source projects and side work on GitHub</p>

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <Card key={index} className="group hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="truncate">{project.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span>{project.stars}</span>
                        </div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description || "No description available"}
                    </p>
                    <Badge variant="secondary">{project.language}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
