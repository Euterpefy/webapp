import { FAQProps } from './faq';

// faqs.tsx
export const faqList: FAQProps[] = [
  {
    id: 'what-does-the-site-do',
    q: 'What does the site do?',
    a: `Euterpefy is designed to enhance your music experience by creating personalized playlists based on your preferences using the Spotify API. It allows users to generate playlists quickly or through advanced customizations.`,
  },
  {
    id: 'why-login',
    q: 'Why do we need users to log in?',
    a: `Logging in with Spotify is essential for accessing personal data like your music preferences, which helps in creating tailored playlists. It ensures that all interactions with Spotify’s services are secure and personalized.`,
  },
  {
    id: 'data-collection',
    q: 'Do we collect data?',
    a: `No, Euterpefy does not store any personal data. We use your Spotify account to fetch information directly via Spotify’s API without storing it. Your session data remains encrypted and only within your browser.`,
  },
];
