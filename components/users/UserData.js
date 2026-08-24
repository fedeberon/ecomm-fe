import { useEffect, useState } from "react";
import Link from "next/link";
import { getByUsername, update } from "services/userService";
import { getPoints } from "services/walletService";

const fields = [
  ["name", "Nombre"], ["lastName", "Apellido"], ["email", "Email"],
  ["phone", "Teléfono"], ["direction", "Dirección"], ["city", "Ciudad"], ["postal", "Código postal"], ["cuit", "CUIT"],
];

const UserData = ({ user }) => {
  const [form, setForm] = useState(user || {});
  const [points, setPoints] = useState(0);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    setForm(user || {});
    getPoints(user?.username).then((value) => active && setPoints(value || 0)).catch(() => active && setPoints(0));
    return () => { active = false; };
  }, [user]);

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await update(form);
      const refreshed = await getByUsername(form.username);
      setForm(refreshed);
      setEditing(false);
      setMessage("Datos actualizados correctamente.");
    } catch (error) {
      setMessage("No se pudieron guardar los cambios.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="w-full max-w-5xl space-y-5">
      <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-palette-sdark to-cyan-600 p-4 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100">Cuenta personal</p><h1 className="mt-1 text-xl font-extrabold sm:text-2xl">Hola, {form.name || form.username}</h1><p className="mt-1 text-xs text-cyan-50">Administrá tus datos y consultá tus beneficios.</p></div>
        <div className="rounded-xl bg-white/15 px-4 py-3 backdrop-blur"><p className="text-[10px] font-bold uppercase tracking-wider text-cyan-100">Puntos disponibles</p><p className="mt-0.5 text-2xl font-extrabold">{points}</p><Link legacyBehavior href={`/users/wallet/${form.username}`}><a className="mt-0.5 block text-[11px] font-bold text-white underline underline-offset-2">Ver movimientos →</a></Link></div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Información personal</p><h2 className="mt-1 text-xl font-extrabold text-slate-800">Datos del usuario</h2></div><button type="button" onClick={() => { setEditing(!editing); setMessage(""); }} className="rounded-xl border border-palette-sdark px-4 py-2 text-sm font-extrabold text-palette-sdark transition hover:bg-cyan-50">{editing ? "Cancelar" : "Editar datos"}</button></div>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map(([name, label]) => <div key={name} className={name === "email" || name === "direction" ? "sm:col-span-2" : ""}><label htmlFor={name} className="text-xs font-extrabold uppercase tracking-wide text-slate-500">{label}</label><input id={name} name={name} value={form?.[name] || ""} onChange={handleChange} disabled={!editing} className={`mt-2 h-11 w-full rounded-xl border px-4 text-sm outline-none transition ${editing ? "border-slate-200 bg-white text-slate-800 focus:border-palette-sdark focus:ring-4 focus:ring-cyan-50" : "border-transparent bg-slate-100 text-slate-600"}`} /></div>)}
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">{message ? <p className={`text-sm font-semibold ${message.includes("correctamente") ? "text-emerald-600" : "text-rose-600"}`}>{message}</p> : <p className="text-xs text-slate-400">El usuario y la contraseña se administran desde Seguridad.</p>}{editing && <button type="submit" disabled={saving} className="rounded-xl bg-palette-sdark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-palette-dark disabled:opacity-50">{saving ? "Guardando..." : "Guardar cambios"}</button>}</div>
      </form>
    </section>
  );
};

export default UserData;
