import { useEffect } from "react";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import ProductsService from "@/services/api/Products";

function HomePage() {
  useEffect(() => {
    ProductsService.getAll().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <DefaultLayout>
      <h1>Home</h1>
    </DefaultLayout>
  );
}

export default HomePage;
