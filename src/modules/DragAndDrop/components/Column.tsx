import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import Droppable from "./Droppable.tsx";
import {SortableItem} from "./SortableItem.tsx";
import {Box, Heading} from "@chakra-ui/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {Item} from "../../../types/types.ts";

type Props = {
  items: Array<Item>,
  heading: string,
  id: string,
  key: string,
}

export default function Column ({ items, heading, id, key }: Props) {
  TimeAgo.addLocale(en)
  const timeAgo = new TimeAgo("en-US");

  return (
    <Box data-testid={heading} display={"flex"} flexDirection={"column"} minWidth={"30%"} width={"30%"} gap={"10px"}>
      <Heading as={"h2"}>{heading}</Heading>
      <div data-testid={`${heading} sortable`}>
        <SortableContext
          id={"test"}
          items={items.map((item) => item.node.id)}
          strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <Droppable id={item.node.id} key={item.node.id} data-testid={"Droppable"}>
              <SortableItem id={item.node.id} listElem={item} timeAgo={timeAgo}/>
            </Droppable>
          ))}
          <Droppable id={id} key={key}>
            <div></div>
          </Droppable>
        </SortableContext>
      </div>
    </Box>
  )
}