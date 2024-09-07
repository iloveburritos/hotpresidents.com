/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next/pages-router/server";
 
const frames = createFrames({
  basePath: "/api/frames",
});
const handleRequest = frames(async () => {
  return {
    image: <span>Test</span>,
    buttons: [<Button action="post">Click me</Button>],
  };
});
 
export default handleRequest;