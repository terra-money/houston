export interface IOptions {
  handlers: Object;
  initialization: Function;
}

export const validateOptions = (options: IOptions) => {
  const { handlers, initialization } = options;

  if (!initialization!) {
    const message =
      `The initialization property specified in your ` +
      `reporter config must be a function. The current value is ` +
      `${initialization}.`;
    throw new Error(message);
  }

  if (!handlers) {
    const message =
      `You must provide a handlers property in your reporter ` +
      `config. Please ensure that the handlers property ` +
      ` exists and is in the following form:\n ` +
      `  handlers: {\n` +
      `    <handlerName1>: [\n` +
      `       handler1,\n` +
      `       handler2,\n` +
      `       ...\n` +
      `     ],\n` +
      `     <handlerName2>: [\n` +
      `       ...\n` +
      `Currently the handlers property is ${handlers}.`;
    throw new Error(message);
  }
};

/// Code Provided from Trufflesuite inc.
// match single or double `*` as long as it isn't preceded by an odd number of
// backslashes. Note: this doesn't handle cases like `***`, as the first two
// stars get matched and the third gets escaped.
const globMatchRegEx = /(?:[^\\]|[^\\](?:\\\\)+)(\*\*|\*)/g;
// list of all characters that should be escaped for use in a regular
// expression
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

const convertHandlerNameToRegex = (name: string) => {
  let match;
  let start = 0;
  let str = "";
  // making a regular expression match the cases where there is a backlash at
  // the start of the string makes it much harder to read, instead, just pad
  // the start:
  name = " " + name;
  // build our final string one match at a time
  while ((match = globMatchRegEx.exec(name)) !== null) {
    const star = match[1];
    const starRegex = star === "*" ? "[^:]+" : "(?:[^:]+(?::[^:]+)*)?";
    const matchLength = match[0].length;
    const end = match.index + matchLength - star.length;
    const unmatched = name.substring(start, end);
    // escape unsafe characters
    const cleanString = unmatched.replace(reRegExpChar, "\\$&");
    start += match.index + matchLength;
    str += cleanString + starRegex;
  }
  str += name.substr(start).replace(reRegExpChar, "\\$&");
  return new RegExp(`^${str.substr(1)}$`, "i");
};

export const createLookupTable = (handlerNames: Array<string>) => {
  return handlerNames.reduce((lookupTable, handlerName) => {
    const regex = convertHandlerNameToRegex(handlerName);
    lookupTable[handlerName] = regex;
    return lookupTable;
  }, {});
};

export const sortHandlers = (handlers) => {
  const globbedHandlers = {};
  const nonGlobbedHandlers = {};
  for (let handlerName in handlers) {
    if (globMatchRegEx.test(handlerName)) {
      globbedHandlers[handlerName] = handlers[handlerName];
    } else {
      nonGlobbedHandlers[handlerName] = handlers[handlerName];
    }
  }
  return { nonGlobbedHandlers, globbedHandlers };
};
