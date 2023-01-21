

//Cache service
const cacheService = require("./cacheService");

test('getrawmempool should NOT be cached', () => { 

    const method = "getrawmempool";
    const shouldCache = cacheService.shouldCache(method)
    expect(shouldCache).toBe(false);
  });