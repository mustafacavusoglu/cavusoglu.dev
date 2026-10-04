export interface Note {
  title: string
  why: string
  cmd: string
}

export const notes: Record<string, Note[]> = {
  Linux: [
    { title: "Read a file", why: "cat for short files, less to scroll long ones (q to quit).", cmd: "cat config.yaml\nless app.log" },
    { title: "Start, end and live tail", why: "Check the latest lines of a log as they arrive.", cmd: "head -n 20 app.log\ntail -n 50 app.log\ntail -f app.log" },
    { title: "Search inside files", why: "Recursive, with line numbers, case-insensitive.", cmd: 'grep -rni "error" ./logs' },
    { title: "Edit a file", why: "nano is simplest; in vim press i to edit, Esc then :wq to save.", cmd: "nano config.yaml\nvim config.yaml" },
    { title: "Replace text in a file", why: "Every match, in place.", cmd: "sed -i 's/old/new/g' config.yaml" },
    { title: "File, folder and disk sizes", why: "Human-readable sizes.", cmd: "ls -lh\ndu -sh *\ndf -h" },
    { title: "Find files", why: "By name or by size.", cmd: 'find . -name "*.log"\nfind . -size +100M' },
  ],
  Docker: [
    { title: "Build an image", why: "Uses the Dockerfile in the current folder.", cmd: "docker build -t myapp:1.0 ." },
    { title: "Pull an image", why: "Download from Docker Hub or a private registry.", cmd: "docker pull python:3.12-slim" },
    { title: "Tag and push to a registry", why: "Log in once, then push.", cmd: "docker login <registry>\ndocker tag myapp:1.0 <registry>/myapp:1.0\ndocker push <registry>/myapp:1.0" },
    { title: "Build for other platforms (buildx)", why: "Build on a Mac, run on amd64 servers.", cmd: "docker buildx build --platform linux/amd64,linux/arm64 \\\n  -t <registry>/myapp:1.0 --push ." },
    { title: "Run a container", why: "In the background, with a port mapped.", cmd: "docker run -d -p 8080:80 --name web myapp:1.0" },
    { title: "Logs and shell", why: "See what it is doing, then step inside.", cmd: "docker logs -f web\ndocker exec -it web sh" },
    { title: "List and clean up", why: "Remove stopped containers and unused images.", cmd: "docker ps -a\ndocker images\ndocker system prune" },
  ],
  Git: [
    { title: "See what changed", why: "Before every commit.", cmd: "git status\ngit diff" },
    { title: "Commit", why: "Stage, then commit with a message.", cmd: 'git add .\ngit commit -m "message"' },
    { title: "Sync with remote", why: "Get the latest, then send yours.", cmd: "git pull\ngit push" },
    { title: "Branches", why: "Create and switch, or switch back.", cmd: "git switch -c feature/login\ngit switch main" },
    { title: "Put work aside", why: "Switch branches with uncommitted changes.", cmd: "git stash\ngit stash pop" },
    { title: "Undo the last commit, keep changes", why: "Committed too early.", cmd: "git reset --soft HEAD~1" },
    { title: "History", why: "Compact view with branches.", cmd: "git log --oneline --graph" },
  ],
  "Kubernetes / OpenShift": [
    { title: "List resources", why: "Every kubectl command also works as oc.", cmd: "kubectl get pods\nkubectl get deploy,svc -n <namespace>" },
    { title: "Switch namespace / project", why: "So you do not type -n every time.", cmd: "kubectl config set-context --current --namespace=<ns>\noc project <ns>" },
    { title: "Logs", why: "Follow live, or see the crashed container.", cmd: "kubectl logs -f <pod>\nkubectl logs <pod> --previous" },
    { title: "Shell into a pod", why: "oc rsh is the short form.", cmd: "kubectl exec -it <pod> -- sh\noc rsh <pod>" },
    { title: "Why is it not running", why: "Events at the bottom tell you.", cmd: "kubectl describe pod <pod>" },
    { title: "Apply a manifest", why: "Create or update from YAML.", cmd: "kubectl apply -f deployment.yaml" },
    { title: "Restart or roll back", why: "Pick up new config, or undo a bad release.", cmd: "kubectl rollout restart deploy/<name>\nkubectl rollout undo deploy/<name>" },
  ],
  uv: [
    { title: "Start a project", why: "Creates pyproject.toml and a venv.", cmd: "uv init myapp && cd myapp" },
    { title: "Add and remove packages", why: "Updates pyproject.toml and uv.lock.", cmd: "uv add fastapi\nuv remove fastapi" },
    { title: "Run code", why: "No need to activate the venv.", cmd: "uv run main.py" },
    { title: "Install from lockfile", why: "After cloning a project.", cmd: "uv sync" },
    { title: "Pick a Python version", why: "No pyenv needed.", cmd: "uv python install 3.12\nuv python pin 3.12" },
    { title: "Existing requirements.txt", why: "pip-style workflow, much faster.", cmd: "uv venv\nuv pip install -r requirements.txt" },
    { title: "Run a tool once", why: "Without installing it.", cmd: "uvx ruff check ." },
  ],
  Conda: [
    { title: "Create an environment", why: "Pin the Python version up front.", cmd: "conda create -n ml python=3.11 -y" },
    { title: "Activate / deactivate", why: "Before installing anything.", cmd: "conda activate ml\nconda deactivate" },
    { title: "Install packages", why: "conda first, pip if not available.", cmd: "conda install numpy pandas\npip install <package>" },
    { title: "List environments", why: "The active one is marked with *.", cmd: "conda env list" },
    { title: "Export environment", why: "Share with a teammate or another machine.", cmd: "conda env export --from-history > environment.yml" },
    { title: "Recreate from file", why: "One command setup.", cmd: "conda env create -f environment.yml" },
    { title: "Remove and clean up", why: "Delete an env and free cache space.", cmd: "conda env remove -n ml\nconda clean --all -y" },
  ],
}

export const topics = Object.keys(notes)
