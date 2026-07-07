const Sidebar = () => {
  const menuItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Simulator", icon: "🚆" },
    { label: "Logs", icon: "📋" },
    { label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
