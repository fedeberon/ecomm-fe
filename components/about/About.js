import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClock,
  faEnvelope,
  faHeart,
  faImage,
  faLock,
  faMapMarkerAlt,
  faPhone,
  faShieldAlt,
  faTruck,
} from '@fortawesome/free-solid-svg-icons'

const benefits = [
  {
    icon: faShieldAlt,
    title: 'Productos de calidad',
    text: 'Trabajamos con las mejores marcas para cuidar lo más importante: tu bebé.',
    color: 'text-palette-secondary',
  },
  {
    icon: faHeart,
    title: 'Acompañamiento real',
    text: 'Te asesoramos en cada elección con calidez y cercanía.',
    color: 'text-palette-slight',
  },
  {
    icon: faTruck,
    title: 'Envíos a todo el país',
    text: 'Recibí tus productos donde estés, de forma rápida y segura.',
    color: 'text-palette-secondary',
  },
  {
    icon: faLock,
    title: 'Compras 100% seguras',
    text: 'Protegemos tus datos para que compres con tranquilidad.',
    color: 'text-palette-slight',
  },
]

const About = () => {
  return (
    <div className="bg-white text-palette-primary">
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 33%, rgba(255,255,255,0.45) 61%, rgba(255,255,255,0.08) 100%), url('/images/about-hero-background.png')",
        }}
      >
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="max-w-xl">
            <p className="text-lg leading-7 text-slate-600 sm:text-xl">
              Somos <span className="font-extrabold text-palette-secondary">Dulce Bebé</span>, tu tienda de confianza especializada en productos para bebés y pañales. Trabajamos cada día para acompañar a las familias en cada etapa, ofreciendo productos de calidad, asesoramiento personalizado y la mejor experiencia de compra.
            </p>
          </div>

        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 sm:grid-cols-4 sm:gap-0 sm:px-6 lg:px-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`px-4 text-center sm:px-5 ${index > 0 ? 'sm:border-l sm:border-slate-200' : ''}`}
            >
              <FontAwesomeIcon icon={benefit.icon} className={`h-12 w-12 ${benefit.color}`} />
              <h3 className={`mt-3 text-sm font-extrabold ${benefit.color}`}>{benefit.title}</h3>
              <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-600">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fff7fa] py-6 sm:py-8">
        <div className="mx-auto grid max-w-7xl items-stretch gap-6 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.1fr_0.8fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-palette-primary">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="h-6 w-6 flex-shrink-0 text-palette-secondary" />
              Nuestra tienda
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Contamos con un local físico en <strong>San Carlos de Bolívar</strong> donde podés ver y elegir tus productos.
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p className="flex gap-3"><FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 h-4 w-4 flex-shrink-0 text-palette-slight" /><span><strong>Av. Alsina N° 471, B6550</strong><br />San Carlos de Bolívar, Buenos Aires</span></p>
              <p className="flex items-center gap-3"><FontAwesomeIcon icon={faPhone} className="h-4 w-4 flex-shrink-0 text-palette-secondary" /><a className="font-bold hover:underline" href="tel:+54231415411750">02314 15-41-1750</a></p>
              <p className="flex items-center gap-3"><FontAwesomeIcon icon={faClock} className="h-4 w-4 flex-shrink-0 text-palette-slight" /><span>Lunes a sábado 8:30 a 13:00 hs y 16:30 a 20:30 hs</span></p>
              <p className="flex items-center gap-3"><FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 flex-shrink-0 text-palette-secondary" /><a className="font-bold hover:underline" href="mailto:info@dulcebebe.com.ar">info@dulcebebe.com.ar</a></p>
            </div>
          </div>

          <img src="/images/localExterior.jpg" alt="Frente del local Dulce Bebé" className="h-[320px] w-full rounded-2xl object-cover shadow-sm lg:h-full" />

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="relative min-h-[150px] overflow-hidden rounded-2xl bg-white shadow-sm">
              <img src="/images/tienda-bebe-mobiliario-cochecitos.jpg" alt="Interior del local Dulce Bebé" className="h-full w-full object-cover" />
              <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-bold shadow"><FontAwesomeIcon icon={faImage} /> Ver fotos del local</span>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=Av.+Alsina+471%2C+San+Carlos+de+Bol%C3%ADvar%2C+Buenos+Aires" target="_blank" rel="noreferrer" className="flex min-h-[150px] items-end justify-center rounded-2xl bg-[url('/images/inicio4.jpg')] bg-cover bg-center p-4 text-sm font-bold text-white shadow-sm">
              <span className="rounded-full bg-white px-4 py-2 text-palette-primary">Ver en el mapa</span>
            </a>
          </div>
        </div>

        <div className="mx-4 mt-6 flex max-w-7xl items-center gap-4 rounded-2xl bg-white px-6 py-4 text-center shadow-sm sm:mx-6 sm:text-left lg:mx-auto lg:px-8">
          <FontAwesomeIcon icon={faHeart} className="h-8 w-8 flex-shrink-0 text-palette-secondary" />
          <p className="text-sm text-slate-600"><strong className="text-base text-palette-primary">Estamos para vos y para tu bebé.</strong> Gracias por elegirnos para ser parte de cada momento especial.</p>
        </div>
      </section>
    </div>
  )
}

export default About
