import { FastifyReply, FastifyRequest } from "fastify";
import jwt from 'jsonwebtoken';

const { NODE_ENV, API_KEY, JWT_SECRET } = process.env;

interface FastifyRequesAdmin extends FastifyRequest{
    user?: any
}

export const verifyToken = async (request: FastifyRequesAdmin, reply: FastifyReply, done: () => void) => {
    const authHeader = request.headers.authorization;    
    if(!authHeader) return reply.code(401).send('Unauthorized: Authorization header is missing');
    const token = authHeader.split(' ')[1];
    try{
        const decodedToken = await jwt.verify(token!, JWT_SECRET!);
        request.user = decodedToken;
        return decodedToken;
    }catch(err){
        return reply.status(401).send('Invalid token')
    }
}