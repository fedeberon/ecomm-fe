const UserSegurity = ({user}) => {

    return (
            <form class="flex-initial shrink w-full max-w-lg p-6">
            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Contraseña
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                <p class="text-gray-600 text-xs italic">*Ingrese su actual contraseña</p>
                </div>
            </div>
            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Nueva Contraseña
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                <p class="text-gray-600 text-xs italic">*Ingrese una nueva contraseña</p>
                </div>
            </div>
            <div class="flex flex-wrap mx-3 mb-6">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Repetir Contraseña
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                <p class="text-gray-600 text-xs italic">*Repita la nueva contraseña</p>
                </div>
            </div>
            </form>        
    )
}
export default UserSegurity;