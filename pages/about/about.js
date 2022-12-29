import About from "@/components/about/About"
import PageTitle from "@/components/PageTitle"

function AboutPage() {
  return (
      <>
          <div className='bg-white'>
            <PageTitle text="Sobre nosotros"/>

            <About/>
          </div>
     </>
  )
}

export default AboutPage