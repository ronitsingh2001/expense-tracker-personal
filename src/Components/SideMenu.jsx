const SideMenu = () => {
    return (
        <div  className="bg-white/10 backdrop-blur-lg h-min p-8 w-96 rounded-lg border border-blue-300 shadow-xl shadow-blue-500/50 space-y-6 mt-10">
                <h3 className="font-bold text-white text-xl mb-4">Menu</h3>
                <ul>
                    {/* <li className="mb-2"><a href="#" className="text-white ">Dashboard</a></li> */}
                    <li className="mb-2"><a href="#" className="text-white">Add Expenses</a></li>
                    <li className="mb-2"><a href="#" className="text-white">Reports</a></li>
                    {/* <li class="mb-2"><a href="#" class="text-white">Settings</a></li> */}
                </ul>
        </div>
    )
}

export default SideMenu;