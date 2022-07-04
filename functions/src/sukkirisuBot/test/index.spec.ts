import {expect} from "chai";

describe("Typescipt usage suite", () => {
  it("should be able to execute a test", () => {
    const foo = "bar";
    const beverages = {tea: ["chai", "matcha", "oolong"]};

    expect(foo).to.be.a("string");
    expect(foo).to.equal("bar");
    expect(foo).to.have.lengthOf(3);
    expect(beverages).to.have.property("tea").with.lengthOf(3);
  });
});
