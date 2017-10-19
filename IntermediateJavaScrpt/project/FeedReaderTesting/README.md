# Project Overview

![web-image](images/UdaciFeeds.jpg)

In this project I implement web-based application test suite for application that reads RSS feeds.

## How to use

1. clone git repository. (or down load it from [GitHub](https://github.com/mhigu/Udacity_FrontEndWebDeveloper))

```bash
git clone https://github.com/mhigu/Udacity_FrontEndWebDeveloper.git
```

2. move project directory

```bash
cd Udacity_FrontEndWebDeveloper/IntermediateJavaScrpt/project/FeedReaderTesting/
```

3. open index.html

```bash
open index.html
```

4. Take a look!

## What will I learn

I will learn how to use Jasmine to write a number of tests against a pre-existing application. These will test the underlying business logic of the application as well as the event handling and DOM manipulation.

## Test Subjects

1. Explore the application's HTML (**./index.html**), CSS (**./css/style.css**) and JavaScript (**./js/app.js**) to gain an understanding of how it works.
2. Explore the Jasmine spec file in **./jasmine/spec/feedreader.js** and review the [Jasmine documentation](http://jasmine.github.io).
3. Edit the `allFeeds` variable in **./js/app.js** to make the provided test fail and see how Jasmine visualizes this failure in your application.
4. Return the `allFeeds` variable to a passing state.
5. Write a test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
6. Write a test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
7. Write a new test suite named `"The menu"`.
8. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
9. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
10. Write a test suite named `"Initial Entries"`.
11. Write a test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
12. Write a test suite named `"New Feed Selection"`.
13. Write a test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
14. No test should be dependent on the results of another.