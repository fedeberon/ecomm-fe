function StoreHeading({ title, eyebrow = 'Administración' }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <header className="rounded-2xl bg-palette-sdark px-5 py-4 text-white shadow-sm sm:flex sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">{eyebrow}</p>
          <h1 className="mt-1 text-xl font-extrabold leading-tight sm:text-2xl">{title}</h1>
        </div>
      </header>
    </div>
  )
}

export default StoreHeading
