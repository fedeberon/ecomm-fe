import { useState } from "react";
import UserData from "@/components/users/UserData";
import UserSegurity from "@/components/users/UserSegurity";
import BillsOfUser from "@/components/users/BillsOfUser";
import { getByUsername } from "services/userService";
import { findAllByUsername } from "services/billingService";
import userAuthorization from "@/components/userAuthorization";
import Link from "next/link";

const tabs = [
  { id: "profile", label: "Perfil", icon: "◎" },
  { id: "activity", label: "Compras", icon: "▤" },
  { id: "security", label: "Seguridad", icon: "▣" },
];

const Username = ({ userSession, billsOfUSer }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">
          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-28">
            <p className="px-3 pb-3 pt-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">Cuenta</p>
            <nav className="space-y-1">
              {tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${activeTab === tab.id ? "bg-cyan-50 text-palette-sdark" : "text-slate-600 hover:bg-slate-50"}`}><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-base">{tab.icon}</span>{tab.label}</button>)}
              <Link legacyBehavior href={`/users/wallet/${userSession.username}`}><a className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-50 text-base text-pink-500">★</span>Mis puntos</a></Link>
            </nav>
            <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">Tus puntos y movimientos se consultan desde la billetera.</div>
          </aside>
          <section className="min-w-0">
            {activeTab === "profile" && <UserData user={userSession} />}
            {activeTab === "activity" && <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"><div className="mb-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Historial</p><h2 className="mt-1 text-2xl font-extrabold text-slate-800">Tus compras</h2></div><BillsOfUser bills={billsOfUSer} /></div>}
            {activeTab === "security" && <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="mb-5"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Protección de cuenta</p><h2 className="mt-1 text-2xl font-extrabold text-slate-800">Seguridad</h2></div><UserSegurity user={userSession} /></div>}
          </section>
        </div>
      </div>
    </main>
  );
};

export default userAuthorization(Username);

export async function getServerSideProps({ query }) {
  const userSession = await getByUsername(query.username);
  const billsOfUSer = await findAllByUsername(query.username);
  return { props: { userSession, billsOfUSer } };
}
