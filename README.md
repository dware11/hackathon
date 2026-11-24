<div align="center">

# Ask PV

**A student-built campus assistant prototype for Prairie View A&M University: ask campus questions, store academic preferences, and plan a conflict-free semester schedule.**

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-shadcn/ui-06b6d4?logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Auth_+_Postgres-3ecf8e?logo=supabase&logoColor=white)
![Status](https://img.shields.io/badge/status-hackathon_prototype-yellow)

</div>

> **Not an official PVAMU service.** Ask PV is a hackathon prototype. The chat interface currently returns a placeholder response; the AI knowledge-base integration is the next milestone.

---

## The problem

PVAMU students often bounce between the catalog, advising pages, the registrar, and degree audits to answer simple questions like *"What do I take next semester?"* Ask PV puts those tasks in one student-facing app.

## Features

| Page | What it does | Status |
| --- | --- | --- |
| **Home** | Landing page introducing the three core tools | ✅ Built |
| **Auth** | Email sign-up / sign-in with Supabase Auth | ✅ Built |
| **Profile** | Save major, catalog year, and scheduling preferences; delete stored transcript data on request | ✅ Built (Supabase `profiles`, `transcript_rows`) |
| **Ask** | Chat UI with source citations and quick actions (book advising, open registrar, campus map) | 🟡 UI built, AI responses stubbed |
| **Plan** | Four-step schedule planner: upload transcript → degree rules → preferences → results | 🟡 UI flow built, schedule engine planned |

## Tech stack

- **Frontend:** React 18, TypeScript, Vite, React Router
- **UI:** Tailwind CSS, shadcn/ui (Radix primitives), lucide-react icons
- **Backend:** Supabase (Postgres + Auth), typed client generated from the database schema
- **Prototyping:** Initial scaffold generated with Lovable, then customized for PVAMU use cases

## Project structure

```text
src/
├── pages/                 # Index, Ask, Plan, Profile, Auth, NotFound
├── components/
│   ├── Layout.tsx         # Shared nav + page shell
│   └── ui/                # shadcn/ui components
├── hooks/                 # use-toast, use-mobile
├── integrations/supabase/ # Supabase client + generated DB types
└── lib/utils.ts
```

## Run locally

```bash
git clone https://github.com/dware11/hackathon.git
cd hackathon
npm install
cp .env.example .env      # add your Supabase project URL and publishable key
npm run dev               # http://localhost:8080
```

## Privacy by design

Students can delete stored transcript data at any time from the Profile page. The app is meant to keep only what scheduling needs.

## Roadmap

- [ ] Connect **Ask** to a retrieval-augmented model over PVAMU catalog and advising pages, with real citations
- [ ] Parse uploaded transcripts into `transcript_rows`
- [ ] Generate conflict-free schedules from degree rules and time preferences
- [ ] Export schedules to calendar (.ics)

## Team

Built during a hackathon at Prairie View A&M University. Maintained by [Deja Ware](https://github.com/dware11).
