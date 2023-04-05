# Reelgood web app

This web app is a resource for discovering new movies and TV shows, and finding where to stream them online.

## Table of contents

- [Overview](#overview)
  - [Previews](#previews)
  - [Links](#links)
  - [Built with](#built-with)
- [My process](#my-process)
  - [Challenges](#challenges)
  - [Continued Development](#continued-development)
- [Acknowledgements](#acknowledgements)

## Overview

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- Navigate between Home, Movies, TV Series pages.
- Search for any movie or series on all pages
- Be able to view movies and TV series by genre
- Click to view information for all movies and shows
- Infinitely load in Movies, TV series and Search pages.

### 📸&nbsp;Previews

#### mobile

<img src="./public/previews/mobile.png" alt="mobile view" width="1000"/>

#### tablet

<img src="./public/previews/tablet.png" alt="tablet view" width="1000"/>

#### desktop

<img src="./public/previews/desktop.png" alt="info page" width="1000"/>

### 🔗&nbsp;Links

- Solution: [Solution](https://github.com/jkellerman/reelgood)
- Live Site: [Live](https://reelgood.vercel.app/)

### 🧰&nbsp;Built with

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [TMDB API](https://www.themoviedb.org/?language=en-GB)

## 💭&nbsp;My process

This app is designed to help you quickly discover what films and TV series are trending and available to watch on popular streaming platforms. I chose to use the TMDB API due to its extensive collection of data points and unlike some other APIs, doesn't have any request limitations. Originally conceived as a personal project to be completed in a month, I have been continuously improving and deploying the app beyond my initial deadline, as I found it quite a useful project to focus on some performance optimisation, user experience and just a playground for adding any new skills I've picked up. I've learned a lot during the process and I plan to further enhance the app's functionality by adding a back-end soon.

There were a few decisions I made with performance in mind. The first was utilising Next.JS to take advantage of different rendering techniques. When creating the home page, I opted to use `Incremental Static Regeneration (ISR)` to dynamically generate and update the page. This decision was based on ISR's ability to serve dynamic content statically, resulting in faster load times and reduced server load. Since the content of the home page relies on data from a third-party API and the content doesn't change too frequently, I needed a solution that could ensure the content is up-to-date without any delay in rendering. ISR helped me to achieve this by generating pages with the latest data at request time and caching them as static files for future requests.

For the other pages in the app, I used different rendering methods, mainly just for experimentation. However, I ultimately decided to use server-side rendering for the individual movie/series pages. These provide crucial information about the film/series and where to find them online, and SSR would provide benefits in terms of SEO in a real-case scenario.

### Challenges

#### Slider

The homepage design is from [Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X) and it featured a trending section that exceeded the viewport width. Initially, I tried to implement a solution using various slider libraries, but they presented some UI issues, so I decided to create my own.

To enhance the user experience, I wanted to allow users to click through the slider instead of relying on horizontal scrolling with a mouse, which can be inconvenient. However, I also wanted to cater to mobile device and Mac trackpad users who might prefer touch-based scrolling. Therefore, I created a hybrid solution that includes both buttons and scrolling capabilities.

Also, clicking the navigation buttons will cause the slider to scroll by the number of cards that are fully visible in the viewport, ensuring consistency and smooth navigation across all screen sizes.

#### Infinite Scroll

For the interior pages, I implemented an infinite scroll to enable users to easily search through all available movies and series. To accomplish this, I created a custom hook that I used in the movie/series, search, and genre pages. However, I encountered some challenges when implementing the logic. At first, I tried to fetch both the endpoint and the page number in a single useEffect. Unfortunately, this approach didn't work as expected. The endpoint kept being called before the page number, causing duplication issues when switching between genre pages using the dropdown. To fix this problem, I separated the logic for fetching the endpoint and page number into two separate useEffects.

Update:

The useInfiniteScroll custom hook has now been updated to use the `useInfiniteQuery` hook from the [React Query](https://tanstack.com/query/latest) library. The conversion reduces the amount code needed and improves performance by handling data caching and background re-fetching.

#### Image Optimisation

I encountered some challenges with the Next/Image component and have learned a lot about image optimisation and how it can drastically affect the performance of your app.

One of the benefits of using Next.js is the out-of-box image optimisation when using the Next/Image component. Next.js will optimise your images by automatically converting them to next-gen formats such as WebP which offer better compression and quality than traditional formats like JPEG and PNG, without sacrificing image quality, leading to much smaller file sizes. The Next/Image component also offers on-demand image resizing so the original aspect ratios of images are never served larger than the version that's rendered on the user's screen. Next.js also automatically uses the width and height of images to prevent `Cumulative Layout Shift` which measure your overall layout stability which is important as unexpected shifts in your sites layout can lead to accidental user errors and distraction.

Unfortunately, due to the image optimisation limit on Vercel Hobby accounts I opted out of image optimisation in this app to prevent my account from potentially being suspended, so there are some performance hits in mobile devices as the aspect ratios are larger than they need to be for smaller screens.

However, I made sure to use best practices wherever possible, such as prioritising images with the `largest contentful paint (LCP)` & `lazy loading` images are that not currently in view. The latter makes sure that images are only fetched when they are in view which prevents unnecessary network requests. I also delved into the TMDB API documentation and set up some variables for the image urls so that images are fetched at width sizes that are large enough to maintain the quality of the images but not too large so that I am fetching images in their original sizes. You can find the different image sizes the API offers [here](https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400).

### 👨‍💻&nbsp;Continued development

- Allow users with login credentials to bookmark movies and TV shows.
- Allow users to view streaming platforms based on their geolocation.

## Acknowledgements

- [Entertainment web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X) for the homepage and nav design.
- A big shoutout to [Fran](https://github.com/franmsilva) for helping me optimise the API routes. Despite everything working seamlessly, Fran identified and removed some redundant duplication across the directories and introduced me to the Node query-string module, which enabled us to parse and stringify URL query strings in a more concise and efficient manner.
