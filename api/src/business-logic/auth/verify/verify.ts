import { FastifyReply, FastifyRequest } from "fastify";

const { NODE_ENV, API_KEY, JWT_SECRET } = process.env;

export const verify = (request:FastifyRequest, reply: FastifyReply, done: () => void) => {
    console.log(request.headers)
    const apiKey = request.headers['api-key'];
    const isHttps = request.protocol === 'https' || NODE_ENV! == 'development';
    if(!isHttps) return reply.code(400).send('Bad Request: The request must be made over HTTPS'); 
    if(!apiKey) return reply.code(401).send('Unauthorized: API key is missing');
    const validApiKey = apiKey == API_KEY!;
    if(!validApiKey) return reply.code(401).send('Unauthorized: Invalid API key');
    done();
}
