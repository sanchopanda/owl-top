import React from "react";
import { Button, Htag } from "./components/index";


export default function Home(): JSX.Element {
  return (
    <div>
      <Htag tag='h1'>Текст</Htag>
      <Button appearence='primary' arrow='right'>Кнопка</Button>
      <Button appearence='ghost' arrow='right'>Кнопка-1</Button>
    </div>
  );
}
