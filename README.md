[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/4YqvCfbw)
# Fridgefy

#### Welcome to Fridgefy!

It is a web app that allows you to store your recipes and ingredients that you have in a fridge.
Recipes can be filtered by ingredients, cuisine, diet and intolerances.

## Features

### All users

-   Search for recipes with filters (cuisine, diet and intolerances). Add all supported values to the filters. You can find it in the API documentation.

### Only authenticated users

-   Add ingredients to the fridge

-   Add recipes to the wish list

-   Make shopping list based on selected recipes

-   Search for recipes based on ingredients in the fridge. Add a checkbox in the filter area to show only recipes with ingredients in the fridge.

## Pages

-   Home / Hero page

-   All Recipes page with search and filters

-   Wish list page with shopping list

## API

-   https://spoonacular.com/food-api

## Database

-   Fridge items and selected recipes should be stored in the Local Storage of the browser.

## Authentication

-   By Google (Firebase Authentication)

-   NextAuth

-   Kinde

-   Any other provider of your choice

## Frontend

-   React / Next

-   Bootstrap / Styled Components / TailwindCSS

-   React / Next Router

-   Redux / Context API + useReducer

## Design Resources

-   A wireframe is provided within the repository.

![wireframe](/mockup.png)

-   You can refer for design and UI components from:

    -   Dribbble

    -   Wix

    -   Template monster

## Team Workflow

### Format

-   SCRUM meetings: 5-10 minutes per day

-   Yesterday I was working on ...

-   Today I am working on ...

-   I am stuck on / I am moving slow on..., would anyone want to pair with me to help?

### Dividing Tasks

-   Design

-   Frontend

-   Backend (API)

-   Pair programming (Take turns)

### Understand your data

-   What is the data?

-   What data do you need?

-   What type of data do you need?

-   How to store the data?

-   Create the data flow

search ingredient -> on click event -> send data to local storage -> get data from local storage -> display updated data

### Set up your environment

-   One member of the team will create the Frontend App

-   Delete all the unnecessary files

-   Create the firebase project

-   Enable the firebase authentication

-   Create .env file at the root of the project with the firebase project credentials and add it to the .gitignore file (.env config)[https://create-react-app.dev/docs/adding-custom-environment-variables/]

-   **MAKE SURE YOU DON'T PUSH THE .ENV FILE TO GITHUB**

-   Push the initial commit to the repository

-   Every member should clone the repository

-   Every member should create their own branch
