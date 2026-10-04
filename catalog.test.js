import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { selectProducts } from './catalog.js';
const products = JSON.parse(await readFile(new URL('./graveyard.json', import.meta.url)));
test('catalog contains unique, sourced product lines with valid years', () => {
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  for (const p of products) {
    assert.match(p.id, /^[a-z0-9-]+$/);
    assert.ok(['hardware', 'software', 'service'].includes(p.type));
    assert.ok(Number.isInteger(p.start) && Number.isInteger(p.end) && p.start <= p.end && p.end <= new Date().getFullYear());
    assert.equal(new URL(p.source).protocol, 'https:');
    assert.ok(['apple', 'acquired', 'sherlocked'].includes(p.history));
    if (p.history === 'acquired') assert.ok(Number.isInteger(p.acquired) && p.acquired >= p.start && p.acquired <= p.end);
    for (const reference of p.references || []) { assert.ok(reference.label); assert.equal(new URL(reference.url).protocol, 'https:'); }
    for (const key of ['name', 'description', 'note']) assert.ok(p[key].length > 0);
  }
  assert.equal(products.filter(p => /ipod/i.test(p.name)).length, 1);
  assert.equal(products.filter(p => /airport/i.test(p.name)).length, 1);
  assert.ok(!products.some(p => /^itunes$|iphone|macbook|homepod/i.test(p.name)));
});
test('search, combined filters, empty results, and every sort mode', () => {
  assert.deepEqual(selectProducts(products, {query:'  IPOD  '}).map(p => p.id), ['ipod']);
  assert.equal(selectProducts(products, {query:'ipod',type:'software'}).length, 0);
  assert.equal(selectProducts(products, {query:'does-not-exist'}).length, 0);
  assert.ok(selectProducts(products, {type:'hardware'}).every(p => p.type === 'hardware'));
  assert.equal(selectProducts(products)[0].id, 'apple-pay-later');
  assert.equal(selectProducts(products, {sort:'oldest'})[0].id, 'apple-ii');
  assert.equal(selectProducts(products, {sort:'name'})[0].id, 'airport');
  assert.equal(selectProducts(products, {sort:'lifespan'})[0].id, 'macos-server');
  assert.equal(products[0].id, 'ipod');
});

test('story filters compose with category and search without conflating ownership', () => {
  const acquired = selectProducts(products, { history: 'acquired' });
  assert.equal(acquired.length, 8);
  assert.ok(acquired.some(p => p.id === 'texture'));
  assert.deepEqual(selectProducts(products, { history: 'acquired', type: 'hardware' }).map(p => p.id), ['beddit']);
  assert.deepEqual(selectProducts(products, { history: 'acquired', query: 'weatherkit' }).map(p => p.id), ['dark-sky']);
  assert.deepEqual(selectProducts(products, { history: 'sherlocked' }).map(p => p.id), ['watson']);
  assert.equal(selectProducts(products, { history: 'sherlocked', type: 'service' }).length, 0);
  assert.equal(products.find(p => p.id === 'watson').acquired, undefined);
  assert.equal(selectProducts(products, { history: 'apple' }).length + acquired.length + 1, products.length);
});
