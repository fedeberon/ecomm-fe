import {findAll} from "../../services/sizeService";
import SizeList from "@/components/sizes/SizeList";
import StoreHeading from "@/components/StoreHeading";
import React from "react";
import withAuthorization from 'components/withAuthorization';

const Size = ({sizes}) => {
  return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Talles" />
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
