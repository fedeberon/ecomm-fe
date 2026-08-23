import logo from "../../images/logoMati.png";

const money = (value) => `$ ${Number(value || 0).toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

const PrecheckPrint = ({ checkout }) => {
  const products = checkout?.products || [];

  return (
    <article className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm print:max-w-none print:rounded-none print:border-0 print:shadow-none">
      <header className="flex flex-col gap-5 border-b border-slate-200 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <img id="img-factura" src={logo.src} alt="Dulce Bebé" className="h-auto w-36 object-contain sm:w-44" />
        <div className="text-left text-sm leading-6 text-slate-500 sm:text-right">
          <p className="font-extrabold text-slate-800">Dulce Bebé</p>
          <p>Av. Alsina 472</p>
          <p>San Carlos de Bolívar, Buenos Aires</p>
          <p>B6550 · 02314 15-41-1750</p>
        </div>
      </header>

      <div className="px-5 py-6 sm:px-8">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-palette-sdark">Detalle del presupuesto</p>
            <h2 className="mt-1 text-xl font-extrabold text-slate-800">Productos seleccionados</h2>
          </div>
          <p className="text-sm text-slate-500">Fecha: <strong className="text-slate-700">{checkout?.date}</strong></p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-bold sm:px-5">Producto</th>
                <th className="hidden px-4 py-3 text-center font-bold sm:table-cell">Cantidad</th>
                <th className="hidden px-4 py-3 text-right font-bold sm:table-cell">Precio unitario</th>
                <th className="px-4 py-3 text-right font-bold sm:px-5">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-sm text-slate-600">
              {products.map((item, index) => (
                <tr key={`${item.product?.id || item.product?.name}-${index}`}>
                  <td className="px-4 py-4 font-semibold text-slate-800 sm:px-5">{item.product?.name}</td>
                  <td className="hidden px-4 py-4 text-center sm:table-cell">{item.quantity}</td>
                  <td className="hidden px-4 py-4 text-right sm:table-cell">{money(item.product?.price)}</td>
                  <td className="px-4 py-4 text-right font-semibold text-slate-800 sm:px-5">{money(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <div className="w-full rounded-2xl bg-palette-slighter px-5 py-4 text-right sm:w-72">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Importe total</p>
            <p className="mt-1 text-2xl font-extrabold text-palette-sdark">{money(checkout?.totalAmount)}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PrecheckPrint;
