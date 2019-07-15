import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import NotesListMain from "./NotesListMain";
import Context from "../context";

describe(`NotesListMain component`, () => {
  it("renders a .NoteListMain by default", () => {
    const wrapper = shallow(<NotesListMain />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders a Note in ul for each notes in array", () => {
    const contextType = {
      notes: [
        {
          id: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Dogs",
          modified: "2019-01-03T00:00:00.000Z",
          folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          content: "Corporis accusamus placeat.\n \rUnde."
        },
        {
          id: "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Cats",
          modified: "2018-08-15T23:00:00.000Z",
          folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          content: "Eos\n \rlaudantium."
        },
        {
          id: "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Pigs",
          modified: "2018-03-01T00:00:00.000Z",
          folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
          content: "Occaecati dignissimos\nvoluptatum nihil."
        },
        {
          id: "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
          name: "Birds",
          modified: "2019-01-04T00:00:00.000Z",
          folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
          content: "Eum culpa odit."
        }
      ]
    };

    const match = {
      params: {
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1"
      }
    };

    const ul = shallow(
      <Context.Provider value={contextType}>
        <NotesListMain match={match} />
      </Context.Provider>
    ).find("ul");
    expect(toJson(ul)).toMatchSnapshot();
  });
});
