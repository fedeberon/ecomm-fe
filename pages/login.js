import { getCsrfToken } from "next-auth/client";
import login from "/images/login.png";

const Login = ({csrfToken}) => {

     return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto"
                         src={login.src} alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-palette-secondary">
                            Registrese
                        </h2>
                        <p className="mt-2 text-center text-sm text-palette-slighter">
                            &oacute;
                            &nbsp;
                            <a href="/users/create" className="font-medium text-palette-secondary hover:text-palette-sdark">
                               Crearse una cuenta
                            </a>
                        </p>
                </div>
                <form className="mt-8 space-y-6" action="/api/auth/callback/credentials" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Usuario</label>
                                <input name="username"
                                       required
                                       type="type"
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-t-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                                       placeholder="Usuario"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input name="password"
                                       type="password"
                                       autoComplete="current-password"
                                       required
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-b-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                                       placeholder="Contrase&ntilde;a"/>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <a href="#" className="font-medium duration-500 text-palette-primary hover:text-palette-dark">
                                    ¿ Olvidaste la contrase&ntilde;a ?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border duration-500 border-transparent text-sm font-medium rounded-md text-white bg-palette-primary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                      <span className="absolute left-0 inset-y-0 flex items-center pl-3 ">
                                          <svg className="h-5 w-5  text-palette-dark group-hover:text-palette-primary duration-500" xmlns="http://www.w3.org/2000/svg"
                                               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd"
                                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                clipRule="evenodd"/>
                                        </svg>
                                      </span>
                                Entrar
                            </button>
                        </div>
                </form>
            </div>
        </div>
    )

}

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}


export default Login