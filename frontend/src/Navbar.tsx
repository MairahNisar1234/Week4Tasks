
function Navbar() {
  return (
    <nav className="w-full py-6">
      <div className="max-w-md mx-auto px-8 flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">Todo</h1>
        
        {/* Navigation Links */}
        <div className="flex gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Stats</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;