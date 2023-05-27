# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Lessons

1. Create Layout
   1. create react app
   2. add header and footer
   3. show brand link and menus on header
2. Create Context
   1. add context
   2. add theme to context
   3. add button to navbar to change the theme
3. Define Routes
   1. Home Page
   2. Post Page
4. List Posts
   1. define reducers
   2. create load posts function
   3. show loading, error and posts
5. List Users
   1. define reducers
   2. create load users function
   3. show loading, error and users
6. Create Post Details Page
   1. link posts in home page
   2. fetch posts from backend
   3. render post title and body
   4. render post title and body
7. Filter Posts By Keyword and Authors
   1. Add search query to routes
   2. implement filter by query in home screen
   3. Add userId to routes
   4. implement filter by user in home screen
8. Login User
   1. Create Login Page
   2. design login form
   3. handle login action
   4. set user in the context
9. Authenticate User
   1. Add user to context
   2. create private route
10. Implement Backend API
    1. Install express
    2. create express app
11. Connect to MongoDB Database 2. create mongodb database on atlas cloud server 3. create .env file and past connection uri there
    1. Install mongoose and dotenv
    2. connect to the database
12. Create User APIs
    1. create user model
    2. create user list and details
13. Create Post APIs
    1. create post model
    2. create post list and details
    3. seed sample data
    4. Go to HomePage, PostPage & LoginPage to changes fake api to real api
14. Switch Between Mock and Real Backend API
    1. add backendAPI to the context
    2. add switch button to navbar
    3. use it in the all screens
15. Create Post
    1. build input form to create post
    2. handle input events
    3. call api to save the post
16. Update User Profile
    1. build input form to update
    2. handle input events
    3. call api to update profile
17. Register Screen
    1. Copy login screen
    2. change to register
