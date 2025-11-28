export interface ContentItem {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  content: string
}

export const allContent: ContentItem[] = [
  // Linux Commands
  {
    slug: "linux-file-operations",
    title: "Linux File Operations",
    description: "Essential commands for file and directory management in Linux",
    category: "Linux",
    tags: ["files", "directories", "permissions", "basic"],
    content: `# Linux File Operations

Essential commands for managing files and directories in Linux.

## Listing Files

\`\`\`bash
# List files in current directory
ls

# List with details (permissions, size, date)
ls -la

# List with human-readable sizes
ls -lh

# List sorted by modification time
ls -lt
\`\`\`

## Creating and Removing

\`\`\`bash
# Create a directory
mkdir my-folder

# Create nested directories
mkdir -p path/to/nested/folder

# Create an empty file
touch newfile.txt

# Remove a file
rm file.txt

# Remove a directory recursively
rm -rf directory/
\`\`\`

## Copying and Moving

\`\`\`bash
# Copy a file
cp source.txt destination.txt

# Copy a directory recursively
cp -r source-dir/ destination-dir/

# Move or rename
mv oldname.txt newname.txt
mv file.txt /new/location/
\`\`\`

## File Permissions

\`\`\`bash
# Change permissions (read, write, execute)
chmod 755 script.sh
chmod +x script.sh

# Change ownership
chown user:group file.txt

# Change ownership recursively
chown -R user:group directory/
\`\`\`
`,
  },
  {
    slug: "linux-text-processing",
    title: "Linux Text Processing",
    description: "Commands for searching, filtering, and manipulating text",
    category: "Linux",
    tags: ["grep", "sed", "awk", "text"],
    content: `# Linux Text Processing

Powerful commands for text manipulation and searching.

## grep - Search Text

\`\`\`bash
# Search for pattern in file
grep "pattern" file.txt

# Case-insensitive search
grep -i "pattern" file.txt

# Recursive search in directories
grep -r "pattern" /path/to/dir

# Show line numbers
grep -n "pattern" file.txt

# Invert match (show non-matching lines)
grep -v "pattern" file.txt
\`\`\`

## sed - Stream Editor

\`\`\`bash
# Replace first occurrence per line
sed 's/old/new/' file.txt

# Replace all occurrences
sed 's/old/new/g' file.txt

# Edit file in place
sed -i 's/old/new/g' file.txt

# Delete lines matching pattern
sed '/pattern/d' file.txt
\`\`\`

## awk - Pattern Processing

\`\`\`bash
# Print specific column
awk '{print $1}' file.txt

# Print multiple columns
awk '{print $1, $3}' file.txt

# Field separator
awk -F':' '{print $1}' /etc/passwd

# Sum a column
awk '{sum += $1} END {print sum}' numbers.txt
\`\`\`

## Other Useful Commands

\`\`\`bash
# Count lines, words, characters
wc -l file.txt

# Sort lines
sort file.txt

# Remove duplicate lines
sort -u file.txt

# First/last lines
head -n 10 file.txt
tail -n 10 file.txt

# Follow file updates in real-time
tail -f logfile.log
\`\`\`
`,
  },
  {
    slug: "linux-process-management",
    title: "Linux Process Management",
    description: "Monitor and control running processes",
    category: "Linux",
    tags: ["processes", "ps", "top", "kill"],
    content: `# Linux Process Management

Commands for monitoring and controlling system processes.

## Viewing Processes

\`\`\`bash
# List all processes
ps aux

# Interactive process viewer
top

# Better alternative to top
htop

# Tree view of processes
pstree

# Find process by name
pgrep nginx
ps aux | grep nginx
\`\`\`

## Managing Processes

\`\`\`bash
# Kill process by PID
kill 1234

# Force kill
kill -9 1234

# Kill by name
pkill nginx
killall nginx

# Run in background
command &

# Bring to foreground
fg

# List background jobs
jobs
\`\`\`

## System Resources

\`\`\`bash
# Memory usage
free -h

# Disk usage
df -h

# Directory size
du -sh /path/to/dir

# System uptime
uptime

# Who is logged in
who
w
\`\`\`
`,
  },

  // Docker Commands
  {
    slug: "docker-basics",
    title: "Docker Basics",
    description: "Fundamental Docker commands for container management",
    category: "Docker",
    tags: ["containers", "images", "run", "basic"],
    content: `# Docker Basics

Essential Docker commands for everyday container management.

## Container Lifecycle

\`\`\`bash
# Run a container
docker run nginx

# Run in detached mode
docker run -d nginx

# Run with port mapping
docker run -d -p 8080:80 nginx

# Run with name
docker run -d --name my-nginx nginx

# Run with environment variables
docker run -d -e MY_VAR=value nginx

# Run with volume mount
docker run -d -v /host/path:/container/path nginx
\`\`\`

## Managing Containers

\`\`\`bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop container_name

# Start a stopped container
docker start container_name

# Restart a container
docker restart container_name

# Remove a container
docker rm container_name

# Force remove running container
docker rm -f container_name
\`\`\`

## Container Interaction

\`\`\`bash
# Execute command in container
docker exec -it container_name bash

# View container logs
docker logs container_name

# Follow logs
docker logs -f container_name

# Copy files to/from container
docker cp file.txt container_name:/path/
docker cp container_name:/path/file.txt ./
\`\`\`
`,
  },
  {
    slug: "docker-images",
    title: "Docker Images",
    description: "Building and managing Docker images",
    category: "Docker",
    tags: ["images", "build", "dockerfile", "registry"],
    content: `# Docker Images

Commands for building and managing Docker images.

## Working with Images

\`\`\`bash
# List images
docker images

# Pull an image
docker pull nginx:latest

# Remove an image
docker rmi nginx:latest

# Remove unused images
docker image prune

# Remove all unused images
docker image prune -a
\`\`\`

## Building Images

\`\`\`bash
# Build from Dockerfile
docker build -t my-image:tag .

# Build with different Dockerfile
docker build -f Dockerfile.prod -t my-image:prod .

# Build with build arguments
docker build --build-arg VERSION=1.0 -t my-image .

# Build without cache
docker build --no-cache -t my-image .
\`\`\`

## Example Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

## Registry Operations

\`\`\`bash
# Login to registry
docker login

# Tag image for registry
docker tag my-image:latest registry.example.com/my-image:latest

# Push to registry
docker push registry.example.com/my-image:latest

# Pull from registry
docker pull registry.example.com/my-image:latest
\`\`\`
`,
  },
  {
    slug: "docker-compose",
    title: "Docker Compose",
    description: "Multi-container application management with Docker Compose",
    category: "Docker",
    tags: ["compose", "multi-container", "yaml", "services"],
    content: `# Docker Compose

Manage multi-container applications with Docker Compose.

## Basic Commands

\`\`\`bash
# Start services
docker compose up

# Start in detached mode
docker compose up -d

# Stop services
docker compose down

# Stop and remove volumes
docker compose down -v

# Rebuild images
docker compose up --build

# View logs
docker compose logs

# Follow logs
docker compose logs -f
\`\`\`

## Service Management

\`\`\`bash
# List services
docker compose ps

# Scale a service
docker compose up -d --scale web=3

# Execute command in service
docker compose exec web bash

# View service logs
docker compose logs web
\`\`\`

## Example docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/app
    depends_on:
      - db
    volumes:
      - ./app:/app

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=app
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`
`,
  },

  // Git Commands
  {
    slug: "git-basics",
    title: "Git Basics",
    description: "Fundamental Git commands for version control",
    category: "Git",
    tags: ["version-control", "commit", "branch", "basic"],
    content: `# Git Basics

Essential Git commands for everyday version control.

## Repository Setup

\`\`\`bash
# Initialize a new repository
git init

# Clone a repository
git clone https://github.com/user/repo.git

# Clone with specific branch
git clone -b branch-name https://github.com/user/repo.git
\`\`\`

## Basic Workflow

\`\`\`bash
# Check status
git status

# Add files to staging
git add file.txt
git add .
git add -A

# Commit changes
git commit -m "Commit message"

# Add and commit in one step
git commit -am "Commit message"

# Push to remote
git push origin main

# Pull from remote
git pull origin main
\`\`\`

## Viewing History

\`\`\`bash
# View commit history
git log

# Compact log
git log --oneline

# Graph view
git log --oneline --graph --all

# Show changes in commit
git show commit_hash

# Show file differences
git diff
git diff --staged
\`\`\`
`,
  },
  {
    slug: "git-branching",
    title: "Git Branching",
    description: "Branch management and merging strategies",
    category: "Git",
    tags: ["branches", "merge", "rebase", "workflow"],
    content: `# Git Branching

Commands for branch management and merging.

## Branch Operations

\`\`\`bash
# List branches
git branch
git branch -a  # Include remote branches

# Create a branch
git branch feature-name

# Switch to branch
git checkout feature-name
git switch feature-name  # Modern alternative

# Create and switch
git checkout -b feature-name
git switch -c feature-name

# Delete branch
git branch -d feature-name
git branch -D feature-name  # Force delete
\`\`\`

## Merging

\`\`\`bash
# Merge branch into current
git merge feature-name

# Merge with no fast-forward
git merge --no-ff feature-name

# Abort merge
git merge --abort
\`\`\`

## Rebasing

\`\`\`bash
# Rebase current branch onto main
git rebase main

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Continue after resolving conflicts
git rebase --continue

# Abort rebase
git rebase --abort
\`\`\`

## Remote Branches

\`\`\`bash
# Fetch remote branches
git fetch origin

# Track remote branch
git checkout -b local-branch origin/remote-branch

# Push new branch to remote
git push -u origin feature-name

# Delete remote branch
git push origin --delete feature-name
\`\`\`
`,
  },
  {
    slug: "git-advanced",
    title: "Git Advanced",
    description: "Advanced Git commands for power users",
    category: "Git",
    tags: ["stash", "reset", "cherry-pick", "advanced"],
    content: `# Git Advanced

Advanced Git commands for complex workflows.

## Stashing

\`\`\`bash
# Stash changes
git stash

# Stash with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply latest stash
git stash pop

# Apply specific stash
git stash apply stash@{2}

# Drop a stash
git stash drop stash@{0}
\`\`\`

## Resetting

\`\`\`bash
# Unstage files
git reset HEAD file.txt

# Soft reset (keep changes staged)
git reset --soft HEAD~1

# Mixed reset (keep changes unstaged)
git reset HEAD~1

# Hard reset (discard changes)
git reset --hard HEAD~1

# Reset to specific commit
git reset --hard commit_hash
\`\`\`

## Cherry Picking

\`\`\`bash
# Apply specific commit to current branch
git cherry-pick commit_hash

# Cherry pick without committing
git cherry-pick -n commit_hash

# Cherry pick range
git cherry-pick start_hash..end_hash
\`\`\`

## Other Useful Commands

\`\`\`bash
# Amend last commit
git commit --amend

# Revert a commit (creates new commit)
git revert commit_hash

# Find commit that introduced bug
git bisect start
git bisect bad
git bisect good commit_hash

# Clean untracked files
git clean -fd
\`\`\`
`,
  },

  // uv Commands
  {
    slug: "uv-basics",
    title: "uv Package Manager",
    description: "Fast Python package and project management with uv",
    category: "uv",
    tags: ["python", "packages", "virtual-env", "fast"],
    content: `# uv Package Manager

Ultra-fast Python package and project management.

## Installation

\`\`\`bash
# Install uv (macOS/Linux)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install via pip
pip install uv

# Install via Homebrew
brew install uv
\`\`\`

## Project Management

\`\`\`bash
# Create a new project
uv init my-project

# Create project with specific Python
uv init --python 3.12 my-project

# Sync dependencies
uv sync

# Add a dependency
uv add requests

# Add dev dependency
uv add --dev pytest

# Remove a dependency
uv remove requests
\`\`\`

## Package Management

\`\`\`bash
# Install packages
uv pip install requests

# Install from requirements.txt
uv pip install -r requirements.txt

# Install in editable mode
uv pip install -e .

# Compile requirements
uv pip compile requirements.in -o requirements.txt

# Sync environment with requirements
uv pip sync requirements.txt
\`\`\`

## Virtual Environments

\`\`\`bash
# Create virtual environment
uv venv

# Create with specific Python version
uv venv --python 3.12

# Activate (Unix)
source .venv/bin/activate

# Activate (Windows)
.venv\\Scripts\\activate
\`\`\`

## Running Python

\`\`\`bash
# Run a script
uv run python script.py

# Run with specific package
uv run --with requests python -c "import requests"

# Run a tool
uv tool run ruff check .
\`\`\`
`,
  },

  // Miniconda Commands
  {
    slug: "miniconda-basics",
    title: "Miniconda Basics",
    description: "Environment and package management with Conda",
    category: "Miniconda",
    tags: ["conda", "environments", "python", "data-science"],
    content: `# Miniconda Basics

Environment and package management with Conda.

## Environment Management

\`\`\`bash
# Create environment
conda create -n myenv python=3.11

# Create from file
conda env create -f environment.yml

# Activate environment
conda activate myenv

# Deactivate environment
conda deactivate

# List environments
conda env list

# Remove environment
conda env remove -n myenv

# Export environment
conda env export > environment.yml
\`\`\`

## Package Management

\`\`\`bash
# Install package
conda install numpy

# Install specific version
conda install numpy=1.24

# Install from conda-forge
conda install -c conda-forge package-name

# Update package
conda update numpy

# Update all packages
conda update --all

# Remove package
conda remove numpy

# List installed packages
conda list
\`\`\`

## Example environment.yml

\`\`\`yaml
name: data-science
channels:
  - conda-forge
  - defaults
dependencies:
  - python=3.11
  - numpy
  - pandas
  - scikit-learn
  - jupyter
  - pip:
    - some-pip-package
\`\`\`

## Conda Configuration

\`\`\`bash
# Add channel
conda config --add channels conda-forge

# Set channel priority
conda config --set channel_priority strict

# Show configuration
conda config --show

# Clean cache
conda clean --all
\`\`\`
`,
  },

  // Kubernetes Commands
  {
    slug: "kubectl-basics",
    title: "kubectl Basics",
    description: "Essential kubectl commands for Kubernetes management",
    category: "Kubernetes",
    tags: ["kubectl", "pods", "deployments", "services"],
    content: `# kubectl Basics

Essential commands for Kubernetes cluster management.

## Cluster Information

\`\`\`bash
# View cluster info
kubectl cluster-info

# Get nodes
kubectl get nodes

# View current context
kubectl config current-context

# List contexts
kubectl config get-contexts

# Switch context
kubectl config use-context my-cluster
\`\`\`

## Working with Resources

\`\`\`bash
# Get resources
kubectl get pods
kubectl get services
kubectl get deployments
kubectl get all

# Get with more details
kubectl get pods -o wide

# Get YAML output
kubectl get pod my-pod -o yaml

# Describe resource
kubectl describe pod my-pod

# Watch resources
kubectl get pods -w
\`\`\`

## Creating Resources

\`\`\`bash
# Apply manifest
kubectl apply -f manifest.yaml

# Create from file
kubectl create -f manifest.yaml

# Create deployment
kubectl create deployment nginx --image=nginx

# Expose as service
kubectl expose deployment nginx --port=80 --type=LoadBalancer
\`\`\`

## Debugging

\`\`\`bash
# View pod logs
kubectl logs pod-name

# Follow logs
kubectl logs -f pod-name

# Logs from specific container
kubectl logs pod-name -c container-name

# Execute in pod
kubectl exec -it pod-name -- bash

# Port forward
kubectl port-forward pod-name 8080:80
\`\`\`
`,
  },
  {
    slug: "helm-basics",
    title: "Helm Package Manager",
    description: "Kubernetes package management with Helm charts",
    category: "Kubernetes",
    tags: ["helm", "charts", "releases", "packages"],
    content: `# Helm Package Manager

Kubernetes package management with Helm.

## Repository Management

\`\`\`bash
# Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Update repositories
helm repo update

# List repositories
helm repo list

# Search for charts
helm search repo nginx
helm search hub nginx
\`\`\`

## Installing Charts

\`\`\`bash
# Install a chart
helm install my-release bitnami/nginx

# Install with custom values
helm install my-release bitnami/nginx -f values.yaml

# Install with set values
helm install my-release bitnami/nginx --set service.type=LoadBalancer

# Install in namespace
helm install my-release bitnami/nginx -n my-namespace

# Dry run
helm install my-release bitnami/nginx --dry-run
\`\`\`

## Managing Releases

\`\`\`bash
# List releases
helm list
helm list -A  # All namespaces

# Upgrade release
helm upgrade my-release bitnami/nginx

# Rollback release
helm rollback my-release 1

# Uninstall release
helm uninstall my-release

# Get release status
helm status my-release

# Get release history
helm history my-release
\`\`\`

## Working with Charts

\`\`\`bash
# Show chart values
helm show values bitnami/nginx

# Download chart
helm pull bitnami/nginx

# Create new chart
helm create my-chart

# Package chart
helm package my-chart

# Lint chart
helm lint my-chart
\`\`\`
`,
  },
  {
    slug: "kustomize-basics",
    title: "Kustomize",
    description: "Kubernetes native configuration management",
    category: "Kubernetes",
    tags: ["kustomize", "overlays", "patches", "configuration"],
    content: `# Kustomize

Kubernetes native configuration management.

## Basic Commands

\`\`\`bash
# Build kustomization
kubectl kustomize ./

# Apply kustomization
kubectl apply -k ./

# Preview changes
kubectl diff -k ./

# Build to file
kubectl kustomize ./ > output.yaml
\`\`\`

## Example Structure

\`\`\`
├── base/
│   ├── kustomization.yaml
│   ├── deployment.yaml
│   └── service.yaml
└── overlays/
    ├── dev/
    │   └── kustomization.yaml
    └── prod/
        ├── kustomization.yaml
        └── replica-patch.yaml
\`\`\`

## Base kustomization.yaml

\`\`\`yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml

commonLabels:
  app: my-app
\`\`\`

## Overlay kustomization.yaml

\`\`\`yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

namePrefix: prod-

namespace: production

patches:
  - path: replica-patch.yaml

configMapGenerator:
  - name: app-config
    literals:
      - ENV=production
\`\`\`

## Patch Example

\`\`\`yaml
# replica-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
\`\`\`
`,
  },
]

export const categories = [
  { name: "Linux", slug: "linux", count: allContent.filter((c) => c.category === "Linux").length },
  { name: "Docker", slug: "docker", count: allContent.filter((c) => c.category === "Docker").length },
  { name: "Git", slug: "git", count: allContent.filter((c) => c.category === "Git").length },
  { name: "uv", slug: "uv", count: allContent.filter((c) => c.category === "uv").length },
  { name: "Miniconda", slug: "miniconda", count: allContent.filter((c) => c.category === "Miniconda").length },
  { name: "Kubernetes", slug: "kubernetes", count: allContent.filter((c) => c.category === "Kubernetes").length },
]

export function getContentBySlug(slug: string): ContentItem | undefined {
  return allContent.find((item) => item.slug === slug)
}

export function getContentByCategory(categorySlug: string): ContentItem[] {
  const category = categories.find((c) => c.slug === categorySlug)
  if (!category) return []
  return allContent.filter((item) => item.category === category.name)
}
