import { NotificationContainer } from "react-notifications";
import useForm from "../../hooks/useForm";
import { useMemo, useState } from "react";

const inputClass = "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-palette-sdark focus:ring-4 focus:ring-cyan-50";
const labelClass = "text-xs font-extrabold uppercase tracking-wide text-slate-600";

const NewProduct = ({ categories = [], brands = [], sizes = [] }) => {
  const [sizeToCheck, setSizeToCheck] = useState([]);
  const initialForm = useMemo(() => ({
    name: "", price: "", description: "", category: { id: "" }, brand: { id: "" },
    sizes: [], code: "", stock: "", points: "", promo: false,
  }), []);

  const validationsForm = (form) => {
    const errors = {};
    if (!form.name.trim()) errors.name = "El nombre es requerido";
    if (!form.price || Number(form.price) < 0) errors.price = "Ingresá un precio válido";
    if (!form.description.trim()) errors.description = "La descripción es requerida";
    if (!form.category.id) errors.category = "Seleccioná una categoría";
    if (!form.brand.id) errors.brand = "Seleccioná una marca";
    if (!form.sizes.length) errors.sizes = "Seleccioná al menos un talle";
    if (!form.code.trim()) errors.code = "El código es requerido";
    if (form.stock === "" || Number(form.stock) < 0) errors.stock = "Ingresá un stock válido";
    if (form.points === "" || Number(form.points) < 0) errors.points = "Ingresá los puntos del producto";
    return errors;
  };

  const { form, errors, handleChange, handleBlur, handleSubmit } = useForm(initialForm, validationsForm);

  const handleChangeSize = (event) => {
    const value = event.target.value;
    const nextSizes = event.target.checked
      ? [...sizeToCheck, { id: value }]
      : sizeToCheck.filter((size) => String(size.id) !== String(value));
    setSizeToCheck(nextSizes);
    form.sizes = nextSizes;
  };

  const error = (name) => errors[name] && <p className="mt-1 text-xs font-semibold text-rose-600">{errors[name]}</p>;

  return (
    <>
      <NotificationContainer />
      <main className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-palette-sdark">Catálogo</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-800 sm:text-2xl">Información del producto</h2>
            </div>
            <p className="text-xs text-slate-400">Completá los datos para publicarlo.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <label className={labelClass} htmlFor="name">Nombre</label>
              <input id="name" name="name" type="text" autoComplete="off" placeholder="Ej. Pañal Huggies Supreme" value={form.name} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
              {error("name")}
            </div>

            <div className="lg:col-span-2">
              <label className={labelClass} htmlFor="description">Descripción</label>
              <textarea id="description" name="description" rows="4" placeholder="Describí las características del producto" value={form.description} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} h-auto resize-y py-3`} />
              {error("description")}
            </div>

            <div>
              <label className={labelClass} htmlFor="code">Código</label>
              <input id="code" name="code" type="text" autoComplete="off" placeholder="Código interno" value={form.code} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
              {error("code")}
            </div>

            <div>
              <label className={labelClass} htmlFor="category">Categoría</label>
              <select id="category" name="category" value={form.category.id} onChange={handleChange} onBlur={handleBlur} className={inputClass}>
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              {error("category")}
            </div>

            <div>
              <label className={labelClass} htmlFor="brand">Marca</label>
              <select id="brand" name="brand" value={form.brand.id} onChange={handleChange} onBlur={handleBlur} className={inputClass}>
                <option value="">Seleccionar marca</option>
                {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
              </select>
              {error("brand")}
            </div>

            <div>
              <label className={labelClass}>Talles disponibles</label>
              <div className="mt-2 grid min-h-11 grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
                {sizes.map((size) => (
                  <label key={size.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 transition hover:bg-white">
                    <input type="checkbox" value={size.id} checked={sizeToCheck.some((selected) => String(selected.id) === String(size.id))} onChange={handleChangeSize} onBlur={handleBlur} className="h-4 w-4 rounded border-slate-300 text-palette-sdark focus:ring-palette-sdark" />
                    {size.name}
                  </label>
                ))}
              </div>
              {error("sizes")}
            </div>

            <div>
              <label className={labelClass} htmlFor="price">Precio</label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">$</span>
                <input id="price" name="price" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={handleChange} onBlur={handleBlur} className={`${inputClass} pl-8`} />
              </div>
              {error("price")}
            </div>

            <div>
              <label className={labelClass} htmlFor="stock">Stock inicial</label>
              <input id="stock" name="stock" type="number" min="0" step="1" placeholder="0" value={form.stock} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
              {error("stock")}
            </div>

            <div>
              <label className={labelClass} htmlFor="points">Puntos del producto</label>
              <input id="points" name="points" type="number" min="0" step="1" placeholder="0" value={form.points} onChange={handleChange} onBlur={handleBlur} className={inputClass} />
              {error("points")}
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button type="submit" className="rounded-xl bg-palette-sdark px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-palette-dark focus:outline-none focus:ring-4 focus:ring-cyan-100">Guardar producto</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default NewProduct;
