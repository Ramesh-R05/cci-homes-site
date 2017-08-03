import * as React from 'react';
import { navigateAction } from 'fluxible-router';
import server from '@bxm/server';
import config from '../config';
import app from '../app';
// import GoogleFont from '../components/html/googleFont';
import bff from './bff';
import fluxibleConfigPlugin from 'fluxible-plugin-context-config';
import fluxibleLoggerPlugin from '../../fluxibleLoggerPlugin';
import logger from '../../logger';

app.plug(fluxibleConfigPlugin(config));
app.plug(fluxibleLoggerPlugin());

server(bff, config, app, React, navigateAction, logger);
