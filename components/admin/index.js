import Link from "next/link";

const Index = ({session}) => {

    return (
        <>
            {
                session?.user?.role?.includes("ADMIN")
                    ?
                    <Link href="/admin">
                        <a className=" cursor-pointer">
                            <h1 className="flex no-underline">
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