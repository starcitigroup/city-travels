# City Travels - Tech Stack & Architecture

## Core Technology
- **Frontend Framework**: React 18+ (using Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS for rapid, utility-first design. Custom CSS for specific branding needs.
- **Routing**: `react-router-dom` (if multi-page).

## Integrations
- **Contact Form**: EmailJS or Formspree (Serverless handling of emails).
- **Analytics**: Google Analytics 4 (future).

## Project Structure (Proposed)
```
/src
  /assets        # Images, fonts, static files
  /components    # Reusable UI components (Navbar, Footer, Hero, ServiceCard)
  /pages         # Page views (Home, About, Services, Contact)
  /styles        # Global styles and overrides
  /utils         # Helper functions
  App.tsx        # Main application component
  main.tsx       # Entry point
```

## Deployment
- **Platform**: Vercel or Netlify (ideal for static/SPA).
- **CI/CD**: GitHub Actions (basic build check).
