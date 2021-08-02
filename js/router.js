class Link extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.addEventListener("click", async () => {
      const to = this.attributes.to.value;
      const routerId = this.attributes.change.value;

      if (!cache[routerId][to]) {
        const { html, title } = await (
          await fetch(to, {
            method: "POST",
            body: JSON.stringify({ from: window.location.pathname }),
            headers: {
              "Content-Type": "application/json",
            },
          })
        ).json();

        window.history.pushState({}, "", to);

        document.getElementById(routerId).innerHTML = html;

        document.title = title;
        maintainCache();
      } else {
        window.history.pushState({}, "", to);
        document.getElementById(routerId).innerHTML = cache[routerId][to].html;
        document.title = cache[routerId][to].title;
      }
    });
  }
}
customElements.define("link-element", Link);

const cache = {};

function maintainCache() {
  const routers = document.getElementsByTagName("router");
  for (route of routers) {
    if (!cache[route.id]) {
      cache[route.id] = {};
    }
    cache[route.id][window.location.pathname] = {
      html: route.innerHTML,
      title: document.title,
    };
  }
}

maintainCache();

// function maintainLink() {
//   links = document.getElementsByTagName("a");

//   for (link of links) {
//     const to = link.attributes.to.value;
//     const routerId = link.attributes.change.value;

//     link.addEventListener("click", async () => {
//       if (!cache[routerId][to]) {
//         const { html, title } = await (
//           await fetch(to, {
//             method: "POST",
//             body: JSON.stringify({ from: window.location.pathname }),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           })
//         ).json();

//         window.history.pushState({}, "", to);

//         document.getElementById(routerId).innerHTML = html;

//         document.title = title;
//         maintainCache();
//       } else {
//         window.history.pushState({}, "", to);
//         document.getElementById(routerId).innerHTML = cache[routerId][to].html;

//         document.title = cache[routerId][to].title;
//       }
//       // (async () => maintainLink())();
//     });
//   }
// }

// maintainLink();
