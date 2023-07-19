import {
    FastifyReply,
    FastifyRequest,
    RouteOptions,
} from 'fastify';
  
export enum RouteMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
}

export const makeFastifyRoute = (
    method: RouteMethod,
    url: string,
    handler: (
        req: FastifyRequest,
        reply: FastifyReply,
      ) => Promise<void>,
):RouteOptions => {
    return {
        method,
        url,
        handler
    }
}