import express from 'express';
import { home } from '@routes/home';
import { utils } from '@routes/utils';
import { user } from '@routes/user';

const routes = [user, home, utils];

export const addRoutes = (server: express.Express) => {
  for (const route of routes) {
    server.use(route);
  }
};
