import { HttpResponse } from 'uWebSockets.js';
import { AnyRouter } from '@trpc/server';
import {
  NodeHTTPCreateContextFnOptions,
  NodeHTTPCreateContextOption,
} from '@trpc/server/adapters/node-http';
import { HTTPBaseHandlerOptions } from '@trpc/server/dist/http';

/**
 * @internal
 */
type ConnectMiddleware<
  TRequest extends WrappedHTTPRequest = WrappedHTTPRequest,
  TResponse extends WrappedHTTPResponse = WrappedHTTPResponse
> = (req: TRequest, res: TResponse, next: (err?: any) => any) => void;

export type WrappedHTTPRequest = {
  headers: Record<string, string>;
  method: 'POST' | 'GET';
  query: string;
  url: string;
};

export type WrappedHTTPResponse = {
  // setStatus(status: number): void;
  // setHeader(key: string, value: string): void;
} & HttpResponse

export type uHTTPHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends WrappedHTTPRequest,
  TResponse extends WrappedHTTPResponse
> = HTTPBaseHandlerOptions<TRouter, TRequest> &
  NodeHTTPCreateContextOption<TRouter, TRequest, TResponse> & {
    middleware?: ConnectMiddleware;
    maxBodySize?: number;
    // experimental_contentTypeHandlers?: NodeHTTPContentTypeHandler<
    //   TRequest,
    //   TResponse
    // >[];
  };

export type uHTTPRequestHandlerOptions<
  TRouter extends AnyRouter,
  TRequest extends WrappedHTTPRequest,
  TResponse extends WrappedHTTPResponse
> = {
  req: WrappedHTTPRequest;
  res: WrappedHTTPResponse;
  path: string;
} & uHTTPHandlerOptions<TRouter, TRequest, TResponse>;

export type CreateContextOptions = NodeHTTPCreateContextFnOptions<
  WrappedHTTPRequest,
  WrappedHTTPResponse
>;
