#!/usr/bin/env node
import { houston } from "./commands/houston";
import { showBanner } from "./utils/logger.util";

showBanner();

houston.parse(process.argv);
