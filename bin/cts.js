#!/usr/bin/env node

import { inspectSystem } from "../src";
import minimist from "minimist";

const args = minimist(process.argv.slice(2));

const dryRun = args.dryRun ?? false;
const backupCache = args.backup ?? false;

inspectSystem({ dryRun, backupCache });
