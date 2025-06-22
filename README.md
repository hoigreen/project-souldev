# project-souldev

**SoulDev** - Welcome to **SoulDev**, the ultimate destination for developers to connect, collaborate, and innovate. Join our vibrant community to exchange ideas, share insights, and build together. Experience the power of unity in coding.

## Introduction

Welcome to the repository of our social media web application! This README provides an overview of the project, including the technologies used in both the frontend and backend, setup instructions, and contribution guidelines. This repository contains the source code for a social media web application. The application enables users to create profiles, share posts, interact in real-time, and more. It leverages modern web technologies to provide a seamless and responsive user experience.

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Infrastructure](#infrastructure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)
</details>

## Live preview:

Production has been deploy at url [SoulDev](https://souldev.space)

## Tech Stack

### Frontend

- **Framework UI**: [NextJS 14](https://nextjs.org/)
- **UI Library**: [ReactJS](https://reactjs.org/)
- **Programming Languages**: TypeScript, JavaScript
- **Realtime Platform**: [Socket.io Client](https://socket.io/)
- **API Handling, Data Fetching**: NextJS Server Actions, [Axios](https://axios-http.com/), [React Query](https://react-query.tanstack.com/)
- **Authentication & Authorization**: [NextAuth](https://next-auth.js.org/)
- **Source Version Control**: Git, [GitHub](https://github.com/)

### Backend

- **Programming Language**: JavaScript
- **Database**: [MongoDB](https://www.mongodb.com/), [Redis](https://redis.io/)
- **Source Version Control**: Git, [GitLab](https://gitlab.com/)
- **Frameworks and Libraries**:
  - [Express](https://expressjs.com/)
  - [Cloudinary](https://cloudinary.com/)
  - [Socket.io](https://socket.io/)
  - [Swagger](https://swagger.io/)
  - and more...

### Infrastructure

- **Server**: [Vercel](https://vercel.com/)
- **CI/CD**: [GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- **Cloud Services**: [AWS EC2](https://aws.amazon.com/ec2/)
- **Containerization**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
- **Notification Center**: [Novu](https://novu.co/)
- **Domain Hosting**: [Hostinger](https://www.hostinger.com/)

## Screenshots 📸

![image](https://github.com/hoigreen/project-souldev/assets/88929110/4470647a-29c0-40e9-80c7-8e9d982d378c)

![image](https://github.com/hoigreen/project-souldev/assets/88929110/362f7ee5-d4f4-4877-b8e4-7cb67c40d1d8)

![image](https://github.com/hoigreen/project-souldev/assets/88929110/d90af734-7de2-4b52-af74-a8d164c8cee8)

![image](https://github.com/hoigreen/project-souldev/assets/88929110/764d9622-41c4-487b-b2ca-dd2099c67f47)

![image](https://github.com/hoigreen/project-souldev/assets/88929110/5ef136fb-15c0-44c7-aba4-0bcd5457b190)

![image](https://github.com/hoigreen/project-souldev/assets/88929110/4463b32b-70fb-4b91-9524-15702e07893d)

## Features:

1. **News Feeds**

   - Real-time updates from friends and followed pages
   - Personalized content based on user interests
   - Ability to like, comment, and share posts

2. **Groups**

   - Create and join groups based on interests
   - Group-specific discussions and posts
   - Admin and moderator roles for managing groups

3. **Pages**

   - Create and manage pages for businesses, brands, or interests
   - Post updates and interact with followers
   - Analytics for page performance

4. **Chatting**

   - Real-time messaging with friends and groups
   - Support for text, images, videos, and file sharing
   - Online status and typing indicators

5. **Profile**

   - Customizable user profiles with bio, profile picture, and cover photo
   - Timeline of user’s posts and activities
   - Privacy settings for controlling profile visibility

6. **Notifications**

   - Real-time notifications for likes, comments, shares, and messages
   - Notification center for managing all alerts
   - Customizable notification preferences

7. **Search**

   - Advanced search functionality to find people, pages, and groups
   - Filtered search results based on relevance and interests

8. **Content Management**

   - Rich text editor for creating posts
   - Media library for managing uploaded images and videos
   - Drafts and scheduled posts

9. **Dark Mode**
   - Toggle between light and dark themes
   - Enhanced readability and reduced eye strain

### Prerequisites

Before you get started, you need to install the following prerequisites:

- [Node.js](https://nodejs.org/en) - JavaScript runtime environment with v18 or higher.
- NodeJS package management like [pnpm](https://pnpm.io/) or [Bun](https://bun.sh/).
- MongoDB
- Redis
- Git

Once you have Node.js and bun (or pnpm) installed, you can proceed with the project setup:

## Installation

1. Clone the project from the remote repository:

```bash
# Clone on method HTTPS
git clone https://github.com/hoigreen/project-souldev.git


# Clone on method SSH
git clone git@github.com:hoigreen/project-souldev.git
```

2. Install project dependencies:

```bash
pnpm install
# or with Bun
bun install
```

4. Setup file .env with your config project.

5. Starting client and server

```bash
bun dev
```

The SoulDev application will run localy at address http://localhost:3000

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Contributing

State if you are open to contributions and what your requirements are for accepting them.

For people who want to make changes to your project, it's helpful to have some documentation on how to get started. Perhaps there is a script that they should run or some environment variables that they need to set. Make these steps explicit. These instructions could also be useful to your future self.

You can also document commands to lint the code or run tests. These steps help to ensure high code quality and reduce the likelihood that the changes inadvertently break something. Having instructions for running tests is especially helpful if it requires external setup, such as starting a Selenium server for testing in a browser.

## Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

## License

For open source projects, say how it is licensed.

## Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.

## About my team

1. Truong Quoc Hoi

- [LinkedIn](https://www.linkedin.com/in/hoigreen/)
- [Facebook](https://www.facebook.com/hoigreen)

2. Huy Nguyen

- [LinkedIn](https://www.linkedin.com/in/%C4%91%E1%BB%A9c-huy/)
- [Facebook](https://www.facebook.com/huynguyen07080401)
