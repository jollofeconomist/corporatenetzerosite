export function getSearchFilter(searchQuery) {
  if (!searchQuery || searchQuery.trim() === "") return {};
  const filter = {};
  const parts = searchQuery.split(" ");
  parts.forEach((part) => {
    const [key, ...rest] = part.split(":");
    if (!key || rest.length === 0) return;
    if (!key || rest.length === 0) return;

    const value = rest.join(":");

    if (key === "scope") {
      {
        if (value.includes(",")) {
          const scopesArray = value.split(",").map((v) => v.trim());
          filter.scope = { $in: scopesArray };
        } else {
          filter.scope = value;
        }
      }
    } else if (key === "sector") {
    }
  });
  return filter;
}
