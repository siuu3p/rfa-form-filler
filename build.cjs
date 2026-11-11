// Inlines pdf-lib, the blank template and the field map into one offline HTML file.
// usage: node build.cjs <src dir> <data dir> [output file, default <data dir>/rfa_filler.html]
const fs = require("fs"), path = require("path");
const [S, P, OUT = path.join(P, "rfa_filler.html")] = process.argv.slice(2);
const csv = fs.readFileSync(path.join(P, "rfa_field_map.csv"), "utf8").trim().split(/\r?\n/).slice(1);
const map = csv.map(r => [...r.matchAll(/"((?:[^"]|"")*)"|([^,]+)/g)].map(m => (m[1] ?? m[2]).replace(/""/g, '"')));
if (map.length !== 70 || map.some(r => r.length !== 3)) throw new Error("bad field map");
const html = fs.readFileSync(path.join(S, "src.html"), "utf8")
  // pdf-lib's MIT notice must ship with every copy; /*! survives re-minification.
  .replace("/*PDFLIB*/", () => "/*! pdf-lib v1.17.1 | https://github.com/Hopding/pdf-lib\n" +
    fs.readFileSync(path.join(S, "lib/LICENSE-pdf-lib.txt"), "utf8").trim() + "\n*/\n" +
    fs.readFileSync(path.join(S, "lib/pdf-lib.min.js"), "utf8").replace(/<\/script/gi, "<\\/script"))
  .replace("/*TEMPLATE*/", () => fs.readFileSync(path.join(P, "rfa_template.pdf")).toString("base64"))
  .replace("/*MAP*/", () => JSON.stringify(map));
fs.writeFileSync(OUT, html);
console.log("wrote " + OUT, html.length, "bytes,", map.length, "fields");
