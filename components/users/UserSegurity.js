import { useState } from "react";
import { update } from "services/userService";

const UserSegurity = ({ user }) => {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (password.length < 6) return setMessage("La contraseña debe tener al menos 6 caracteres.");
    if (password !== confirmation) return setMessage("Las contraseñas no coinciden.");
    setSaving(true);
    try {
      await update({ ...user, password });
      setPassword(""); setConfirmation(""); setMessage("Contraseña actualizada correctamente.");
    } catch (error) {
      setMessage("No se pudo actualizar la contraseña.");
    } finally { setSaving(false); }
  };

  return <form onSubmit={submit} className="max-w-xl space-y-5"><div><label htmlFor="password" className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Nueva contraseña</label><input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-palette-sdark focus:ring-4 focus:ring-cyan-50" placeholder="Mínimo 6 caracteres" /></div><div><label htmlFor="confirmation" className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Repetir contraseña</label><input id="confirmation" type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-palette-sdark focus:ring-4 focus:ring-cyan-50" placeholder="Repetí la contraseña" /></div>{message && <p className={`text-sm font-semibold ${message.includes("correctamente") ? "text-emerald-600" : "text-rose-600"}`}>{message}</p>}<button type="submit" disabled={saving} className="rounded-xl bg-palette-sdark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-palette-dark disabled:opacity-50">{saving ? "Guardando..." : "Actualizar contraseña"}</button></form>;
};

export default UserSegurity;
