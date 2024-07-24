#!/usr/bin/env node

import { Cli } from 'clipanion';
import { MainCommand } from './commands/MainCommand';

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: 'fs-replace',
  binaryName: `${node} ${app}`,
  binaryVersion: '1.0.0',
});

cli.register(MainCommand);
cli.runExit(args);
