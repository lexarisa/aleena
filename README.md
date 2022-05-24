<!-- PROJECT LOGO -->
<br />
<div align="center">
 <img src='./utils/logo.png' width=200px>

  <p align="center">
    Project Management Tool with developers at its core
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src='./utils/main-dashboard.png' width=500px>
<img src='./utils/task-dashboard.png' width=500px>
<img src='./utils/documentation-dashboard.png' width=500px>
<img src='./utils/documentation-card.png' width=500px>
<br />

We start at the landing page. Where we can login through Github or sign up to authorize and install the app. Afterwards we'll be redirected to the project dashboard, where we can access an existing project or create a new one.
Once we have selected an option we will navigate to the main dashboard.

To the left we can see our sidebar. Here we can add teammates to the current project or switch between existing ones, as well as create a new one.
In the center we can see the milestones, these allow us to break the development of our project into its main building blocks.
To the right we have the Feed view, where we have access to the latest pull requests done to our repos.

Each milestone will take us into a board view of all the tasks associated. These are organized by their status (To do, in progress, to review and done, as well as a backlog section.)
Tasks are created here. We can add a title, description, status,priority, tags, due date and a PR link. This link will help us keep track of any movements on that pull request and display them in the feed as well as update the status of the task associated.

These tasks can also be filtered according to the tags, priority and status.

Finally the documentation page allows us to share useful resources with our team. The docs can contain text and code blocks.

### Built With

- [Next.js](https://nextjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Express](https://www.express.com/)
- [Github API](https://docs.github.com/en/rest)

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/lexarisa/alena.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Add the .env variables

   ```js
   PORT = 3000;
   ```

   ```js
   DATABASE_URL =
     'postgresql://janedoe:mypassword@localhost:5432/mydb? schema=sample';
   ```

### Running the code

For the backend run:

```js
npm start;
```

For the frontend run

```js
npm run start;
```
