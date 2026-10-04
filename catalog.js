export function selectProducts(products, { query = '', type = 'all', sort = 'recent', history = 'all' } = {}) {
  const term = query.trim().toLocaleLowerCase();
  return products.filter(p => (type === 'all' || p.type === type) && (history === 'all' || p.history === history) && `${p.name} ${p.description} ${p.note}`.toLocaleLowerCase().includes(term)).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'lifespan') return (b.end - b.start) - (a.end - a.start) || a.name.localeCompare(b.name);
    return (sort === 'oldest' ? a.end - b.end : b.end - a.end) || a.name.localeCompare(b.name);
  });
}
