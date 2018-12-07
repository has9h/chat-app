# Simple Chat App with Timer

*Simple Chat Application using express.js. The following are the chat features/functionalities:*

## Required Modules:

1. body-parser

2. ejs

3. mongodb

4. mongoose

5. socket.io

6. nodemon

7. express.js

Users are greeted with the following page, where they can login:

**There is an issue with the AJAX function in the button however, rendering it non-functional for now**

**Please use the following URL to move to the second chat signin page: `/index`** 

![chat-app-has9 c9users io](https://user-images.githubusercontent.com/25825681/49664725-ec2c1200-fa7c-11e8-9237-0de4aed61d5a.png)

The second page presents itself as a form with username and session name:

![chat-app-has9 c9users io_index](https://user-images.githubusercontent.com/25825681/49665080-f1d62780-fa7d-11e8-9e54-4aa4f0c5584a.png)

**Note: The session button does not work; a separate database collection is required to maintain the collections, and chat history**

Start the chat by clicking on the timer, which will produce the 'Send Message' button. After that, a user can initiate a conversation

![chat-app-has9 c9users io_index 1](https://user-images.githubusercontent.com/25825681/49665092-f995cc00-fa7d-11e8-82d1-19f190e2f3a4.png)

The chat can continue for the duration of the specified time, after which no more messages will be allowed

![chat-app-has9 c9users io_index 2](https://user-images.githubusercontent.com/25825681/49665101-00bcda00-fa7e-11e8-81a0-42a8970f755d.png)

