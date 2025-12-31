---
title: "Web Architecture 101: A Developer's Essential Handbook"
subtitle: 'Simplified Guidance for Building Robust Web Solutions'
author: 'Bikash Jaiswal'
date: '2024-02-05'
---

## What is Web Architecture?

Web architecture is like the blueprint of a website, deciding how all the parts fit together to make it work. Imagine it as the design and structure that ensures a website runs smoothly and delivers content to users. It's crucial to make websites perform well, handle more visitors, and stay easy to update.

## Parts of Web Architecture

Think of a website like a team. Each member has a specific role:

- **Client:** This is you – using a web browser, mobile app, or computer program to access a website.
- **Server:** Picture this as the brain – a computer or group of them storing and sending website content to users.

- **Network:** It's like the roads connecting the client and server, allowing them to communicate.

- **Content:** The information on the website, like text, pictures, and videos.

- **Database:** This is where the website stores and organizes data, like user information.

## Different Ways to Build Websites

We can build websites in different ways, depending on what we need. Here are three common methods:

### 1. Monolithic Architecture

Imagine all team members tightly linked, making it easy to work together. But, it can be tough to grow and keep everything organized.

![Monolithic architecture](/images/monolithic.webp)

### 2. Microservices Architecture

Picture a team with independent members, each doing their own thing. It's easier to grow and keep things tidy, but it's a bit more complex.

![Microservices architecture](/images/microservices.webp)

### 3. Serverless Architecture

This is like using ready-made tools to build a website. It's simple for growth and maintenance, but it can be tricky for developers.

![Serverless architecture](/images/serverless.jpg)

## Things to Think About

When designing a website, there are a few important things to consider:

- **Speed:** How quickly does the website load and respond?
- **Size:** Can the website handle more people using it?
- **Updates:** How easy is it to change and improve the website?

- **Safety:** Is the website and its information secure?

- **Cost:** How much does it take to build and keep the website running?

By thinking about these things, developers can make websites that work well, stay reliable, and are easy to take care of.

## What is REST?

Think of REST like a set of rules for how computer programs talk to each other on the internet. REST APIs are like instruction manuals that tell software how to share information. Let's look at two important parts: constraints and endpoints.

## REST Constraints:

1. **Stateless:** Imagine each conversation is a fresh start. When you ask for something, you need to provide all the details. No secrets are stored between talks. This makes things clear and reliable.

2. **Client-Server Architecture:** Picture it like a chef and a waiter. The chef (server) cooks the food (handles data and logic), and the waiter (client) serves it to the customer (user). They're separate but work together.

3. **Uniform Interface:** This is like having a common language. You identify things with names (like web addresses), talk about them in a certain way (using specific formats), and use tags to know what's what. It's like a set of rules for a game.

4. **Cacheability:** Think of it like remembering things. If you already know an answer, you don't have to ask again. This makes things faster and saves work.

5. **Layered System:** It's like building a tower with different floors. Each floor has its job, and they work together to make a strong structure. This helps make things flexible and able to handle a lot.

6. **Code on Demand (Optional):** Sometimes, the server can share a small program with the client. It's like giving a tool to a friend to help with a task. This is like an extra feature but not always used.

## REST Endpoints:

Endpoints are like specific doors to access different parts of the information. Here are some types:

- **GET:** Imagine asking for a menu at a restaurant. You get to see what's available.

- **POST:** It's like placing an order. You tell the kitchen (server) what you want to add.

- **PUT:** Imagine telling the kitchen to replace a dish on the menu with a new one.

- **DELETE:** It's like saying, "I don't want this anymore, take it off the menu."

- **PATCH:** Instead of changing everything, you tell the kitchen what small adjustments to make to a dish.

- **OPTIONS:** It's like asking the restaurant, "What can I do here? What are the rules?"

Understanding these rules helps programmers create apps and websites that can talk to each other in a friendly and organized way. It's like having a common language for computers on the internet!

An example of a RESTful API for a blog website using `fastapi` in python.

```python
from fastapi import FastAPI, HTTPException

app = FastAPI()

# Sample data for blog posts
blog_posts = [
    {"id": 1, "title": "First Post", "content": "This is the content of the first post."},
    {"id": 2, "title": "Second Post", "content": "Content for the second blog post."},
]

# Endpoint to retrieve all blog posts
@app.get("/posts")
def get_all_posts():
    return blog_posts

# Endpoint to retrieve a specific blog post by ID
@app.get("/posts/{post_id}")
def get_post_by_id(post_id: int):
    for post in blog_posts:
        if post["id"] == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

# Endpoint to create a new blog post
@app.post("/posts")
def create_post(new_post: dict):
    post_id = len(blog_posts) + 1
    new_post["id"] = post_id
    blog_posts.append(new_post)
    return new_post

# Endpoint to update an existing blog post
@app.put("/posts/{post_id}")
def update_post(post_id: int, updated_post: dict):
    for index, post in enumerate(blog_posts):
        if post["id"] == post_id:
            blog_posts[index] = {**post, **updated_post}
            return blog_posts[index]
    raise HTTPException(status_code=404, detail="Post not found")

# Endpoint to delete a specific blog post by ID
@app.delete("/posts/{post_id}")
def delete_post(post_id: int):
    for index, post in enumerate(blog_posts):
        if post["id"] == post_id:
            deleted_post = blog_posts.pop(index)
            return deleted_post
    raise HTTPException(status_code=404, detail="Post not found")

```

## Simple Object Access Protocols (SOAP)

Simple Object Access Protocol (SOAP) is a protocol for exchanging structured information in web services. It allows programs running on different operating systems and different technologies to communicate with each other. SOAP is based on XML and provides a standardized way to access services, making it a widely used protocol for web service communication.

## Structure

SOAP messages are structured using XML (eXtensible Markup Language). A SOAP message typically consists of:

- **Envelope:** The outermost element that defines the start and end of the SOAP message.
- **Header (Optional):** Contains additional information about the message, such as authentication credentials or metadata.
- **Body:** Contains the actual data being transmitted, such as method calls or responses.

## Request and Response

### Request

A SOAP request consists of a method call from a client to a server. The method call is typically defined within the `<Body>` element of the SOAP message. It includes:

- **Method Name:** The name of the method being called.
- **Parameters:** Any input data required by the method.

#### Example of a SOAP request:

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:example="http://www.example.com">
    <soap:Header/>
    <soap:Body>
        <example:MethodName>
            <example:Parameter1>Value1</example:Parameter1>
            <example:Parameter2>Value2</example:Parameter2>
        </example:MethodName>
    </soap:Body>
</soap:Envelope>
```

## Response

A SOAP response is sent from the server to the client in response to a request. It typically includes:

- **Method Name:** The name of the method being called.

- **Return Value:** The result of the method call, if any.

#### Example of a SOAP response:

```xml
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:example="http://www.example.com">
    <soap:Header/>
    <soap:Body>
        <example:MethodNameResponse>
            <example:Result>ResultValue</example:Result>
        </example:MethodNameResponse>
    </soap:Body>
</soap:Envelope>
```

## Examples

SOAP is used in various applications, including:

- **Web Services:** SOAP is commonly used in web services to allow different systems to communicate with each other over the internet.

- **Enterprise Applications:** SOAP is often used in enterprise applications for exchanging data between different departments or systems within an organization.

- **Integration Platforms:** SOAP is used in integration platforms to connect different software systems and enable seamless data exchange.

- **Financial Services:** SOAP is used in financial services for secure and reliable communication between banking systems, payment gateways, and other financial institutions.

In summary, SOAP provides a standardized way to exchange structured information between different systems, making it a popular choice for web service communication in various industries.

## What are WebSockets?

Imagine you're chatting with a friend on your phone. You send a message, and your friend instantly receives it – that's quick, right? Now, think about websites. Usually, when you open a webpage, your browser asks the server for information, and the server responds. But what if you want information to be sent instantly, without asking every time? That's where WebSockets come in.

## How WebSockets Work:

### Starting the Chat:

- You (the browser) ask your friend (the server) if they're okay to chat using WebSockets.
- If your friend agrees, you both start a special kind of conversation that stays open as long as you need.

### Talking Back and Forth:

- Now, you and your friend can send messages whenever you want, without asking, "Can I talk now?"

### Ending the Chat:

- When you're done chatting, you say goodbye, and the special conversation closes.

## Example: Real-Time Chat

Think of a chat app on your phone where messages appear instantly without refreshing. That's because the app uses WebSockets. You send a message, and it shows up on your friend's screen right away. No need to keep asking the server if there are new messages – it happens in real-time.

## When to Use WebSockets:

- **Real-Time Fun:**
  Great for games, live scores in sports apps, or updating social media feeds instantly.
- **Need for Speed:**
  Perfect for situations where waiting even a second is too long, like online games or quick updates in apps.
- **Keeping it Light:**
  If you want to save energy and resources, like when using IoT devices (smart gadgets), WebSockets are efficient.

## When Not to Use WebSockets:

- **Taking it Slow:**
  If your app doesn't need to update very often, like a simple webpage with occasional changes, WebSockets might be too much.
- **Big and Heavy:**
  When dealing with large files or tons of data, WebSockets can become a bit too chatty. Sometimes regular methods are better.
- **Old School:**
  If you need to support really old browsers, they might not understand WebSockets well. In those cases, it's better to use other ways to talk.
- **Serious Security:**
  If your conversations need to be super secret or have special security, you might want to use other methods to be extra safe.

So, WebSockets are like having a super-fast and always-open chat line between your browser and the server. They're awesome when you need instant updates and quick conversations on the web!

# HTTP Push and Pull Methods

In the world of web communication, there are two primary methods for exchanging data between clients and servers: HTTP Pull and HTTP Push. These methods dictate how data is transferred between the client and server and are essential for understanding how web applications work.

## Pull Method

In the Pull method, also known as client-initiated communication, the client sends a request to the server to fetch data. The server then responds to the client's request by sending the requested data. This process is initiated by the client whenever it needs new or updated information.

### Structure of Pull Method:

1. **Client Requests Data:** The client sends a request to the server, asking for specific data or resources.
2. **Server Responds:** The server processes the request and sends back the requested data as a response to the client's request.

### Example of Pull Method:

When you open a web page in your browser, the browser sends a request to the server for the webpage's HTML, CSS, and JavaScript files. The server then responds by sending these files back to the client, allowing the browser to render the webpage.

## Push Method

In the Push method, also known as server-initiated communication, the server sends data to the client without the client explicitly requesting it. The server can initiate communication with the client whenever new data or updates are available, pushing the information to the client in real-time.

### Structure of Push Method:

1. **Server Sends Data:** The server proactively sends data or updates to the client without waiting for a request.
2. **Client Receives Data:** The client receives the pushed data from the server and processes it accordingly.

### Example of Push Method:

Consider a real-time chat application where users can send messages to each other. When a user sends a message, the server can push the message to all connected clients in real-time without waiting for them to request it. This ensures that all users receive new messages instantly as they are sent.

HTTP Pull and Push methods offer different approaches to data exchange between clients and servers. While Pull method requires the client to initiate communication by requesting data from the server, Push method allows the server to proactively send data to the client without the client's explicit request. Understanding these methods is crucial for building efficient and responsive web applications that meet the needs of users in various scenarios.

## Conclusion

Ultimately, the choice among these technologies depends on the specific requirements of the application, including factors such as performance, scalability, security, and real-time capabilities. By understanding the strengths and limitations of each option, developers can make informed decisions to create robust and efficient web solutions tailored to their needs.
