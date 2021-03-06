import { Index } from "./pages/index.js";
import { Main } from "./layouts/main.js";
import { User } from "./pages/user.js";

const readDir = async (path) => {
  const dir = Deno.readDir(path);
  let files = {};
  for await (const data of dir) {
    if (data.isFile) {
      files["/" + path + "/" + data.name] = await Deno.readFile(
        path + "/" + data.name
      );
    } else {
      files = {
        ...files,
        ...(await readDir(path + "/" + data.name)),
      };
    }
  }
  return files;
};

const js = await readDir("js");
const css = await readDir("css");
const publicF = await readDir("public");

const server = Deno.listen({ port: 8080 });
console.log(`better web started at http://localhost:8080/`);

for await (const conn of server) {
  (async () => {
    const http = Deno.serveHttp(conn);
    for await (const { request, respondWith } of http) {
      const url = new URL(request.url);
      let res = "404";
      let headers = {};
      let status = 404;

      if (url.pathname == "/") {
        if (request.method == "GET") {
          res = Main(Index());
          status = 200;
          headers["Content-type"] = "text/html";
        } else if (request.method === "POST") {
          res = JSON.stringify(Index());
          status = 200;
        }
      }
      if (url.pathname == "/user/posts") {
        if (request.method == "GET") {
          res = Main(User({ html: "this are posts" }));
          status = 200;
          headers["Content-type"] = "text/html";
        } else if (request.method === "POST") {
          const { from } = await request.json();
          if (from.startsWith("/user")) {
            res = JSON.stringify({ html: "this are posts" });
          } else {
            res = JSON.stringify(User({ html: "this are posts" }));
          }

          status = 200;
        }
      }
      if (url.pathname == "/user/comments") {
        if (request.method == "GET") {
          res = Main(User({ html: "this are comments" }));
          status = 200;
          headers["Content-type"] = "text/html";
        } else if (request.method === "POST") {
          const { from } = await request.json();
          if (from.startsWith("/user")) {
            res = JSON.stringify({ html: "this are comments" });
          } else {
            res = JSON.stringify(User({ html: "this are comments" }));
          }

          status = 200;
        }
      } else if (url.pathname.startsWith("/js")) {
        if (request.method == "GET") {
          res = js[url.pathname];
          status = 200;
        }
      } else if (url.pathname.startsWith("/css")) {
        if (request.method == "GET") {
          res = css[url.pathname];
          headers["Content-type"] = "text/css";
          status = 200;
        }
      } else if (url.pathname.startsWith("/public")) {
        if (request.method == "GET") {
          res = publicF[url.pathname];
          status = 200;
        }
      }

      respondWith(
        new Response(res, {
          status: status,
          headers: {
            ...headers,
          },
        })
      );
    }
  })();
}
