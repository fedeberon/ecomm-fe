import {findAll} from "../../services/brandService";
import BrandList from "@/components/brands/BrandList";
import StoreHeading from "@/components/StoreHeading";
import React from "react";
import withAuthorization from 'components/withAuthorization';

const Brand = ({brands}) => {
  return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Marcas" />
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

export default withAuthorization(Brand);
