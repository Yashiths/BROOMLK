export default function ColorPicker({ colors, activeColor, setActiveColor }) {
  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-6 bg-black/20 backdrop-blur-md p-4 rounded-full border border-white/10">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => setActiveColor(color)}
          className={`w-6 h-6 rounded-full transition-all duration-300 relative ${
            activeColor.id === color.id ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900" : "hover:scale-110"
          }`}
          style={{ backgroundColor: color.hex }}
          title={color.bgText}
        >
          {activeColor.id === color.id && (
            <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
          )}
        </button>
      ))}
    </div>
  );
}