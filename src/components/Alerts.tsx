type ModalProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

const Alerts = ({ isOpen, message, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 py-6 backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 h-full w-full cursor-default border-none bg-transparent p-0"
        onClick={onClose}
        aria-label="Close alerts"
      />
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-2xl ring-1 ring-white/20"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100/80">
              System alerts
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">
              Active message
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-slate-900/70 p-2 text-slate-100 transition hover:bg-slate-900"
            aria-label="Close alert modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-5 text-slate-100 shadow-inner shadow-slate-950/20">
          {message.split(/\r?\n/).map((line, index) => (
            <p key={index} className="text-base leading-7 text-slate-100/90">
              {line}
            </p>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
