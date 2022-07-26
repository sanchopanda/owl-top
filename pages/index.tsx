import React, {useEffect, useState} from "react";
import { Button, Htag, Paragraph, Rating, Tag } from "./components/index";


export default function Home(): JSX.Element {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log(counter)
    return function cleanup() {
      console.log('sdfsd')
    }
   })

  return (
    <div>
      <Htag tag='h1'>{counter}</Htag>
      <Button appearence='primary' arrow='right' onClick={() => setCounter(x => x + 1)}>Кнопка</Button>
      <Button appearence='ghost' arrow='right' className="hi">Кнопка-1</Button>
      <Paragraph className="hi">Студенты освоят не только hard skills, необходимые для работы веб-дизайнером, но и soft skills — навыки, которые позволят эффективно взаимодействовать в команде с менеджерами, разработчиками и маркетологами. Выпускники факультета могут успешно конкурировать с веб-дизайнерами уровня middle.</Paragraph>
      <Tag color="red">средний</Tag>
      <Rating rating={3}></Rating>
    </div>
  );
}
