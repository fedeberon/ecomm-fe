import Link from "next/link";

const Index = ({session}) => {

    return (
        <>
            {
                session?.user?.role?.includes("ADMIN")
                    ?
                    <Link legacyBehavior href="/admin">
                        <a className=" text-smw block mt-4 lg:inline-block lg:mt-0 mr-4">
                            <h1 >
                                  <span className="text-xl font-primary font-bold tracking-tight pt-1">
                                   Administracion
                                  </span>
                            </h1>
                        </a>
                    </Link>
                    :
                    <></>
            }
        </>
    )
}

export default Index