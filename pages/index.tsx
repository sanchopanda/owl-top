import React from "react";
import { Button, Htag, Paragraph, Tag } from "./components/index";


export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Текст</Htag>
      <Button appearence='primary' arrow='right'>Кнопка</Button>
      <Button appearence='ghost' arrow='right' className="hi">Кнопка-1</Button>
      <Paragraph className="hi">Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft skills — навыки, которые позволят эффективно взаимодействовать в команде с менеджерами, разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с веб-дизайнерами уровня middle.</Paragraph>
      <Tag color="red">средний</Tag>
    </div>
  );
}
