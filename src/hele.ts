/* eslint-disable capitalized-comments */

import * as a from "react-docgen-typescript";
// import * as rd from "react-docgen";
// import path from "path";
// import fs from "fs";

const b = a.parse("test/samples/typescript/Hele.tsx");

console.log(JSON.stringify(b));

// // eslint-disable-next-line no-sync
// const asd = rd.parse(fs.readFileSync("test/samples/typescript/TSComponentWithChildrenAndProps.tsx"), null, null, {
//     filename: "test/samples/typescript/TSComponentWithChildrenAndProps.tsx",
//     babelrc: false
// });

// console.log(JSON.stringify(asd));