import { PubSub } from 'apollo-server';
import { Request } from 'express';

export interface Context {
  req: Request;
  pubsub: PubSub;
}
