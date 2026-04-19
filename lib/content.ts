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

## Building and Running from Dockerfile

\`\`\`bash
# Build image from Dockerfile in current directory
docker build -t my-app:latest .

# Build with a specific Dockerfile
docker build -f Dockerfile.prod -t my-app:prod .

# Build with build arguments
docker build --build-arg NODE_ENV=production -t my-app .

# Build without cache
docker build --no-cache -t my-app .

# Run the built image
docker run -d -p 3000:3000 --name my-app my-app:latest

# Tag and push to registry
docker tag my-app:latest registry.example.com/my-app:latest
docker push registry.example.com/my-app:latest
\`\`\`

## Cleanup

\`\`\`bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove all unused resources (containers, images, networks, volumes)
docker system prune -a

# Check disk usage
docker system df
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
    title: "Docker Compose Basics",
    description: "Multi-container application management with Docker Compose",
    category: "Docker",
    tags: ["compose", "multi-container", "yaml", "services", "up", "down", "build"],
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
    description: "Branch management, checkout shortcuts and merging strategies",
    category: "Git",
    tags: ["branches", "merge", "rebase", "checkout", "switch", "workflow"],
    content: `# Git Branching

Commands for branch management and merging.

## Branch Operations

\`\`\`bash
# List branches
git branch
git branch -a  # Include remote branches
git branch -r  # Only remote branches
git branch -v  # Show last commit on each branch

# Create a branch (does not switch)
git branch feature-name

# Delete branch
git branch -d feature-name
git branch -D feature-name  # Force delete

# Rename current branch
git branch -m new-name

# Rename any branch
git branch -m old-name new-name
\`\`\`

## Checkout and Switch

\`\`\`bash
# Switch to existing branch
git checkout main
git switch main  # Modern alternative

# Create and switch in one step
git checkout -b feature/login
git switch -c feature/login

# Create branch from specific commit/tag
git checkout -b hotfix v1.2.0
git checkout -b bugfix abc1234

# Checkout remote branch (auto-track)
git checkout feature/api
git checkout -b local-name origin/remote-name

# Go back to previous branch
git checkout -
git switch -

# Discard changes in a file
git checkout -- file.txt

# Checkout specific file from another branch
git checkout main -- src/config.ts

# Detached HEAD (inspect a commit)
git checkout abc1234
\`\`\`

## Quick Branch Shortcuts

\`\`\`bash
# Create feature branch from main
git checkout main && git pull && git checkout -b feature/new-feature

# Create hotfix branch from tag
git checkout -b hotfix/fix-bug v2.0.0

# Create branch and push immediately
git checkout -b feature/api && git push -u origin feature/api

# List branches containing a commit
git branch --contains abc1234

# List merged/unmerged branches
git branch --merged main
git branch --no-merged main

# Clean up merged branches
git branch --merged main | grep -v main | xargs git branch -d
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
    description: "Kubernetes package management with Helm charts and templates",
    category: "Kubernetes",
    tags: ["helm", "charts", "releases", "packages", "template", "values"],
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

# Show chart info
helm show chart bitnami/nginx
helm show all bitnami/nginx

# Download chart
helm pull bitnami/nginx
helm pull bitnami/nginx --untar

# Create new chart
helm create my-chart

# Package chart
helm package my-chart

# Lint chart
helm lint my-chart
\`\`\`

## Helm Template

\`\`\`bash
# Render templates locally (without installing)
helm template my-release bitnami/nginx

# Render with custom values
helm template my-release ./my-chart -f values.yaml

# Render specific template file
helm template my-release ./my-chart -s templates/deployment.yaml

# Render with set values
helm template my-release ./my-chart --set replicaCount=3

# Render and save to file
helm template my-release ./my-chart > rendered.yaml

# Render with namespace
helm template my-release ./my-chart -n production

# Debug: show computed values
helm template my-release ./my-chart --debug

# Validate rendered output against cluster
helm template my-release ./my-chart | kubectl apply --dry-run=client -f -
\`\`\`

## Chart Template Syntax

\`\`\`yaml
# values.yaml
replicaCount: 3
image:
  repository: nginx
  tag: "1.25"
service:
  type: ClusterIP
  port: 80
\`\`\`

\`\`\`yaml
# templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ .Release.Name }}-app
  labels:
    app: {{ .Chart.Name }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: {{ .Chart.Name }}
  template:
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}
\`\`\`

## Common Template Functions

\`\`\`yaml
# Default value
{{ .Values.env | default "production" }}

# Conditional
{{- if .Values.ingress.enabled }}
  # ingress config here
{{- end }}

# Range (loop)
{{- range .Values.env }}
  - name: {{ .name }}
    value: {{ .value | quote }}
{{- end }}

# Include named template
{{ include "mychart.labels" . | nindent 4 }}

# toYaml
{{ toYaml .Values.resources | nindent 12 }}
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

  // Git Remote Workflow
  {
    slug: "git-workflow",
    title: "Git Remote Workflow",
    description: "Remote repository operations with Git: fetch, pull, push and merge workflow",
    category: "Git",
    tags: ["fetch", "pull", "push", "merge", "remote", "upstream", "workflow"],
    content: `# Git Remote Workflow

Working with remote repositories: essential commands and workflow.

## Fetch - Download Remote Changes

\`\`\`bash
# Download all remote changes (does not merge)
git fetch origin

# Fetch specific branch
git fetch origin main

# Fetch from all remotes
git fetch --all

# Clean up deleted remote branches
git fetch --prune
\`\`\`

## Pull - Download and Merge

\`\`\`bash
# Fetch + merge (default behavior)
git pull origin main

# Fetch + rebase (cleaner commit history)
git pull --rebase origin main

# Pull all branches
git pull --all

# Pull current branch (if upstream is set)
git pull
\`\`\`

## Push - Send Changes

\`\`\`bash
# Push current branch
git push origin main

# Push new branch and set upstream
git push -u origin feature-branch

# Short push (if upstream is set)
git push

# Push all branches
git push --all origin

# Push tags
git push origin --tags
git push origin v1.0.0

# Force push (use with caution!)
git push --force-with-lease origin feature-branch
\`\`\`

## Merge Strategies

\`\`\`bash
# Merge feature branch into main
git checkout main
git pull origin main
git merge feature-branch

# No fast-forward merge (creates merge commit)
git merge --no-ff feature-branch

# Squash merge (combines all commits into one)
git merge --squash feature-branch
git commit -m "feat: feature description"

# Abort merge
git merge --abort
\`\`\`

## Typical Development Workflow

\`\`\`bash
# 1. Update main branch
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/new-feature

# 3. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 4. Get latest updates from main
git fetch origin main
git rebase origin/main

# 5. Push
git push -u origin feature/new-feature

# 6. Clean up after PR merge
git checkout main
git pull origin main
git branch -d feature/new-feature
\`\`\`
`,
  },

  // Docker Multi-Stage Build
  {
    slug: "docker-multistage",
    title: "Docker Multi-Stage Build",
    description: "Building small and secure Docker images with multi-stage builds (Golang example)",
    category: "Docker",
    tags: ["multi-stage", "build", "golang", "optimization", "alpine", "scratch"],
    content: `# Docker Multi-Stage Build

Minimize image size with multi-stage builds.

## Why Multi-Stage?

- Final image contains only the executable
- Build dependencies are not included in the final image
- Fewer packages = smaller attack surface
- Image size decreases dramatically

## Golang Multi-Stage Example

\`\`\`dockerfile
# Stage 1: Build
FROM golang:1.22-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/main .

# Stage 2: Run
FROM alpine:3.19
RUN apk --no-cache add ca-certificates
WORKDIR /app

COPY --from=builder /app/main .
EXPOSE 8080

CMD ["./main"]
\`\`\`

## Build and Run

\`\`\`bash
docker build -t my-go-app:latest .
docker run -d -p 8080:8080 my-go-app:latest
docker images my-go-app
\`\`\`

## Image Size Comparison

| Method | Approximate Size |
|--------|-----------------|
| golang:1.22 (single stage) | ~800MB |
| golang:1.22-alpine (single stage) | ~300MB |
| Multi-stage (alpine) | ~15MB |
| Multi-stage (scratch) | ~8MB |

## Minimal Image with Scratch

\`\`\`dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o main .

FROM scratch
COPY --from=builder /app/main /main
EXPOSE 8080
ENTRYPOINT ["/main"]
\`\`\`

## Python Multi-Stage Example

\`\`\`dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["python", "main.py"]
\`\`\`
`,
  },

  // Docker USER
  {
    slug: "docker-user-security",
    title: "Docker USER Directive",
    description: "Container security with non-root user usage and best practices",
    category: "Docker",
    tags: ["user", "security", "non-root", "permissions", "dockerfile"],
    content: `# Docker USER Directive

Running containers as non-root user for better security.

## Why Avoid Root?

- Risk of host root access on container escape
- Principle of Least Privilege
- Compliance with production security standards
- Kubernetes PodSecurityPolicy/Standards compliance

## Alpine Based Image

\`\`\`dockerfile
FROM node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
COPY --chown=appuser:appgroup . .
RUN npm ci --only=production

USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Debian/Ubuntu Based Image

\`\`\`dockerfile
FROM ubuntu:22.04

RUN groupadd -r appgroup && useradd -r -g appgroup -m appuser

WORKDIR /app
COPY --chown=appuser:appgroup . .

USER appuser
CMD ["./app"]
\`\`\`

## Specifying User at Runtime

\`\`\`bash
docker run --user 1000:1000 nginx
docker run --user $(id -u):$(id -g) nginx

docker exec container_name whoami
docker exec container_name id
\`\`\`

## File Permissions Best Practice

\`\`\`dockerfile
FROM python:3.12-slim

RUN groupadd -r app && useradd -r -g app app
WORKDIR /app

COPY . .
RUN chown -R app:app /app && chmod -R 550 /app

USER app
CMD ["python", "main.py"]
\`\`\`

## Temporary Root Access

\`\`\`dockerfile
FROM node:18-alpine

RUN addgroup -S app && adduser -S app -G app
RUN apk add --no-cache curl

WORKDIR /app
COPY --chown=app:app . .

USER app
RUN npm ci --only=production

CMD ["node", "server.js"]
\`\`\`
`,
  },

  // Docker ENTRYPOINT vs CMD
  {
    slug: "docker-entrypoint-cmd",
    title: "ENTRYPOINT vs CMD",
    description: "Docker ENTRYPOINT and CMD differences, exec form vs shell form comparison",
    category: "Docker",
    tags: ["entrypoint", "cmd", "dockerfile", "exec-form", "shell-form"],
    content: `# ENTRYPOINT vs CMD

Understanding the differences between ENTRYPOINT and CMD in Docker.

## Key Difference

- **ENTRYPOINT**: Defines the container's main executable
- **CMD**: Provides default arguments or defines the default command

## CMD Only

\`\`\`dockerfile
FROM ubuntu:22.04
CMD ["echo", "Hello World"]
\`\`\`

\`\`\`bash
docker run myimage
# Output: Hello World

docker run myimage echo "Another message"
# Output: Another message (CMD overridden)
\`\`\`

## ENTRYPOINT Only

\`\`\`dockerfile
FROM ubuntu:22.04
ENTRYPOINT ["echo"]
\`\`\`

\`\`\`bash
docker run myimage Hello
# Output: Hello

docker run myimage Test 123
# Output: Test 123
\`\`\`

## ENTRYPOINT + CMD (Best Practice)

\`\`\`dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY . .

ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8080"]
\`\`\`

\`\`\`bash
docker run myimage
# python app.py --port 8080

docker run myimage --port 3000
# python app.py --port 3000
\`\`\`

## Shell Form vs Exec Form

\`\`\`dockerfile
# Exec form (recommended) - runs as PID 1, receives signals
ENTRYPOINT ["python", "app.py"]
CMD ["--port", "8080"]

# Shell form - wrapped with /bin/sh -c, signal handling issues
ENTRYPOINT python app.py
CMD --port 8080
\`\`\`

## Entrypoint Script Pattern

\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["node", "server.js"]
\`\`\`

\`\`\`bash
#!/bin/sh
# entrypoint.sh
echo "Environment: $NODE_ENV"
echo "Starting application..."
exec "$@"
\`\`\`

## Override Behavior

\`\`\`bash
docker run myimage custom-command
docker run --entrypoint /bin/sh myimage
docker run --entrypoint python myimage script.py
\`\`\`
`,
  },

  // Docker Compose Intermediate
  {
    slug: "docker-compose-intermediate",
    title: "Docker Compose Intermediate",
    description: "Multi-service application with Docker Compose: networks, healthchecks, volumes and environment management",
    category: "Docker",
    tags: ["compose", "network", "healthcheck", "volumes", "environment", "multi-service", "nginx", "redis"],
    content: `# Docker Compose - Intermediate

Real-world Docker Compose configuration for multi-service applications.

## Full Application Example

\`\`\`yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/certs:/etc/nginx/certs:ro
    depends_on:
      backend:
        condition: service_healthy
    networks:
      - frontend
    restart: unless-stopped

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        - NODE_ENV=production
    env_file:
      - .env
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    networks:
      - frontend
      - backend
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - backend
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes --maxmemory 256mb
    volumes:
      - redis_data:/data
    networks:
      - backend
    restart: unless-stopped

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true

volumes:
  postgres_data:
  redis_data:
\`\`\`

## Network Isolation

\`\`\`yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true
\`\`\`

- **frontend**: accessible by nginx and backend
- **backend**: accessible by db, redis and backend only, no external access

## Healthcheck Configuration

\`\`\`yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
\`\`\`

## Environment Management

\`\`\`bash
# .env file
DATABASE_URL=postgres://user:pass@db:5432/myapp
REDIS_URL=redis://redis:6379
JWT_SECRET=my-secret-key
\`\`\`

\`\`\`yaml
services:
  backend:
    env_file:
      - .env
      - .env.local
    environment:
      - NODE_ENV=production
\`\`\`

## Useful Compose Commands

\`\`\`bash
docker compose up -d --build backend
docker compose logs -f backend db
docker compose ps
docker compose exec db psql -U user -d myapp
docker compose down -v --remove-orphans
docker compose up -d db redis
\`\`\`
`,
  },

  // Kubernetes Fundamentals
  {
    slug: "k8s-fundamentals",
    title: "Kubernetes Fundamentals",
    description: "Kubernetes core concepts: Pod, Deployment, ReplicaSet, StatefulSet, DaemonSet, Service and more",
    category: "Kubernetes",
    tags: ["pod", "deployment", "replicaset", "statefulset", "daemonset", "service", "configmap", "secret", "namespace", "ingress", "fundamentals"],
    content: `# Kubernetes Fundamentals

Core building blocks and concepts of Kubernetes.

## Pod

The smallest deployable unit. Hosts one or more containers.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  containers:
    - name: app
      image: nginx:alpine
      ports:
        - containerPort: 80
      resources:
        requests:
          memory: "64Mi"
          cpu: "250m"
        limits:
          memory: "128Mi"
          cpu: "500m"
\`\`\`

## Deployment

Declarative management of Pods. Supports rolling updates and rollbacks.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:v1.0
          ports:
            - containerPort: 8080
\`\`\`

\`\`\`bash
kubectl apply -f deployment.yaml
kubectl rollout status deployment/my-app
kubectl rollout history deployment/my-app
kubectl rollout undo deployment/my-app
kubectl scale deployment my-app --replicas=5
\`\`\`

## ReplicaSet

Ensures a specified number of Pod replicas are running. Usually managed by a Deployment.

\`\`\`yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: my-app-rs
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:v1.0
\`\`\`

## StatefulSet

For stateful applications (databases, message queues). Provides stable network identity and persistent storage.

\`\`\`yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: postgres:16
          ports:
            - containerPort: 5432
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 10Gi
\`\`\`

**StatefulSet vs Deployment:**
- Pods get ordered names: postgres-0, postgres-1, postgres-2
- Ordered startup and shutdown
- Dedicated PersistentVolume per Pod
- Stable DNS: postgres-0.postgres.namespace.svc.cluster.local

## DaemonSet

Runs a Pod on every node. Ideal for monitoring and logging agents.

\`\`\`yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      containers:
        - name: fluentd
          image: fluentd:latest
          volumeMounts:
            - name: varlog
              mountPath: /var/log
      volumes:
        - name: varlog
          hostPath:
            path: /var/log
\`\`\`

## Service

Provides stable network access to Pods.

\`\`\`yaml
# ClusterIP (default, cluster-internal access)
apiVersion: v1
kind: Service
metadata:
  name: my-app-svc
spec:
  type: ClusterIP
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
---
# NodePort (external access, opens port on every node)
apiVersion: v1
kind: Service
metadata:
  name: my-app-nodeport
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080
---
# LoadBalancer (cloud provider load balancer)
apiVersion: v1
kind: Service
metadata:
  name: my-app-lb
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
\`\`\`

## ConfigMap and Secret

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_HOST: "postgres"
  LOG_LEVEL: "info"
---
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQ=
\`\`\`

\`\`\`yaml
# Usage in Pod
spec:
  containers:
    - name: app
      envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
\`\`\`

## Namespace

\`\`\`bash
kubectl create namespace production
kubectl get all -n production
kubectl config set-context --current --namespace=production
\`\`\`

## Ingress

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: my-app-svc
                port:
                  number: 80
\`\`\`
`,
  },

  // Kubernetes Services & Routes
  {
    slug: "k8s-services-routes",
    title: "Services & Routes",
    description: "Kubernetes Service types, OpenShift Routes, Ingress and traffic routing in detail",
    category: "Kubernetes",
    tags: ["service", "clusterip", "nodeport", "loadbalancer", "headless", "route", "ingress", "openshift", "networking"],
    content: `# Services & Routes

Kubernetes networking: Service types, Ingress and OpenShift Routes.

## Service Types Overview

| Type | Scope | Use Case |
|------|-------|----------|
| ClusterIP | Cluster-internal only | Service-to-service communication |
| NodePort | External via node IP:port | Dev/test, bare-metal |
| LoadBalancer | External via cloud LB | Production cloud workloads |
| Headless | No cluster IP, direct pod DNS | StatefulSet, service discovery |
| ExternalName | DNS alias to external service | External service integration |

## ClusterIP (Default)

Cluster-internal access only. Other services reach it via \`<service>.<namespace>.svc.cluster.local\`.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-api
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
    - name: http
      port: 80
      targetPort: 8080
    - name: grpc
      port: 50051
      targetPort: 50051
\`\`\`

\`\`\`bash
# Cluster-internal DNS
curl http://backend-api.default.svc.cluster.local
curl http://backend-api.default:80
curl http://backend-api:80
\`\`\`

## NodePort

Opens a static port (30000-32767) on every node. Traffic: \`NodeIP:NodePort → Service → Pod\`.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-nodeport
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
      nodePort: 30080
\`\`\`

\`\`\`bash
curl http://<NODE_IP>:30080
\`\`\`

## LoadBalancer

Provisions a cloud provider load balancer (AWS ELB, GCP LB, Azure LB).

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-lb
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
    - port: 443
      targetPort: 8080
      protocol: TCP
\`\`\`

## Headless Service

No ClusterIP assigned. DNS returns individual pod IPs. Essential for StatefulSets.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: postgres
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432
\`\`\`

\`\`\`bash
# Direct pod DNS (StatefulSet)
nslookup postgres-0.postgres.default.svc.cluster.local
nslookup postgres-1.postgres.default.svc.cluster.local
\`\`\`

## ExternalName

Maps a service to an external DNS name. No proxy, just a CNAME record.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: external-db
spec:
  type: ExternalName
  externalName: mydb.example.com
\`\`\`

## Ingress

Layer 7 (HTTP/HTTPS) routing. Requires an Ingress Controller (nginx, traefik, etc.).

\`\`\`yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - api.example.com
        - app.example.com
      secretName: tls-secret
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend-api
                port:
                  number: 80
    - host: app.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80
\`\`\`

## OpenShift Route

OpenShift-native alternative to Ingress. Managed by the built-in HAProxy router.

\`\`\`yaml
apiVersion: route.openshift.io/v1
kind: Route
metadata:
  name: my-app
spec:
  host: my-app.apps.cluster.example.com
  to:
    kind: Service
    name: my-app-svc
    weight: 100
  port:
    targetPort: 8080
  tls:
    termination: edge
    insecureEdgeTerminationPolicy: Redirect
\`\`\`

### Route TLS Termination Types

| Type | TLS at Router | TLS to Pod | Use Case |
|------|--------------|------------|----------|
| edge | Yes | No (HTTP) | Most common, router handles TLS |
| passthrough | No (pass-through) | Yes | App handles its own TLS |
| reencrypt | Yes | Yes (re-encrypted) | End-to-end TLS with router cert |

\`\`\`yaml
# Passthrough
spec:
  tls:
    termination: passthrough

# Re-encrypt
spec:
  tls:
    termination: reencrypt
    destinationCACertificate: |
      -----BEGIN CERTIFICATE-----
      ...
      -----END CERTIFICATE-----
\`\`\`

### Route vs Ingress

| Feature | Route | Ingress |
|---------|-------|---------|
| Platform | OpenShift only | Any K8s |
| TLS | edge/passthrough/reencrypt | TLS secret based |
| Built-in | Yes (HAProxy) | Needs Ingress Controller |
| Weighted routing | Native | Depends on controller |

## Debugging Services

\`\`\`bash
kubectl get svc -o wide
kubectl get endpoints my-service
kubectl describe svc my-service

# DNS test
kubectl run debug --image=busybox --rm -it -- nslookup my-service
kubectl run debug --image=curlimages/curl --rm -it -- curl http://my-service:80

# Check kube-proxy rules
kubectl get pods -n kube-system -l k8s-app=kube-proxy
iptables -t nat -L -n | grep my-service
\`\`\`
`,
  },

  // Kubernetes Serverless
  {
    slug: "k8s-serverless",
    title: "Kubernetes Serverless",
    description: "Serverless workloads on Kubernetes: Knative Serving, Eventing, and OpenShift Serverless",
    category: "Kubernetes",
    tags: ["serverless", "knative", "serving", "eventing", "scale-to-zero", "openshift", "faas"],
    content: `# Kubernetes Serverless

Serverless workloads on Kubernetes with Knative and OpenShift Serverless.

## What is Knative?

Knative extends Kubernetes to run serverless workloads:
- **Serving**: Request-driven auto-scaling (including scale-to-zero)
- **Eventing**: Event-driven architecture with sources and brokers

## Knative Serving

### Basic Knative Service

\`\`\`yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: ml-inference
  namespace: ml-serving
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/minScale: "0"
        autoscaling.knative.dev/maxScale: "10"
        autoscaling.knative.dev/target: "100"
    spec:
      containers:
        - image: my-registry/ml-model:v1
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
          env:
            - name: MODEL_PATH
              value: "/models/v1"
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
\`\`\`

### Auto-Scaling Configuration

\`\`\`yaml
metadata:
  annotations:
    # Scale to zero when no traffic
    autoscaling.knative.dev/minScale: "0"
    # Maximum replicas
    autoscaling.knative.dev/maxScale: "20"
    # Concurrent requests per pod
    autoscaling.knative.dev/target: "50"
    # Metric type: concurrency or rps
    autoscaling.knative.dev/metric: "concurrency"
    # Scale down delay (seconds)
    autoscaling.knative.dev/scale-down-delay: "30s"
    # Scale to zero grace period
    autoscaling.knative.dev/scale-to-zero-grace-period: "60s"
\`\`\`

### Traffic Splitting (Canary / Blue-Green)

\`\`\`yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: ml-inference
spec:
  template:
    metadata:
      name: ml-inference-v2
    spec:
      containers:
        - image: my-registry/ml-model:v2
  traffic:
    - revisionName: ml-inference-v1
      percent: 80
    - revisionName: ml-inference-v2
      percent: 20
\`\`\`

\`\`\`bash
# Canary → Full rollout
kn service update ml-inference --traffic ml-inference-v2=100

# Rollback
kn service update ml-inference --traffic ml-inference-v1=100
\`\`\`

### kn CLI

\`\`\`bash
# Create service
kn service create my-app --image my-registry/app:v1 --port 8080

# List services
kn service list

# Update service
kn service update my-app --image my-registry/app:v2

# Describe service
kn service describe my-app

# Delete service
kn service delete my-app

# List revisions
kn revision list

# Get service URL
kn service describe my-app -o url
\`\`\`

## Knative Eventing

### Event Source → Service

\`\`\`yaml
apiVersion: sources.knative.dev/v1
kind: ApiServerSource
metadata:
  name: pod-events
spec:
  serviceAccountName: event-watcher
  mode: Resource
  resources:
    - apiVersion: v1
      kind: Pod
  sink:
    ref:
      apiVersion: serving.knative.dev/v1
      kind: Service
      name: event-processor
\`\`\`

### Broker & Trigger Pattern

\`\`\`yaml
apiVersion: eventing.knative.dev/v1
kind: Broker
metadata:
  name: default
  namespace: ml-events
---
apiVersion: eventing.knative.dev/v1
kind: Trigger
metadata:
  name: ml-training-trigger
spec:
  broker: default
  filter:
    attributes:
      type: ml.data.updated
  subscriber:
    ref:
      apiVersion: serving.knative.dev/v1
      kind: Service
      name: training-pipeline
\`\`\`

## Serverless vs Deployment

| Feature | Deployment | Knative Serverless |
|---------|-----------|-------------------|
| Minimum pods | 1+ always running | 0 (scale-to-zero) |
| Scaling | HPA (manual config) | Automatic (request-based) |
| Cost | Always paying | Pay per request |
| Cold start | None | Possible (scale from 0) |
| Traffic split | Manual (multiple deployments) | Built-in |
| Use case | Steady traffic | Bursty/intermittent traffic |

## When to Use Serverless

- **ML inference APIs** with variable/bursty traffic
- **Data preprocessing** triggered by events
- **Webhook handlers** and event processors
- **Dev/staging** environments (cost savings with scale-to-zero)
- **Batch scoring** triggered on demand
`,
  },

  // Istio Service Mesh
  {
    slug: "k8s-istio",
    title: "Istio Service Mesh",
    description: "Istio service mesh: traffic management, observability, security and sidecar architecture",
    category: "Kubernetes",
    tags: ["istio", "service-mesh", "envoy", "sidecar", "virtualservice", "destinationrule", "gateway", "mtls", "traffic-management"],
    content: `# Istio Service Mesh

Service mesh for microservices: traffic management, security, and observability.

## What is Istio?

Istio adds a sidecar proxy (Envoy) to each pod, providing:
- **Traffic Management**: Routing, load balancing, retries, circuit breaking
- **Security**: mTLS, authorization policies
- **Observability**: Metrics, tracing, logging (without code changes)

## Architecture

- **Control Plane (istiod)**: Pilot (routing config), Citadel (certs & mTLS), Galley (config validation)
- **Data Plane**: Envoy sidecar proxy injected into each Pod
- **Traffic Flow**: Client → Envoy (Pod A) → Envoy (Pod B) → App Container

istiod pushes routing rules and certificates to all Envoy sidecars via xDS API. Envoy intercepts all inbound/outbound traffic transparently.

## Installation

\`\`\`bash
# Install istioctl
curl -L https://istio.io/downloadIstio | sh -
export PATH=$PWD/istio-*/bin:$PATH

# Install Istio (demo profile)
istioctl install --set profile=demo -y

# Enable sidecar injection for namespace
kubectl label namespace default istio-injection=enabled

# Verify
istioctl verify-install
kubectl get pods -n istio-system
\`\`\`

## Sidecar Injection

\`\`\`bash
# Automatic (namespace label)
kubectl label namespace my-ns istio-injection=enabled

# Manual injection
istioctl kube-inject -f deployment.yaml | kubectl apply -f -

# Check sidecar
kubectl get pods -o jsonpath='{.items[*].spec.containers[*].name}'
\`\`\`

## Gateway

Entry point for external traffic into the mesh.

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: app-gateway
spec:
  selector:
    istio: ingressgateway
  servers:
    - port:
        number: 80
        name: http
        protocol: HTTP
      hosts:
        - "api.example.com"
        - "app.example.com"
    - port:
        number: 443
        name: https
        protocol: HTTPS
      tls:
        mode: SIMPLE
        credentialName: tls-secret
      hosts:
        - "api.example.com"
\`\`\`

## VirtualService

Defines traffic routing rules.

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: backend-routing
spec:
  hosts:
    - "api.example.com"
  gateways:
    - app-gateway
  http:
    # Canary: route 90/10
    - match:
        - uri:
            prefix: /api/v2
      route:
        - destination:
            host: backend
            subset: v2
          weight: 10
        - destination:
            host: backend
            subset: v1
          weight: 90

    # Header-based routing (test traffic)
    - match:
        - headers:
            x-env:
              exact: canary
      route:
        - destination:
            host: backend
            subset: v2

    # Default route
    - route:
        - destination:
            host: backend
            subset: v1
\`\`\`

## DestinationRule

Defines subsets and traffic policies.

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: backend
spec:
  host: backend
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        h2UpgradePolicy: DEFAULT
        http1MaxPendingRequests: 100
    loadBalancer:
      simple: ROUND_ROBIN
    outlierDetection:
      consecutive5xxErrors: 5
      interval: 30s
      baseEjectionTime: 60s
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
\`\`\`

## Retry & Timeout

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: backend
spec:
  hosts:
    - backend
  http:
    - route:
        - destination:
            host: backend
      timeout: 10s
      retries:
        attempts: 3
        perTryTimeout: 3s
        retryOn: 5xx,reset,connect-failure
\`\`\`

## Circuit Breaker

\`\`\`yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: backend
spec:
  host: backend
  trafficPolicy:
    outlierDetection:
      consecutive5xxErrors: 3
      interval: 10s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
    connectionPool:
      tcp:
        maxConnections: 50
      http:
        http1MaxPendingRequests: 50
        http2MaxRequests: 100
        maxRequestsPerConnection: 10
\`\`\`

## mTLS (Mutual TLS)

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: istio-system
spec:
  mtls:
    mode: STRICT
\`\`\`

## Authorization Policy

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: backend-policy
spec:
  selector:
    matchLabels:
      app: backend
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/default/sa/frontend"]
      to:
        - operation:
            methods: ["GET", "POST"]
            paths: ["/api/*"]
\`\`\`

## Observability

\`\`\`bash
# Kiali (service mesh dashboard)
istioctl dashboard kiali

# Jaeger (distributed tracing)
istioctl dashboard jaeger

# Grafana (metrics)
istioctl dashboard grafana

# Prometheus
istioctl dashboard prometheus

# Envoy proxy config
istioctl proxy-config routes <pod-name>
istioctl proxy-config clusters <pod-name>
istioctl proxy-config listeners <pod-name>
\`\`\`

## Debugging

\`\`\`bash
# Analyze mesh config
istioctl analyze

# Check proxy status
istioctl proxy-status

# Debug specific pod
istioctl proxy-config all <pod-name> -o json

# Check mTLS status
istioctl authn tls-check <pod-name>

# Envoy access logs
kubectl logs <pod-name> -c istio-proxy
\`\`\`
`,
  },

  // Network Fundamentals
  {
    slug: "network-fundamentals",
    title: "Network Fundamentals",
    description: "Network fundamentals for MLOps engineers: TCP/IP, DNS, HTTP, port management and container networking",
    category: "Network",
    tags: ["tcp", "udp", "dns", "http", "https", "port", "subnet", "cidr", "vpn", "firewall", "mlops"],
    content: `# Network Fundamentals

Essential networking concepts for MLOps engineers.

## TCP/IP Model

| Layer | Protocols | Description |
|-------|-----------|-------------|
| Application | HTTP, HTTPS, DNS, gRPC | Application-level communication |
| Transport | TCP, UDP | End-to-end data delivery |
| Network | IP, ICMP | Packet routing |
| Link | Ethernet, ARP | Physical network access |

## TCP vs UDP

- **TCP**: Connection-oriented, reliable, ordered. HTTP, SSH, database connections
- **UDP**: Connectionless, fast, no delivery guarantee. DNS, video streaming, gaming

## Common Port Numbers

\`\`\`
22    - SSH
53    - DNS
80    - HTTP
443   - HTTPS
5432  - PostgreSQL
3306  - MySQL
6379  - Redis
27017 - MongoDB
8080  - Alternative HTTP
8888  - Jupyter Notebook
5000  - Flask / MLflow
9090  - Prometheus
3000  - Grafana
\`\`\`

## DNS (Domain Name System)

\`\`\`bash
nslookup google.com
dig google.com

dig google.com A
dig google.com AAAA
dig google.com CNAME
dig google.com MX

# macOS flush DNS cache
sudo dscacheutil -flushcache

# Linux flush DNS cache
sudo systemd-resolve --flush-caches
\`\`\`

## IP Addressing and CIDR

\`\`\`
192.168.1.0/24    = 256 IPs (192.168.1.0 - 192.168.1.255)
10.0.0.0/16       = 65,536 IPs
172.16.0.0/12     = 1,048,576 IPs

# Private IP Ranges
10.0.0.0/8        - Large private networks
172.16.0.0/12     - Medium private networks
192.168.0.0/16    - Small private networks
\`\`\`

## HTTP/HTTPS

\`\`\`bash
curl -X GET https://api.example.com/data

curl -X POST -H "Content-Type: application/json" -d '{"input": [1, 2, 3]}' https://api.example.com/predict

curl -v -H "Authorization: Bearer TOKEN" https://api.example.com/data

curl -vI https://example.com
\`\`\`

## HTTP Status Codes

\`\`\`
# Success
200 OK, 201 Created, 204 No Content

# Redirection
301 Moved, 302 Found, 304 Not Modified

# Client Error
400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found

# Server Error
500 Internal Error, 502 Bad Gateway, 503 Service Unavailable
\`\`\`

## Container Networking

\`\`\`bash
docker network ls
docker network create my-network
docker run -d --network my-network --name app nginx
docker exec app curl http://other-container:8080
docker network inspect my-network
\`\`\`

## Kubernetes Networking

\`\`\`bash
# Service DNS format: <service>.<namespace>.svc.cluster.local
curl http://my-service.default.svc.cluster.local

kubectl get pods -o wide
kubectl get endpoints my-service

kubectl port-forward svc/my-service 8080:80
kubectl port-forward pod/my-pod 8080:80
\`\`\`

## Firewall Rules

\`\`\`bash
sudo iptables -L -n
sudo iptables -A INPUT -p tcp --dport 8080 -j ACCEPT

# UFW (Ubuntu)
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status
\`\`\`

## SSH Tunneling

\`\`\`bash
# Local port forwarding
ssh -L 8080:remote-db:5432 user@bastion-host

# Jupyter Notebook tunnel
ssh -L 8888:localhost:8888 user@gpu-server

# SOCKS proxy
ssh -D 9090 user@server
\`\`\`
`,
  },

  // Network Troubleshooting
  {
    slug: "network-troubleshooting",
    title: "Network Troubleshooting",
    description: "Network troubleshooting tools: ping, traceroute, netstat, tcpdump and container network debugging",
    category: "Network",
    tags: ["troubleshooting", "debug", "ping", "traceroute", "netstat", "tcpdump", "grpc", "curl", "ss"],
    content: `# Network Troubleshooting

Tools for detecting and resolving network issues in MLOps environments.

## Basic Connectivity Tests

\`\`\`bash
ping -c 4 google.com
ping -c 4 192.168.1.1

traceroute google.com

nc -zv hostname 8080
nc -zv 192.168.1.100 5432

telnet hostname 80
\`\`\`

## Connection and Port Monitoring

\`\`\`bash
ss -tlnp
netstat -tlnp

ss -tlnp | grep :8080
lsof -i :8080

ss -s
ss -ant
\`\`\`

## DNS Troubleshooting

\`\`\`bash
dig example.com
nslookup example.com

dig @8.8.8.8 example.com
dig +trace example.com
dig -x 8.8.8.8
\`\`\`

## HTTP/API Debugging

\`\`\`bash
curl -v https://api.example.com/health
curl -I https://api.example.com

curl -o /dev/null -s -w "Total: %{time_total}s\n" https://api.example.com

curl --retry 3 --retry-delay 2 https://api.example.com
\`\`\`

## Packet Capture

\`\`\`bash
sudo tcpdump -i eth0
sudo tcpdump -i any port 8080
sudo tcpdump host 192.168.1.100
sudo tcpdump -i eth0 -w capture.pcap
sudo tcpdump -i any -A port 80
\`\`\`

## Container Network Debugging

\`\`\`bash
docker inspect --format='{{.NetworkSettings.IPAddress}}' container_name

docker exec -it container_name sh -c "ping -c 2 other-container"
docker exec -it container_name sh -c "curl -v http://service:8080"

kubectl exec -it pod-name -- curl http://service:8080
kubectl exec -it pod-name -- nslookup service-name

kubectl run debug --image=busybox --rm -it -- nslookup kubernetes.default
\`\`\`

## gRPC Debugging

\`\`\`bash
grpcurl -plaintext localhost:50051 list
grpcurl -plaintext localhost:50051 list my.service.MyService

grpcurl -plaintext -d '{"name": "test"}' localhost:50051 my.service.MyService/GetPrediction

grpcurl -plaintext localhost:50051 grpc.health.v1.Health/Check
\`\`\`

## System Network Information

\`\`\`bash
ip addr show
ifconfig

ip route show
route -n

arp -a

# Bandwidth test
iperf3 -s
iperf3 -c hostname
\`\`\`
`,
  },
]

export const categories = [
  { name: "Linux", slug: "linux", count: allContent.filter((c) => c.category === "Linux").length },
  { name: "Docker", slug: "docker", count: allContent.filter((c) => c.category === "Docker").length },
  { name: "Git", slug: "git", count: allContent.filter((c) => c.category === "Git").length },
  { name: "Kubernetes", slug: "kubernetes", count: allContent.filter((c) => c.category === "Kubernetes").length },
  { name: "Network", slug: "network", count: allContent.filter((c) => c.category === "Network").length },
  { name: "uv", slug: "uv", count: allContent.filter((c) => c.category === "uv").length },
  { name: "Miniconda", slug: "miniconda", count: allContent.filter((c) => c.category === "Miniconda").length },
]

function extractCommands(content: string): string[] {
  const commands: string[] = []
  const regex = /```[\w-]*\n([\s\S]*?)```/g
  let match
  while ((match = regex.exec(content)) !== null) {
    match[1].split("\n").forEach((line) => {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("//")) {
        commands.push(trimmed.toLowerCase())
      }
    })
  }
  return commands
}

export interface SearchIndexItem {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  content: string
  titleLower: string
  descriptionLower: string
  categoryLower: string
  tagsLower: string[]
  commands: string[]
  contentLower: string
  headings: string[]
}

export const searchIndex: SearchIndexItem[] = allContent.map((item) => ({
  ...item,
  titleLower: item.title.toLowerCase(),
  descriptionLower: item.description.toLowerCase(),
  categoryLower: item.category.toLowerCase(),
  tagsLower: item.tags.map((t) => t.toLowerCase()),
  commands: extractCommands(item.content),
  contentLower: item.content.toLowerCase(),
  headings: item.content
    .split("\n")
    .filter((l) => l.startsWith("#"))
    .map((l) => l.replace(/^#+\s*/, "").toLowerCase()),
}))

export function getContentBySlug(slug: string): ContentItem | undefined {
  return allContent.find((item) => item.slug === slug)
}

export function getContentByCategory(categorySlug: string): ContentItem[] {
  const category = categories.find((c) => c.slug === categorySlug)
  if (!category) return []
  return allContent.filter((item) => item.category === category.name)
}
