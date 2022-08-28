import { GetStaticProps } from "next";
import React, { useState } from "react";
import { withLayout } from "../layout/Layout";
import { Button, Htag, Input, Paragraph, Rating, Tag, Textarea } from "../components/index";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";
import { Home } from "../page-components/Home/Home";

function HomePage({ menu }: HomeProps): JSX.Element {
	return <Home />;
}

export default withLayout(HomePage);

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
