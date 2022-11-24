import React from "react";
import PageTitle from "@/components/PageTitle";
import Calendario from "@/components/calendar/calendar";
import { findAll } from "services/reportService";

const Index = ({report}) => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Reportes`} />
            <Calendario/>
        </div>
    )
}

// export async function getServerSideProps() {
//     const reports = await findAll();

//     return {
//         props: {
//             reports
//         },
//     }
// }

export default Index
