# PyBe - Interactive Iteration Learning Module

A repository to log research, design, and development for a contribution to **PyBe**, a project by the **Vicharanashala Lab for Education Design, IIT Ropar** designed to teach Python by focusing on computer and programming fundamentals over syntax. 

Main PyBe repository: [https://github.com/vicharanashala/pybe](https://github.com/vicharanashala/pybe)

This repository contains the **Interactive Iteration Learning Module** (developed within `pybe-iteration-feature/`), a frontend-only React application built via iterative vibe-coding that guides learners through loop and iteration concepts using a narrative case study ("Finding Row Number in Dark Movie Theatre") and interactive components.

---

## 🌟 Key Features

- **Split-Pane "Dark Theater" Architecture:** A responsive 40/60 layout separating contextual 16:9 widescreen visuals from an interactive 3-zone reading and testing engine.
- **Dynamic `<z-*>` Tag Parsing:** Converts custom domain-specific markdown tags (`<z-announcement>`, `<z-reply>`, `<z-mcq>`, etc.) into rich, interactive React components.
- **Conditional Progression Gating:** Narrative beats unlock sequentially, while interactive beats (MCQs and Reflections) require user engagement to unlock progression.
- **Stateful MCQ Interactions:** Features error feedback strings (`Incorrect, please try again.`), gated explanations revealed optionally via a button click, and immediate button unlocking upon selecting correct answers.

## 🛠️ Tech Stack

- **Core Framework:** React 18
- **Build Tooling:** Vite
- **Styling:** Tailwind CSS & PostCSS
- **Icons:** Lucide React
---

## 🚀 Getting Started (Running Locally)

The active React application is located within the pybe-iteration-feature/client directory. To run it locally:

```bash
# 1. Navigate to the client directory
cd pybe-iteration-feature/client

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.


## 📁 Repository Structure

```text
.
├── archive/                      # Archived planning and ideation logs (iteration & recursion)
├── development-log.md            # Chronological development log
├── project-decisions.md          # Architectural and design decisions log
├── pybe-iteration-feature/       # Active feature workspace (Iteration React app & docs)
│   ├── client/                   # Frontend React app source code & public assets
│   ├── docs/                     # Design docs, grammar specifications, and changelogs
│   ├── README.md                 # Feature-specific documentation
│   └── VIBE_CODING_EVOLUTION.md  # Detailed changelog of post-build Vibe Coding refinements
├── README.md                     # Main repository overview
└── vibe-coding-docs/             # Universal templates and agent instruction documents
```
