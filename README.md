<div align="center">

# 🔍 GitHub Profile Finder

### Explore Developers. Discover Projects. Visualize Code.

A developer exploration tool that lets you search GitHub users, explore their profiles, discover popular repositories, and visualize their programming language statistics — all in one interactive dashboard.

<br>

![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-orange?style=for-the-badge&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-Styling-blue?style=for-the-badge&logo=css3)

<br>

**One search. Everything about a developer.**

</div>

---

## 🌟 About The Project

GitHub Profile Finder is a web application built using HTML, CSS, and JavaScript that makes exploring GitHub developers easier and more interactive.

Using the **GitHub REST API**, the application fetches publicly available profile and repository information and presents it through a clean, visually appealing dashboard.

Instead of manually navigating through different GitHub pages, users can simply enter a username and instantly explore:

- Developer profiles and personal information.
- Followers, following, and public repositories.
- Most popular repositories based on stars.
- Programming language distribution.
- GitHub statistics.

The idea behind this project was to learn how APIs work, handle JSON data, and build an interactive application using vanilla JavaScript.

---

## ✨ Features

### 🔎 1. GitHub User Search
- Search for GitHub users using their usernames.
- Fetch actual profile information using the GitHub REST API.
- Instantly display the searched developer's profile.
- Direct links to original GitHub profiles.

### 👤 2. Profile Overview

Explore important developer information:

- Profile picture and username.
- Full name and bio.
- Location and company (when available).
- Personal website.
- GitHub profile link.

### 📊 3. GitHub Statistics Dashboard

View important statistics through visually organized cards:

- Public repositories.
- Followers.
- Following.
- Public gists.

### ⭐ 4. Top Repositories

Discover a developer's most popular repositories.

- Fetch public repositories.
- Sort repositories by stars.
- Display the top 4 repositories.
- View repository descriptions.
- Explore programming languages.
- Check stars and forks.
- Direct links to individual repositories.

### 📈 5. Programming Language Breakdown

Understand which programming languages a developer uses across their public repositories.

- Interactive doughnut chart using Chart.js.
- Language-wise repository distribution.
- Percentage-based visualization.
- Dynamic charts based on the searched profile.

*Note: Language distribution is based on repository primary-language metadata, not actual lines of code.*

### ⚖️ 6. Compare GitHub Users

Compare two GitHub developers side by side.

Explore differences in:
- Followers.
- Following.
- Public repositories.
- GitHub statistics.
- Popular repositories.

### 🕘 7. Recent Search History

- Automatically save recent searches.
- Quickly revisit previously searched profiles.
- Store search history using localStorage.
- Clear search history when needed.

### 🌙 8. Dark & Light Mode

- Switch between dark and light themes.
- Remember the selected theme using localStorage.
- Maintain theme preferences after refreshing the page.

### ⚡ 9. User Experience

- Loading indicators while fetching data.
- Error handling for invalid usernames.
- API rate-limit handling.
- Responsive layout.
- Interactive dashboard components.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application logic and DOM manipulation |
| GitHub REST API | Fetching GitHub user and repository data |
| Fetch API | Making asynchronous API requests |
| Chart.js | Programming language visualization |
| localStorage | Saving theme preferences and search history |

**No frontend frameworks were used.**

The initial version was developed using vanilla HTML, CSS, and JavaScript to understand the fundamentals of frontend development and API integration.

---

## 🔗 API Integration

This project uses the official GitHub REST API.

**1. Fetch User Information**

```http
GET https://api.github.com/users/{username}
```

Retrieves:
- Username and name.
- Avatar and bio.
- Followers and following.
- Public repositories.
- Location and profile URL.

**2. Fetch User Repositories**

```http
GET https://api.github.com/users/{username}/repos
```

Retrieves:
- Repository names.
- Descriptions.
- Programming languages.
- Stars.
- Forks.
- Repository URLs.

The application processes the API responses and dynamically updates the dashboard.

---

## ⚙️ How It Works

```text
        ENTER GITHUB USERNAME
                  |
                  ▼
           FETCH USER DATA
                  |
                  ▼
          GITHUB REST API
                  |
                  ▼
          RECEIVE JSON DATA
                  |
                  ▼
        DISPLAY PROFILE DETAILS
                  |
                  ▼
         FETCH REPOSITORIES
                  |
                  ▼
        SORT BY REPOSITORY STARS
                  |
                  ▼
       GENERATE LANGUAGE CHART
                  |
                  ▼
        INTERACTIVE DASHBOARD
```

---

## 🚀 Getting Started

Want to run the project locally?

Follow these steps.

### Prerequisites

- A web browser.
- Git.
- A code editor such as VS Code.

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd github-profile-finder
```

### 3. Open the Project

Open the folder in VS Code.

You can use the Live Server extension to run the application.

Alternatively, run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

### 4. Start Exploring!

Enter any valid GitHub username and explore their profile.

Some usernames you can try:

- `torvalds`
- `gaearon`
- `TheAlgorithms`
- `sindresorhus`

---

## 🧠 What I Learned

Building this project helped me explore and practice several important web development concepts:

- Working with REST APIs.
- Fetching and processing JSON data.
- JavaScript `fetch()`.
- Asynchronous programming using `async/await`.
- DOM manipulation.
- Handling HTTP status codes.
- Error handling using try-catch.
- Data visualization using Chart.js.
- Browser storage using localStorage.
- Responsive web design.
- Working with external APIs.

Most importantly, this project helped me understand how real-world applications retrieve, process, and display data from external services.

---

## 🔮 Future Improvements

This project is a continuous learning experience, and I plan to introduce more features as I explore new technologies.

Some planned improvements:

- 🐍 Python Flask backend integration.
- 🔐 Secure GitHub API token management.
- ⚡ Backend caching to reduce repeated API requests.
- 📊 More detailed GitHub analytics.
- 📈 Advanced repository statistics.
- 🌐 Backend deployment.
- Additional developer insights.

The goal is to gradually evolve this frontend project into a more complete developer analytics platform.

---

## 🤝 Contributing

Suggestions, ideas, and improvements are always welcome!

If you would like to contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

---

## 👩‍💻 Author

**Vaidehi Vaidya**

Building, learning, experimenting, and turning ideas into projects. 💜

---

<div align="center">

### ⭐ Found this project interesting?

Give the repository a star!

**Keep Exploring. Keep Building. Keep Learning.**

</div>