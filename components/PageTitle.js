function PageTitle({ text, children }) {
  const hasExtra = Boolean(children)
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className={`mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4 lg:px-8 ${hasExtra ? 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between' : 'text-center'}`}>
        <h1 className="font-primary text-xl font-extrabold leading-tight text-palette-primary sm:text-2xl">
          {text}
        </h1>
        {children}
      </div>
    </header>
  )
}

export default PageTitle
