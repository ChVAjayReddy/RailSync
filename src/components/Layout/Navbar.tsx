const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
            <img src="create_a_logo_for_automatic_train_signalling_syste_019da519-541a-792a-92b5-7374633f9d06.svg"></img>
          </div>

          <h1 className="text-xl font-semibold text-gray-900">RailSync</h1>
        </div>
        <div className="text-sm text-gray-600">Railway Management System</div>
      </div>
    </nav>
  );
};

export default Navbar;
