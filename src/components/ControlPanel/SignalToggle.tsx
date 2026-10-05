import React from "react";

type SignalToggleProps = {
  occupied: boolean;
  onClick: () => void;
};

const SignalToggle = ({ occupied, onClick }: SignalToggleProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        h-6
        w-12
        rounded-full
        border border-white/15
        transition-all
        duration-300
        cursor-pointer
        ${
          occupied
            ? "bg-red-600 shadow-[0_0_8px_rgba(34,197,94,0.12)]"
            : "bg-emerald-600 shadow-[0_0_8px_rgba(34,197,94,0.12)]"
        }
      `}
    >
      <span
        className={`
          absolute
          top-0.5
          h-5
          w-5
          rounded-full
          bg-white
          border border-slate-200/20
          shadow-[0_10px_25px_rgba(15,23,42,0.24)]
          transition-all
          duration-300
          ${occupied ? "left-[20px]" : "left-[2px]"}
        `}
      />
    </button>
  );
};

export default React.memo(SignalToggle);
