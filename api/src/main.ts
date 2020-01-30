import { createServer, IncomingMessage, ServerResponse } from 'http';
 
const port = 3000;
 
const server = createServer((_request: IncomingMessage, response: ServerResponse) => {
  response.end('Hello world!');
});
 
server.listen(port, (error?: any): void => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
