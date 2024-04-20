import {useSelector} from "react-redux";
import {RootState} from "../../store/store.tsx";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import {useEffect, useState} from "react";
import {
  closestCenter,
  DndContext, DragEndEvent, DragOverlay,
  KeyboardSensor,
  PointerSensor, UniqueIdentifier,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {SortableItem} from "./components/SortableItem.tsx";
import {Box} from "@chakra-ui/react";
import Column from "./components/Column.tsx";
import {Item} from "../../types/types.ts";

export default function DragAndDrop() {
  const list = useSelector((state: RootState) => state.dragAndDropList.value);
  const input = useSelector((state: RootState) => state.input.value)

  const [items, setItems] = useState<Array<Item>>(JSON.parse(JSON.stringify([...list])));

  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo("en-US");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier>();

  useEffect(() => {
    setItems(JSON.parse(JSON.stringify([...list])));
  }, [list])

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    setActiveId(active.id);
    if (active.id !== over!.id && items) {
      setItems((items: Array<Item>) => {
        const oldIndex = items.indexOf(items.find(item => item.node.id === active.id) as Item);
        const newIndex = items.indexOf(items.find(item => item.node.id === over!.id) as Item);

        if (newIndex !== -1) {
          if (items[newIndex].node.assignees.totalCount !== 0) {
            items[oldIndex].node.assignees.totalCount = items[newIndex].node.assignees.totalCount;
            items[oldIndex].node.state = items[newIndex].node.state;
          } else {
            items[oldIndex].node.assignees.totalCount = 0;
            items[oldIndex].node.state = items[newIndex].node.state;
          }
        } else {
          if (over!.id === "open") {
            items[oldIndex].node.assignees.totalCount = 0;
            items[oldIndex].node.state = "OPEN";
          } else if (over!.id === "inProgress") {
            items[oldIndex].node.assignees.totalCount = 1;
            items[oldIndex].node.state = "OPEN"
          } else {
            items[oldIndex].node.state = "CLOSED";
          }
        }

        localStorage.removeItem(input);
        localStorage.setItem(input, JSON.stringify(items));

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  return (
    <Box width={"100%"} marginTop={"30px"}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          const { active } = event;
          setActiveId(active.id);
        }}
        onDragEnd={handleDragEnd}
      >
        <Box display={"flex"} gap={"10px"}>
          <Column
            items={items.filter(item => item.node.assignees.totalCount === 0 && item.node.state !== "CLOSED")}
            heading={"Todo Tasks"}
            id={"open"}
            key={"open"}
          />
          <Column
            items={items.filter(item => item.node.assignees.totalCount !== 0 && item.node.state !== "CLOSED")}
            heading={"In Progress"}
            id={"inProgress"}
            key={"inProgress"}
          />
          <Column
            items={items.filter(item => item.node.state === "CLOSED")}
            heading={"Done"}
            id={"closed"}
            key={"closed"}
          />
        </Box>
        <DragOverlay>
          {activeId &&  (
            <SortableItem id={Number(activeId)} listElem={items.find(item => item.node.id === String(activeId))!} timeAgo={timeAgo} />
          )}
        </DragOverlay>

      </DndContext>
    </Box>
  );
}