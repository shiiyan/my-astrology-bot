import {expect, should} from "chai";
should();

describe("Typescipt usage suite", () => {
  it("should be able to execute a test in expect style", () => {
    const foo = "bar";
    const beverages = {tea: ["chai", "matcha", "oolong"]};

    expect(foo).to.be.a("string");
    expect(foo).to.equal("bar");
    expect(foo).to.have.lengthOf(3);
    expect(beverages).to.have.property("tea").with.lengthOf(3);
  });

  it("should be able to execute a test in should style", () => {
    const foo = "bar";
    const beverages = {tea: ["chai", "matcha", "oolong"]};

    foo.should.be.a("string");
    foo.should.equal("bar");
    foo.should.have.lengthOf(3);
    beverages.should.have.property("tea").with.lengthOf(3);
  });
});
