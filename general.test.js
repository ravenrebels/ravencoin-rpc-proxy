const { isWhitelisted } = require("./whitelist");

test('Stop not whitelisted', () => {
    const result = isWhitelisted("stop");
    expect(result).toBe(false);
});


test('dumpprivkey not whitelisted', () => {
    const result = isWhitelisted("dumpprivkey");
    expect(result).toBe(false);
});

test("getblockcount not whitelisted", () => {
    const result = isWhitelisted("dumpprivkey");
    expect(result).toBe(false);
});