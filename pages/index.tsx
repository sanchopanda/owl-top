import { GetStaticProps } from "next";
import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import { Button, Htag, Input, Paragraph, Rating, Tag, Textarea } from "../components/index";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);
  return (
    <>
      <Htag tag="h1">Заголовок</Htag>
      <Button appearence="primary" arrow="right">
        Кнопка
      </Button>
      <Button appearence="ghost" arrow="right" className="hi">
        Кнопка-1
      </Button>
      <Paragraph className="hi">
        Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft skills — навыки, которые позволят эффективно взаимодействовать в
        команде с менеджерами, разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с веб-дизайнерами уровня middle.
      </Paragraph>
      <Tag color="red">средний</Tag>
      <Rating isEditable={true} rating={rating} setRating={setRating}></Rating>
      <Input placeholder="test" />
      <Textarea placeholder="test"/>      
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
