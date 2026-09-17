import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const load = (directory) =>
  readdirSync(directory)
    .filter((name) => name.endsWith(".json"))
    .map((name) => JSON.parse(readFileSync(join(directory, name), "utf8")));

const entries = [...load("src/content/projects"), ...load("src/content/lab")];

test("project hierarchy matches the approved brief", () => {
  assert.deepEqual(entries.map(({ code }) => code).sort(), [
    "L001",
    "P001",
    "P002",
    "P003",
    "P004",
    "P005",
    "P006",
    "P007",
    "P008",
    "P009",
  ]);
  assert.deepEqual(
    entries
      .filter(({ level }) => level === "featured")
      .map(({ code }) => code)
      .sort(),
    ["P001", "P002", "P003", "P007"],
  );
  assert.deepEqual(
    entries
      .filter(({ level }) => level === "project")
      .map(({ code }) => code)
      .sort(),
    ["P004", "P005", "P006", "P009"],
  );
  assert.deepEqual(
    entries
      .filter(({ level }) => level === "lab")
      .map(({ code }) => code)
      .sort(),
    ["L001", "P008"],
  );
  assert.deepEqual(
    entries.toSorted((a, b) => a.order - b.order).map(({ code }) => code),
    [
      "P001",
      "P002",
      "P003",
      "P007",
      "P006",
      "P004",
      "P005",
      "P009",
      "P008",
      "L001",
    ],
  );
});

test("Spanish and English contain equivalent project fields", () => {
  const fields = [
    "title",
    "strapline",
    "context",
    "problem",
    "system",
    "contribution",
    "impact",
    "confidentiality",
  ];
  for (const entry of entries) {
    for (const lang of ["es", "en"]) {
      for (const field of fields)
        assert.ok(
          entry.copy[lang][field].trim(),
          `${entry.code}.${lang}.${field}`,
        );
      assert.equal(
        entry.architecture.es.length,
        entry.architecture.en.length,
        `${entry.code} architecture parity`,
      );
    }
  }

  for (const entry of entries.filter(({ level }) => level === "featured")) {
    for (const lang of ["es", "en"]) {
      assert.ok(
        entry.copy[lang].subtitle?.trim(),
        `${entry.code}.${lang}.subtitle`,
      );
      assert.ok(
        entry.copy[lang].technical?.trim(),
        `${entry.code}.${lang}.technical`,
      );
    }
  }
});

test("approved metrics and collaboration wording are preserved", () => {
  const byCode = Object.fromEntries(
    entries.map((entry) => [entry.code, entry]),
  );
  assert.match(byCode.P001.copy.es.impact, /siete/);
  assert.match(byCode.P003.copy.es.impact, /9,3 %/);
  assert.match(byCode.P007.copy.es.impact, /diez jornadas/);
  assert.match(byCode.P006.copy.es.contribution, /empresa externa/);
  assert.match(
    byCode.P009.copy.es.confidentiality,
    /no se afirma certificación/,
  );
});

test("public captures use complete dimensions and product-centred captions", () => {
  const byCode = Object.fromEntries(
    entries.map((entry) => [entry.code, entry]),
  );
  assert.deepEqual(
    [byCode.P001.media.width, byCode.P001.media.height],
    [2485, 1333],
  );
  assert.deepEqual(
    [byCode.P002.media.width, byCode.P002.media.height],
    [1920, 1021],
  );
  assert.doesNotMatch(
    `${byCode.P001.media.caption.es} ${byCode.P002.media.caption.es}`,
    /sanead|pixel|recort|confiden/i,
  );
});
