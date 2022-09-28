// import List from "@/components/reports/List";
import React from "react";

//importar servicio del back..

import PageTitle from "@/components/PageTitle";

const Index = ({data}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Reportes`} />
            {/* <List checkout={data}/> */}
        </div>
    )
}

// export async function getServerSideProps() {
//     const data = await findAll();

//     return {
//         props: {
//             data
//         },
//     }
// }

export default Index
