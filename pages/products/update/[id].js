import { useState } from "react";
import { useRouter } from "next/router";
import { getProduct, update } from "../../../services/productService";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import * as brandsService from "services/brandService";
import * as categoriesService from "services/categoriesService";
import * as sizesService from "services/sizeService";
import withAuthorization from "components/withAuthorization";

const inputClass = "mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-palette-sdark focus:ring-4 focus:ring-cyan-100";
const labelClass = "text-xs font-extrabold uppercase tracking-wide text-slate-600";

function FieldError({ message }) {
  return message ? <p className="mt-1 text-xs font-semibold text-rose-500">{message}</p> : null;
}

const Update = ({ product, brands, categories, sizes }) => {
  const router = useRouter();
  const [data, setData] = useState({
    name: product.name || "",
    price: product.price || 0,
    description: product.description || "",
    category: { id: product.category?.id || "" },
    brand: { id: product.brand?.id || "" },
    sizes: product.sizes || [],
    code: product.code || "",
    stock: product.stock || 0,
    points: product.points || 0,
    promo: Boolean(product.promo),
  });
  const [errors, setErrors] = useState({});

  const validationsForm = (form) => {
    const nextErrors = {};
    if (!String(form.name).trim()) nextErrors.name = "Ingresá el nombre del producto.";
    if (Number(form.price) <= 0) nextErrors.price = "Ingresá un precio válido.";
    if (!String(form.description).trim()) nextErrors.description = "Ingresá una descripción.";
    if (!form.category.id) nextErrors.category = "Seleccioná una categoría.";
    if (!form.brand.id) nextErrors.brand = "Seleccioná una marca.";
    if (!form.sizes.length) nextErrors.sizes = "Agregá al menos un talle.";
    if (!String(form.code).trim()) nextErrors.code = "Ingresá el código del producto.";
    if (Number(form.stock) < 0) nextErrors.stock = "El stock no puede ser negativo.";
    if (Number(form.points) < 0) nextErrors.points = "Los puntos no pueden ser negativos.";
    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "category" || name === "brand") {
      setData((current) => ({ ...current, [name]: { id: value } }));
      return;
    }
    setData((current) => ({ ...current, [name]: value }));
  };

  const handleChangeSize = (event) => {
    const value = Number(event.target.value);
    if (!value || data.sizes.some((size) => Number(size.id) === value)) return;
    const selectedSize = sizes.find((size) => Number(size.id) === value);
    if (selectedSize) {
      setData((current) => ({ ...current, sizes: [...current.sizes, selectedSize] }));
      setErrors((current) => ({ ...current, sizes: undefined }));
    }
    event.target.value = "";
  };

  const deleteSize = (id) => {
    setData((current) => ({
      ...current,
      sizes: current.sizes.filter((size) => Number(size.id) !== Number(id)),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validationsForm(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      NotificationManager.info("Revisá los campos marcados antes de guardar.", "Administración de productos", 2500);
      return;
    }

    try {
      await update(product.id, {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        points: Number(data.points),
        category: { id: Number(data.category.id) },
        brand: { id: Number(data.brand.id) },
      });
      NotificationManager.success(`El artículo “${data.name}” se actualizó correctamente.`, "Administración de productos", 2000);
      setTimeout(() => router.push("/products"), 500);
    } catch (error) {
      NotificationManager.error("No fue posible actualizar el artículo.", "Administración de productos", 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <NotificationContainer />
      <form onSubmit={handleSubmit} className="mx-auto max-w-6xl">
        <div className="mb-4 flex min-h-0 flex-col gap-2 rounded-xl bg-palette-sdark px-4 py-2.5 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">Administración de productos</p>
            <h1 className="mt-0.5 text-lg font-extrabold leading-tight sm:text-xl">Editar producto</h1>
            <p className="text-[11px] text-white/80">ID #{product.id}</p>
          </div>
          <button type="button" onClick={() => router.push(`/products/${product.id}`)} className="rounded-md border border-white/30 px-3 py-1 text-xs font-bold transition hover:bg-white/10">
            Ver producto
          </button>
        </div>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-800">Información principal</h2>
            <p className="mt-1 text-sm text-slate-500">Actualizá los datos que ven tus clientes.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label className="lg:col-span-2">
              <span className={labelClass}>Nombre</span>
              <input className={inputClass} name="name" value={data.name} onChange={handleChange} placeholder="Ej. Chupetes Chicco" />
              <FieldError message={errors.name} />
            </label>
            <label className="lg:col-span-2">
              <span className={labelClass}>Descripción</span>
              <textarea className={`${inputClass} resize-y`} name="description" rows="4" value={data.description} onChange={handleChange} placeholder="Describí el producto" />
              <FieldError message={errors.description} />
            </label>
            <label>
              <span className={labelClass}>Código</span>
              <input className={inputClass} name="code" value={data.code} onChange={handleChange} placeholder="Código interno" />
              <FieldError message={errors.code} />
            </label>
            <label>
              <span className={labelClass}>Precio</span>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                <input className={`${inputClass} pl-8`} type="number" min="0" step="0.01" name="price" value={data.price} onChange={handleChange} />
              </div>
              <FieldError message={errors.price} />
            </label>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-slate-800">Clasificación y disponibilidad</h2>
            <p className="mt-1 text-sm text-slate-500">Organizá el producto y configurá sus existencias.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <label>
              <span className={labelClass}>Categoría</span>
              <select className={inputClass} name="category" value={data.category.id} onChange={handleChange}>
                <option value="">Seleccionar categoría</option>
                {categories?.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              <FieldError message={errors.category} />
            </label>
            <label>
              <span className={labelClass}>Marca</span>
              <select className={inputClass} name="brand" value={data.brand.id} onChange={handleChange}>
                <option value="">Seleccionar marca</option>
                {brands?.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
              </select>
              <FieldError message={errors.brand} />
            </label>
            <label>
              <span className={labelClass}>Stock</span>
              <input className={inputClass} type="number" min="0" name="stock" value={data.stock} onChange={handleChange} />
              <FieldError message={errors.stock} />
            </label>
            <label>
              <span className={labelClass}>Puntos</span>
              <input className={inputClass} type="number" min="0" name="points" value={data.points} onChange={handleChange} />
              <FieldError message={errors.points} />
            </label>
          </div>

          <div className="mt-6">
            <label className={labelClass} htmlFor="size">Talles</label>
            <select id="size" className={inputClass} defaultValue="" onChange={handleChangeSize}>
              <option value="">Agregar un talle</option>
              {sizes?.map((size) => <option key={size.id} value={size.id}>{size.name}</option>)}
            </select>
            <div className="mt-3 flex min-h-12 flex-wrap gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-3">
              {data.sizes.map((size) => (
                <span key={size.id} className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1.5 text-sm font-bold text-palette-sdark">
                  {size.name}
                  <button type="button" onClick={() => deleteSize(size.id)} className="text-palette-sdark/60 hover:text-rose-500" aria-label={`Quitar talle ${size.name}`}>×</button>
                </span>
              ))}
              {!data.sizes.length && <span className="text-sm text-slate-400">Todavía no agregaste talles.</span>}
            </div>
            <FieldError message={errors.sizes} />
          </div>
        </section>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => router.push("/products")} className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50">
            Cancelar
          </button>
          <button type="submit" className="rounded-xl bg-palette-sdark px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-palette-dark focus:outline-none focus:ring-4 focus:ring-cyan-100">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const product = await getProduct(params.id);
  const brands = await brandsService.findAll();
  const categories = await categoriesService.findAll();
  const sizes = await sizesService.findAll();

  return { props: { product, brands, categories, sizes } };
}

export default withAuthorization(Update);
