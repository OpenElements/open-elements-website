# Open Elements Website

This repo contains the website of Open Elements.
The website is still work in progress.
In future the website will be available at https://www.open-elements.de and https://www.open-elements.com.

Netlify status of English page:

[![Netlify status of English page](https://api.netlify.com/api/v1/badges/0a7875a4-d4ba-4358-8616-87200dcbe7c5/deploy-status)](https://app.netlify.com/sites/open-elements-en/deploys)

Netlify status of German page:

[![Netlify status of German page](https://api.netlify.com/api/v1/badges/935f5408-eef5-4889-9cb6-ee55a0990a0f/deploy-status)](https://app.netlify.com/sites/open-elements-de/deploys)


## Building the website

The project is based on [Hugo](https://gohugo.io/) and you need to [install Hugo](https://gohugo.io/installation/) to build the website.
Once Hugo is installed you can host the website on localhost by executing to following command from the root folder of the repository:

```
hugo serve
```

While the process is running the English (default) version of the website can be reached at http://localhost:1313/ and the German can be reached at http://localhost:1314/.

## Adding Tailwind CSS

### 1-Install Tailwind CSS

Install tailwindcss via npm, and create your tailwind.config.js file in the root folder.

```
npm install -D tailwindcss
npx tailwindcss init
```

### 2-Configure your template paths

Add the paths to all of your template files in your tailwind.config.js file.

```
content: [
  "content/**/*.md", "layouts/**/*.html"
],
```

### 3-Add the Tailwind directives to your CSS
Create 'input.css' file in the root folder and add the @tailwind directives for each of Tailwind’s layers to your input CSS file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4-Code snippet for Package.json

Add the following code in 'Package.json'

```
  "scripts": {
    "dev:css": "npx tailwindcss -i input.css -o assets/css/style.css -w",
    "dev:hugo": "hugo server",
    "dev": "run-p dev:*",
    "build:css": "NODE_ENV=production npx tailwindcss -i input.css -o assets/css/style.css -m",
    "build:hugo": "hugo",
    "build": "run-s build:*"
  },
```

### 5-Dev environment
For development run the following command in terminal.
```
npm run dev
```

### 6-Production
For production ready css, run the following command in terminal.
```
npm run build
```
