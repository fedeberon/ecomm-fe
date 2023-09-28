import {findAll} from "../../services/sizeService";
import SizeList from "@/components/sizes/SizeList";
import PageTitle from "@/components/PageTitle";
import React from "react";
import withAuthorization from 'components/withAuthorization';

const Size = ({sizes}) => {
  return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text="Talles"/>
            <SizeList sizes={sizes}/>
        </div>
  );
};

export async function getServerSideProps() {
    const sizes = await findAll();
    return {
        props: {
            sizes  
        }
    };
}

export default withAuthorization(Size);

