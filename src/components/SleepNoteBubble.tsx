import React from "react";

interface SleepNoteBubbleProps {
  note: string;
  onDelete?: () => void;
}

export const SleepNoteBubble: React.FC<SleepNoteBubbleProps> = ({
  note,
  onDelete,
}) => {
  return (
    <div className="relative mb-4 w-[700px] rounded-lg bg-[#131d35] p-4 shadow-xl ">
      <p className="whitespace-pre-wrap break-words">{note.replace(/^"(.*)"$/, "$1")}</p>
      {onDelete && (
        <button
          className="absolute top-1 right-1 text-lg font-bold text-red-500"
          onClick={onDelete}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SleepNoteBubble;
