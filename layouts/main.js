export const Main = (component) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/css/main.css" rel="stylesheet">
    <title>${component.title}</title>

    <link href="/public/logo.png" rel="icon" >
  </head>
    <body>
      <nav class="main-nav">
        <link-element class="feed-toggle" to="/" change="body">feed</link-element>
        <link-element class="user-toggle" to="/user/posts" change="body">user</link-element>
      </nav>
      <router id="body">${component.html}</router>
      <script src="/js/router.js"></script>
    </body>
  </html>
  `;
};
