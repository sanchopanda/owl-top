import { GetStaticProps } from 'next';
import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import { Button, Htag, Paragraph, Rating, Tag } from "../components/index";
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';

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
        Студенты освоят не только hard skills, необходимые для работы
        веб-дизайнером, но и soft skills — навыки, которые позволят эффективно
        взаимодействовать в команде с менеджерами, разработчиками и
        маркетологами. Выпускники факультета могут успешно конкурировать с
        веб-дизайнерами уровня middle.
      </Paragraph>
      <Tag color="red">средний</Tag>
      <Rating isEditable={true} rating={rating} setRating={setRating}></Rating>
      <ul>
      {menu.map(m => (<li key={m._id.secondCategory}>{m._id.secondCategory}</li>))}
      </ul>
      
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });
 
  return {
    props: {
      menu, firstCategory
    }
  }
}

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}