import { hello } from '../index';

const [, , name] = process.argv;

hello(name);
