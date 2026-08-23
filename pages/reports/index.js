import React from "react";
import StoreHeading from "@/components/StoreHeading";
import Calendario from "@/components/calendar/calendar";
import withAuthorization from 'components/withAuthorization';

const Index = () => {

    return (
        <div className="mx-auto max-w-6xl">
            <StoreHeading title="Reportes" />
            <Calendario/>
        </div>
    )
}

export default withAuthorization(Index);
