import { findAll } from "services/categoriesService";
import CategoriesList from "@/components/categories/CategoriesList";
import StoreHeading from "@/components/StoreHeading";
import withAuthorization from 'components/withAuthorization';
import React from "react";

const Category = ({categories}) => {
  return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Categorías" />
            <CategoriesList categories={categories}/>
        </div>
  );
};

export async function getServerSideProps() {
    const categories = await findAll();
    return {
        props: {
            categories  
        }
    };
}

export default withAuthorization(Category);
