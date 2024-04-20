import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import TimeAgo from "javascript-time-ago";
import {Box} from "@chakra-ui/react";
import {Item} from "../../../types/types.ts";

export function SortableItem({ id, listElem, timeAgo }: { id: string, listElem: Item, timeAgo: TimeAgo }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box background={"white"} padding={"5px"} border={"1px"} borderColor={"gray.300"} borderRadius={"10px"} ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3>
        <a
          target="_blank"
          href={listElem.node.url}>
          {listElem.node.title}
        </a>
      </h3>
      <h3>Association: {listElem.node.authorAssociation}</h3>
      <p>
        #{listElem.node.number}
        <a
          target="_blank"
          href={listElem.node.author.url}>
          {" " + listElem.node.author.login}
        </a> opened this issue {timeAgo.format(new Date(listElem.node.createdAt))}
      </p>
    </Box>
  );
}