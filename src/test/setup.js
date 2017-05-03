import { backendLogger as logger } from '@bxm/winston-logger'
import { jsdom } from 'jsdom';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonAsPromised from 'sinon-as-promised';

chai.use(sinonChai);

logger.remove('console');

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.expect = chai.expect;
global.sinon = sinon;
