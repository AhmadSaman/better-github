# Better Github

A lightweight web app that uses the GitHub API to
fetch repositories and users with advanced
filtering, helpful UI components for fast
exploration..

---

## 🛠 Tools & Technologies Used

- [**Next.js**](https://nextjs.org/) – React framework for server-side rendering and routing (used App Router)
- [**TypeScript**](https://www.typescriptlang.org/) – Type safety for better maintainability
- [**Tailwind CSS**](https://tailwindcss.com/) – Utility-first styling framework
- [**shadcn/ui**](https://ui.shadcn.com/) – Prebuilt, accessible UI components
- [**date-fns**](https://date-fns.org/) – Date formatting and manipulation
- [**GitHub API**](https://docs.github.com/en/rest) – Data fetching and integration
- [**Octokit**](https://github.com/octokit) – Official clients for the GitHub API
- [**Radix-UI**](https://www.radix-ui.com/) – Headless component library that Shadcn uses under the hood
- [**Lucide-react**](https://www.radix-ui.com/) – For Icons

## ⚙️ Setup Instructions

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/project-name.git
    cd project-name
    ```

2. **Add necessary environment variables**

    Create `.evn.local` file, For variables you need two environment variables,
    - `NEXT_PUBLIC_BASE_URL` When running locally add your localhost base URL, but when you deploy, add your base domain URL
    - `NEXT_PUBLIC_GITHUB_TOKEN` Github token, you can generate one on Github [here](https://github.com/settings/personal-access-tokens)

    ```env
    NEXT_PUBLIC_GITHUB_TOKEN
    NEXT_PUBLIC_BASE_URL
    ```

    You can also check `.env.example`

3. **Install dependencies**
    ```bash
    npm install
    ```
4. **Install dependencies**
    ```bash
     npm run dev
    ```

## ⏱️ Time Spent

| Day       | Description                                                                                                                                                 |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Day 1** | Project setup, initializing repository, brainstorming the Design, Implement users search page, single user Page, and simple search filer, handle dark mode. |
| **Day 2** | Implement Repositories search page, Repository Dialog page, and simple search filer.                                                                        |
| **Day 3** | infinite scroll, and advanced search for both users and repositories search page, implement authenticated user dialog, fixed bugs, refactor, final touches  |

## ⚠️ Assumptions

Deployed link is using owners generated github token, to see your personal information use your generated github token.

## 👽 Features

- Added dark mode toggle for UI
- Advanced filtering
- Cashing
- UX features like infinite scroll, debounce, ...etc
