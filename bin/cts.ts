#!/usr/bin/env node

import { inspectSystem } from "../src/index.js";
import minimist from "minimist";
import process from "node:process";

const args = minimist(process.argv.slice(2));

const dryRunFlag: boolean = args.dryRun ?? false;
const backupCacheFlag: boolean = args.backup ?? false;

inspectSystem({ dryRunFlag, backupCacheFlag });
