```
deno run --unstable --allow-net --allow-read --watch  main.js
```
# betterweb
a server side rendered app without any dependencies. Made in deno, javascript and css. 

## what this is
better web is a server side rendered web app example that does not use any third dependencies. Every thing is made from standard api of javascript and deno. Better web is made to show 
people how easy it is to create a modern website totally using vannila javascript. Most modern framework are heavy, slow and 
unnecessarily large. Our website and client have to pay for abstraction provided by virtual dom for no reason. Lets see how better web works.

## what makes a website
a website is just html, css and javascript that our web browser renders on our screen. Browsers fetch this html, css and javascript files from servers via http.
There are different approaches that had envolved around time. 

## traditional way of making websites
in the golden era of .net , ruby etc. Servers uses templetes (just a text file that looks like html with some additional syntax), Templates are then resolved by templating engines 
and converted to html and served to users. Templating engines basically just replaced the special syntax by the data provided by servers. But the problem with templates are tat they are so static. And for each route, our website reloads.

## client side rendering
Hence the javascript become more powerful, people started realising power of javascript. And they started rendering most of the content on client using javascript.
But vanilla javascript was not cool and therefore frameworks were made. Most frameworks uses virtual dom that run your cool declarative code into real dom. All js, css and (a little html) is served by any sdk. Then javascript make a call to rest and then the site is rendered. But even if this is good for developers,
this is not good for consumers. Sooner people started realising that the web page loads slow as the virtual dom (big chunk of code) needs to port to browser, that was not efficient. It become harder for robot to find our website as they were totally written in javascript. But the good thing about client side rendering was that it make our site dynamic and no need to reload for each route.
The client side rendered sites started looking more like a app, so it is called as web apps. 

## middle way (server side rendering)
Both solutions have pros and cons, but the grand solution for better web is server side rendering. The idea is to render your  website first as much as possible and then served to you. Once it is rendered at server, it it then upto client for dynamic routing and stuff.
You can use any framework for server side rendering. But using a framework again like nextjs, nuxtjs is a bad idea. Because instead now betterweb uses old templating like way to make web pages fast.

## `better web` is better
Whenever you first time hit `app.com/`, browser sends GET request to server. Server sends component with layout (contains header and nav bar) and needed css and a small javascript file that is responsible for dynamic routing. Once out first page is laoded. Our router cache that component. And whenever you click any link, it creates a post request to `a.com/route` and this request only returns the component, because layout
is already served. It means whenever you make GET request, whole page is served , but for post request only component is server, this makes our website efficient and without need for relaod. All post request are also cached. But this is achived by only 30 lines of client javascript. Cool isnt it. 
