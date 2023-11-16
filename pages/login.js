import { useSession,getSession, getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import login from "/images/login.png";

const Login = ({ csrfToken, session }) => {
  const router = useRouter()

  if (session) {
  router.push('/stores/list'); // Redirigir al dashboard si está autenticado
  return null; // O puedes renderizar un componente de carga aquí
  }
  const [credentials,setCredentials]= useState({username:"",password:"",csrfToken: csrfToken,remember:true})

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(credentials);
    signIn('credentials',{
      username: credentials.username,
      password: credentials.password,
      csrfToken: csrfToken,
      remember:true,
    })
  }

  const handleGoogleSignIn = () => {
    signIn('google'); // 'google' es el ID del proveedor de Google configurado en NextAuth.js
  };
  const handleFacebookSignIn = () => {
    signIn('facebook'); // 'facebook' es el ID del proveedor de Facebook configurado en NextAuth.js
  };
  


  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto"
            src={login.src} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-palette-secondary">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-palette-slighter">
            &oacute;
            &nbsp;
            <a href="/users/create" className="font-medium text-palette-secondary hover:text-palette-sdark">
              Registrese
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Usuario</label>
              <input name="username"
                value={credentials.username}
                onChange={({target})=>setCredentials({...credentials,username: target.value})}
                required
                type="type"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-t-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                placeholder="Usuario" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input name="password"
                value={credentials.password}
                onChange={({target})=>setCredentials({...credentials,password: target.value})}
                type="password"
                autoComplete="current-password"
                required
                className="mt-5 appearance-none rounded-none relative block w-full px-3 py-2 border border-palette-slight placeholder-palette-slight text-palette-sdark rounded-b-md focus:outline-none focus:ring-palette-secondary focus:border-palette-sdark focus:z-10 sm:text-sm"
                placeholder="Contrase&ntilde;a" />
            </div>
          </div>

          <div>
            <button type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-palette-primary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-palette-dark group-hover:text-palette-primary" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd" />
                </svg>
              </span>
              Entrar
            </button>
          </div>
          <div>
            <button type="button" onClick={handleGoogleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-palette-secondary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="25" height="23" >
                  <path d="M9.78353 7.74971C10.1976 7.73814 10.5239 7.39311 10.5123 6.97906C10.5007 6.565 10.1557 6.23873 9.74164 6.25029L9.78353 7.74971ZM5.50158 11.5L6.25132 11.52C6.25167 11.5067 6.25167 11.4933 6.25132 11.48L5.50158 11.5ZM9.76258 16L9.74164 16.7497C9.7556 16.7501 9.76957 16.7501 9.78353 16.7497L9.76258 16ZM14.0236 11.5L14.7733 11.48C14.7625 11.0737 14.43 10.75 14.0236 10.75V11.5ZM9.76258 10.75C9.34837 10.75 9.01258 11.0858 9.01258 11.5C9.01258 11.9142 9.34837 12.25 9.76258 12.25V10.75ZM19.3276 9.679C19.7418 9.679 20.0776 9.34321 20.0776 8.929C20.0776 8.51479 19.7418 8.179 19.3276 8.179V9.679ZM17.5016 8.179C17.0874 8.179 16.7516 8.51479 16.7516 8.929C16.7516 9.34321 17.0874 9.679 17.5016 9.679V8.179ZM17.5016 9.679C17.9158 9.679 18.2516 9.34321 18.2516 8.929C18.2516 8.51479 17.9158 8.179 17.5016 8.179V9.679ZM15.6756 8.179C15.2614 8.179 14.9256 8.51479 14.9256 8.929C14.9256 9.34321 15.2614 9.679 15.6756 9.679V8.179ZM16.7516 8.929C16.7516 9.34321 17.0874 9.679 17.5016 9.679C17.9158 9.679 18.2516 9.34321 18.2516 8.929H16.7516ZM18.2516 7C18.2516 6.58579 17.9158 6.25 17.5016 6.25C17.0874 6.25 16.7516 6.58579 16.7516 7H18.2516ZM18.2516 8.929C18.2516 8.51479 17.9158 8.179 17.5016 8.179C17.0874 8.179 16.7516 8.51479 16.7516 8.929H18.2516ZM16.7516 10.857C16.7516 11.2712 17.0874 11.607 17.5016 11.607C17.9158 11.607 18.2516 11.2712 18.2516 10.857H16.7516ZM9.74164 6.25029C6.90939 6.32941 4.67644 8.68761 4.75185 11.52L6.25132 11.48C6.19794 9.47505 7.77861 7.80571 9.78353 7.74971L9.74164 6.25029ZM4.75185 11.48C4.67644 14.3124 6.90939 16.6706 9.74164 16.7497L9.78353 15.2503C7.77861 15.1943 6.19794 13.5249 6.25132 11.52L4.75185 11.48ZM9.78353 16.7497C12.6158 16.6706 14.8487 14.3124 14.7733 11.48L13.2738 11.52C13.3272 13.5249 11.7466 15.1943 9.74164 15.2503L9.78353 16.7497ZM14.0236 10.75H9.76258V12.25H14.0236V10.75ZM19.3276 8.179H17.5016V9.679H19.3276V8.179ZM17.5016 8.179H15.6756V9.679H17.5016V8.179ZM18.2516 8.929V7H16.7516V8.929H18.2516ZM16.7516 8.929V10.857H18.2516V8.929H16.7516Z" fill="#f5f5f5"></path>
                </svg>
              </span>
              Iniciar sesión con Google
            </button>
          </div>
          <div>
            <button type="button" onClick={handleFacebookSignIn} style={{ backgroundColor: '#1877f2', }} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-palette-secondary hover:bg-palette-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
                  <path d="M20.924 0H3.075C1.376 0 0 1.375 0 3.075v17.849C0 22.625 1.375 24 3.075 24h8.807v-9.294H9.19V10.797h2.692V8.196c0-2.673 1.635-4.137 4.025-4.137 1.15 0 2.263.203 2.263.203v2.5h-1.276c-1.257 0-1.65.78-1.65 1.612v1.94h2.807l-.45 2.909h-2.357V24h4.607C22.625 24 24 22.625 24 20.924V3.075C24 1.375 22.625 0 20.924 0"></path>
                </svg>
              </span>
              Iniciar sesión con Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (session) {
    return {
      redirect: {
        destination: "/stores/list", // Redirigir al dashboard si está autenticado
        permanent: false,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Login;