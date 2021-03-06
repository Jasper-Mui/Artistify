import React from "react";
import { shallow } from "enzyme";
import AddToQueueButton from "./AddToQueueButton";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";

describe("<AddToQueueButton />", () => {
  it("renders a form", () => {
    const wrapper = shallow(<AddToQueueButton />);
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(Tooltip)).toHaveLength(1);
  });
});
