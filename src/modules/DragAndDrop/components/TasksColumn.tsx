import TimeAgo from "javascript-time-ago";
import {DragEventHandler} from "react";
type Props = {
  id: string,
  list: Array<any>,
  timeAgo: TimeAgo,
  heading: string,
  onDragStart: DragEventHandler<HTMLLIElement>,
  onDrop: DragEventHandler<HTMLLIElement>,
}

export default function TasksColumn ({ id, list, timeAgo, heading, onDragStart, onDrop }: Props) {

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "33%" }}>
      <h2>{heading}</h2>
      <ul id={id}>
        {list.map((listElem, counter) => (
          <li
            id={`${counter}`}
            style={{
              listStyle: "none",
            }}
            draggable={true}
            onDragStart={(event) => onDragStart(event)}
            onDragOver={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onDragEnd={(event) => {
              console.log(event.currentTarget.id);
            }}
            onDrop={(event) => onDrop(event)}
            key={listElem.number}
          >
            <h3>
              <a
                target="_blank"
                href={listElem.url.replace("api.", "").replace("repos/", "")}>
                {listElem.title}
              </a>
            </h3>
            <h3>{listElem.author_association}</h3>
            <p>
              #{listElem.number}
              <a
                target="_blank"
                href={listElem.user.url.replace("api.", "").replace("users/", "")}>
                {" " + listElem.user.login}
              </a> opened this issue {timeAgo.format(new Date(listElem.created_at))}
            </p>
            <p>Comments: {listElem.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}