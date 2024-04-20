import {useDroppable} from "@dnd-kit/core";
import {ReactNode} from "react";

export default function Droppable({ id, children }: { id: string, children: ReactNode }) {
  const {setNodeRef} = useDroppable({
    id: id,
  });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
}