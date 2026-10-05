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
        transition-all
        duration-300
        ${
          occupied
            ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
            : "bg-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.5)]"
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
          shadow-md
          transition-all
          duration-300
          ${occupied ? "left-6" : "left-0.5"}
        `}
      />

      <span
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          text-[9px]
          font-bold
          text-white
          select-none
        "
      >
        {occupied ? "STOP" : "GO"}
      </span>
    </button>
  );
};

export default SignalToggle;
