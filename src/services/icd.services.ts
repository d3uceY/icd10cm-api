import fs from "fs";
import path from "path";
import config from "../config/env";

type ICDEntry = {
  code: string;
  description: string;
};

let icdList: ICDEntry[] = [];
let icdMap: Record<string, ICDEntry> = {};

export function loadICD() {
  const filePath = path.join(__dirname, `../../${config.icdTextName}`);

  const raw = fs.readFileSync(filePath, "utf-8");

  icdList = raw.split("\n").map(line => {
    const [code, ...descParts] = line.trim().split(/\s+/);
    const description = descParts.join(" ");

    return { code, description };
  });

  // Build hashmap for O(1) lookup (data structure optimization, typeshit)
  icdMap = Object.fromEntries(
    icdList.map(entry => [entry.code, entry])
  );
}