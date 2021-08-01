const cache = {};
cache[window.location.pathname] = {
  html: document.querySelector(".body").innerHTML,
  title: document.title,
};

const links = document.getElementsByTagName("a");

for (link of links) {
  const to = link.attributes.to.value;
  link.addEventListener("click", async () => {
    if (!cache[to]) {
      const { html, title } = await (
        await fetch(to, { method: "POST" })
      ).json();

      window.history.pushState({}, "", to);
      document.querySelector(".body").innerHTML = html;
      document.title = title;
      cache[to] = {
        html: html,
        title: title,
      };
    } else {
      document.querySelector(".body").innerHTML = cache[to].html;
      document.title = cache[to].title;
      window.history.pushState({}, "", to);
    }
  });
}
