# **App Name**: LexiQuest

## Core Features:

- Article Display Grid: Display articles in a responsive 3-column grid format, including title, BLUF, reading time, summary, and a link to the full article.
- Gamified Leaderboard: Implement a points system and leaderboard to rank users based on total articles read and reading time.
- Progress Tracking: Allow users to bookmark articles, save reading progress, and track reading statistics.

## Style Guidelines:

- Primary color: White (#FFFFFF) for a clean reading environment.
- Secondary color: Light gray (#F0F0F0) for backgrounds and dividers.
- Accent: Teal (#008080) for interactive elements and highlights.
- Use a 3-column grid layout for article display to optimize content presentation.
- Use clear and consistent icons for bookmarks, sharing, and navigation.
- Subtle animations for loading and transitions to enhance user experience.

## Original User Request:
Project Name: Scroll Sage - Gamified Reading App

Description: Develop a web application called Scroll Sage, a gamified reading app that enhances user engagement through a points and leaderboard system. The app should provide the following features:

Home Page Navigation:

When a user navigates to the home page, they should be directed to either the main page or the login/registration page based on their session status.
Main Page:

Display a welcome message at the top.
Include a horizontal navigation bar with options: Home, Leaderboard, My Profile, About.
Show the user's current reading statistics on the right-hand side.
Provide an option in the left/center of the page for the user to select a reading time (between 1 and 10 minutes) and choose tags from a list of available tags.
Upon selection, make an API call to retrieve articles based on the selected time and tags.
Article Reading Page:

Display articles in a 3-column grid format.
Each article should include the title, BLUF (Bottom Line Up Front), reading time, article summary, and a link to the full article.
Include a bookmark feature for each article.
Make an API call in the background to record the articles displayed to the user (payload: user ID, article ID).
User Actions and Points System:

Award points for actions such as reading articles, bookmarking articles, and clicking on article links.
Calculate and display the total number of articles read and total reading time in the user's profile.
Display saved (bookmarked) articles in the user's profile.
Leaderboard Page:

Display user ranks based on total articles read and total reading time.
Login and Registration Pages:

Implement standard login and registration pages.

Technical Requirements:

Ensure the app is responsive and optimized for both desktop and mobile devices.

Additional Notes:

Ensure secure handling of user data.
Provide a clean and intuitive user interface.
Optimize API calls for performance.
  