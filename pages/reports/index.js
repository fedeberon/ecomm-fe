import React from "react";
import PageTitle from "@/components/PageTitle";
import Calendario from "@/components/calendar/calendar";
import withAuthorization from 'components/withAuthorization';

const Index = () => {

    return (
        <div className="mx-auto max-w-6xl">
            <PageTitle text={`Reportes`} />
            <Calendario/>
        </div>
    )
}

export default withAuthorization(Index);
