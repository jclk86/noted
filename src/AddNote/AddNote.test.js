import React from "react";
import { shallow } from "enzyme";
import { toJson } from "enzyme-to-json";
import AddNote from "./AddNote";
import Context from "../context";

describe("AddNote Component", () => {
  const contextType = {
    addNote: () => {},
    folders: [
      {
        id: "d26e0bce-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Elephants",
        modified: "2018-04-11T23:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Officiis exercitationem minus. Officiis et ex debitis iusto. Possimus est et suscipit a nesciunt laboriosam. Accusamus recusandae vel architecto velit illum labore dolor ipsam nulla.\n \rEveniet numquam non et cumque incidunt veniam et. Quibusdam voluptates neque et autem. Omnis ea sunt delectus.\n \rCorrupti et qui sit enim. Saepe sapiente est eveniet ut debitis et nulla. In doloribus dolores dolor voluptas commodi eligendi qui qui."
      },
      {
        id: "d26e0f48-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Lions",
        modified: "2018-04-26T23:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Sunt veritatis vero impedit. Perferendis quis nostrum. Earum est nesciunt.\n \rIllum nemo architecto pariatur pariatur repellendus sint consequatur quia voluptates. Maxime reiciendis voluptatibus amet. Consectetur voluptas minima sit delectus. Quos suscipit et neque. Nihil pariatur dicta aliquid sunt voluptatem. Ea dolores eos eius ipsa ratione iusto qui deleniti sint.\n \rEt repellat sequi eaque doloribus qui ab quam ipsum impedit. Voluptatem ut soluta odio sit ratione dolore. Vero aut ipsa cumque ratione corrupti ratione aut temporibus debitis."
      },
      {
        id: "d26e1074-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Monkeys",
        modified: "2018-02-05T00:00:00.000Z",
        folderId: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Optio voluptatem dignissimos. Ex qui optio et eum est sunt hic. Soluta saepe voluptas occaecati dolorem quasi.\n \rAb non quas reiciendis voluptates eius error. Accusamus omnis aliquid hic ratione fugiat molestiae voluptatem. Voluptatem sed ipsam. Quae et laboriosam.\n \rPerferendis ad recusandae magnam quo. Iure quis pariatur distinctio vero. Voluptas non aut voluptas quia optio qui aliquam temporibus numquam. Quis odit recusandae et quia."
      },
      {
        id: "d26e11a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Bats",
        modified: "2018-12-01T00:00:00.000Z",
        folderId: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Et vel inventore. Dolores consectetur adipisci eius cum fuga excepturi et voluptatem. Et amet et enim facere facere velit. Voluptatem nemo officiis. Aut eligendi voluptatem voluptas et voluptatem saepe laudantium dolores voluptas. Quis enim quibusdam quis exercitationem necessitatibus sapiente.\n \rRepellendus quibusdam earum autem repellendus quis perferendis id vitae. Dicta laudantium consequuntur et sint id. Sapiente et qui voluptates est. Qui alias ex provident assumenda distinctio nihil.\n \rEarum nihil et eligendi esse quod. Est non ipsum totam aliquid quam sequi voluptate repellendus. Aut animi officiis quo."
      },
      {
        id: "d26e12c2-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Turtles",
        modified: "2018-09-11T23:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Voluptatum velit et culpa omnis voluptas modi aut neque. Aut expedita facere dolores dolores. Qui non voluptatum quia eligendi consequuntur enim. Sit qui sit ex ipsum perspiciatis qui delectus omnis beatae. Quos quia quod sunt.\n \rCorrupti consequatur voluptatem eveniet tenetur cumque eos quia eius est. Deleniti sit repellendus ipsam nihil eveniet. Facere aperiam totam eos praesentium reprehenderit. Est qui quod minus possimus. Facere voluptatum minus tenetur. Quae aut mollitia aut eveniet eius expedita qui.\n \rQuia quam molestiae ut itaque maxime blanditiis. Voluptatum mollitia exercitationem accusamus. Omnis natus mollitia aliquam illum dolorem."
      },
      {
        id: "d26e1452-ffaf-11e8-8eb2-f2801f1b9fd1",
        name: "Zebras",
        modified: "2018-08-13T23:00:00.000Z",
        folderId: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        content:
          "Aspernatur repudiandae sunt recusandae animi. Cumque eveniet praesentium. Perspiciatis pariatur ducimus nostrum maxime. Adipisci vel minima. Nostrum corrupti quae.\n \rEst perspiciatis ipsa. Illum expedita omnis magni atque ea. Voluptas consequatur consequuntur est earum nihil nihil. Ratione ut consequatur quo. Possimus eaque quidem ipsum voluptas.\n \rIllum aperiam iste qui dicta et consequatur. Et in necessitatibus odit vitae at necessitatibus eveniet ducimus facilis. Ad ut eius officiis ut dignissimos dolorum. Velit velit et. Vero incidunt adipisci quis voluptates expedita quo. Tempore eum eius consequatur qui debitis et perferendis."
      }
    ]
  };

  it("renders AddNote form without issues", () => {
    const select = shallow(
      <Context.Provider value={contextType}>
        <AddNote />
      </Context.Provider>
    );
    expect(select).toMatchSnapshot();
  });
});
