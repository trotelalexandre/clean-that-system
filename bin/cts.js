#!/usr/bin/env node

import { inspectSystem } from "../src/index.js";
import minimist from "minimist";
import process from "node:process";

const args = minimist(process.argv.slice(2));

const dryRun = args.dryRun ?? false;
const backupCache = args.backup ?? false;

inspectSystem({ dryRun, backupCache });
