import React, { Component } from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import AddFolder from "./AddFolder";

describe("AddFolder Component", () => {
  it("Renders an AddFolder form by default", () => {
    const wrapper = shallow(<AddFolder />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
