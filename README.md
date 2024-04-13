# Euterpefy: Music Recommender Web App

Euterpefy is a music recommender web application that leverages the Spotify API to provide personalized playlists based on users' mood and music preferences. Built with Next.js and Shadcn UI, this project aims to offer a seamless and intuitive experience for music enthusiasts.

## Key Features

1. **Mood-Based Playlists**: Users can select their current mood, and Euterpefy will generate a personalized playlist that matches the chosen emotional state, providing a soundtrack that enhances their listening experience.

2. **Personalized Recommendations**: Euterpefy analyzes users' listening history and preferences to offer tailored song and artist recommendations, ensuring a continuous discovery of new music that aligns with their tastes.

3. **Advanced Playlist Customization**: Users can fine-tune their playlists by adjusting various parameters, such as track popularity, dance-ability, valence, and loudness, to create the perfect listening experience.

4. **Seamless Spotify Integration**: Euterpefy seamlessly integrates with Spotify, allowing users to explore the platform's vast music library, add recommended tracks directly to their Spotify accounts, and sync their listening history across devices.

## Technical Overview

Euterpefy is built using the following technologies:

- **Next.js**: A React framework that provides server-side rendering, static site generation, and other powerful features to enhance performance and SEO.
- **Shadcn UI**: A beautifully designed UI library that ensures a consistent and visually appealing user experience across the application.
- **Spotify API**: The Spotify Web API is utilized to fetch user data, retrieve music recommendations, and integrate with the user's Spotify account.

By leveraging these technologies, Euterpefy delivers a modern and efficient web application that prioritizes user experience and seamless integration with the Spotify ecosystem.

## Getting Started

To get started with Euterpefy, follow these steps:

1. **Clone the repository**:

   ```
   git clone https://github.com/Euterpefy/web-app.git
   ```

2. **Install dependencies**:

   ```
   cd web-app
   npm install
   ```

3. **Set up environment variables**:

   - Create a `.env.local` file in the project root.
   - Obtain the necessary Spotify API credentials (client ID and client secret) and add them to the `.env.local` file.

4. **Start the development server**:

   ```
   npm run dev
   ```

5. **Access the application**:
   Open your web browser and navigate to `http://localhost:3000` to access the Euterpefy web application.

## Roadmap

- Implement user authentication and personalization features, allowing users to save their mood preferences and playlists.
- Develop a mobile-friendly version of the application to reach a wider audience.
- Explore machine learning-based recommendations to enhance the personalization capabilities of the app.
- Incorporate social features, enabling users to share playlists and discover new music through their connections.

## Contributing

Contributions to Euterpefy are welcome! If you have any ideas, bug reports, or feature requests, please feel free to open an issue or submit a pull request.

## Acknowledgments

Euterpefy is a personal project inspired by the love for music and the desire to create a seamless music discovery experience. We are grateful to the Spotify team for providing the powerful API that enables this application, as well as the open-source community for the tools and resources used in its development.

Let the music inspire you with Euterpefy!
