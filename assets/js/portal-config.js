/*
 * Agent Portal configuration — the one file to edit for the team hub.
 *
 * googleClientId: OAuth "Web application" client ID from Google Cloud Console.
 *                 Until it is filled in, the portal shows a "sign-in is being connected" notice.
 * allowedDomain:  Only Google accounts on this domain can get in.
 * apps:           Tiles shown after sign-in. "tool" tiles are the big ones; "site" tiles are secondary.
 *                 Change a url here when an app moves to its own subdomain (e.g. coach.thekokagroup.com).
 * updates:        Team announcements, newest first. Keep each one short.
 */
window.KOKA_PORTAL = {
  googleClientId: "99455166084-it4emc00r4akalltd24kjr3agkjfbrvu.apps.googleusercontent.com",
  allowedDomain: "thekokagroup.com",
  sessionHours: 12,
  accessContact: "anersi@thekokagroup.com",

  apps: [
    {
      id: "sales-coach",
      kind: "tool",
      name: "Sales Coach",
      tagline: "Call review and coaching",
      description: "Upload recorded calls, see how each one maps to the script, and leave notes your rep can hear at the exact moment.",
      url: "https://tkg-sales-coach.vercel.app",
      status: "Live",
      icon: "headset"
    },
    {
      id: "command-center",
      kind: "tool",
      name: "Command Center",
      tagline: "Notes, reminders, and follow-ups",
      description: "Every voice note and reminder, classified and organized. Add, review, and text from one place.",
      url: "https://koka-command-center.vercel.app",
      status: "Live",
      icon: "grid"
    },
    {
      id: "hiring-site",
      kind: "site",
      name: "Hiring Site",
      tagline: "Recruiting page for candidates",
      description: "The phone-first recruiting page and application form. Share the link with prospective agents.",
      url: "https://tkg-hiring-site.vercel.app",
      status: "Live",
      icon: "users"
    },
    {
      id: "reshop-waitlist",
      kind: "site",
      name: "Re-shop Waitlist",
      tagline: "Client waitlist and demand summary",
      description: "Clients join at /join. Work the list and the carrier demand summary from the owner dashboard at /admin.",
      url: "https://tkg-reshop-waitlist.vercel.app/admin",
      status: "Live",
      icon: "refresh"
    }
  ],

  updates: [
    {
      date: "2026-09-12",
      title: "Agent Portal is live",
      body: "Sign in with your @thekokagroup.com Google account to reach Sales Coach, Command Center, and the team sites from one place."
    }
  ]
};
