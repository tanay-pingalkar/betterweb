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
        <a class="feed-toggle" to="/">feed</a>
        <a class="user-toggle" to="/user">user</a>
      </nav>
      <div class="body">${component.html}</div>
      <script src="/js/router.js"></script>
    </body>
  </html>
  `;
};
