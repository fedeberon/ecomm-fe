import {findAll} from "../../services/brandService";
import BrandList from "@/components/brands/BrandList";
import PageTitle from "@/components/PageTitle";
import React from "react";

const Brand = ({brands}) => {
  return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="MARCAS" />
            <BrandList brands={brands}/>
        </div>
  );
};

export async function getServerSideProps() {
    const brands = await findAll();
    return {
        props: {
            brands
        }
    };
}

export default Brand;

