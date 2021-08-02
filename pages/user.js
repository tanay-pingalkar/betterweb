export const User = (userInfo) => {
  return {
    html: `
      <h1>this is user</h1>
      <div class="userInfoToggle">
        <link-element to="/user/posts" change="userInfo">posts</link-element>
        <link-element to="/user/comments" change="userInfo">comments</link-element>
      </div>
      
      <router id="userInfo">${userInfo.html}</router>
    `,
    title: "user",
  };
};
