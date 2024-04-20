import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.tsx";
import {setDragAndDropValue} from "../../modules/DragAndDrop/dragAndDropListSlice.ts";
import {setLinksToRepoValue} from "../LinksToRepo/linksToRepoSlice.ts";
import {gql, useLazyQuery} from "@apollo/client";
import {Box, Button} from "@chakra-ui/react"

export default function FindButton () {
  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state.input.value).replace("https://github.com/", "");

  const getItems = gql`
    query GetItems($owner: String!, $name: String!) { 
      repository(owner: $owner, name: $name) { 
        issues(last:30) {
           edges {
             node {
                id 
                title
                url
                number
                state
                assignees {
                  totalCount
                }
                authorAssociation
                createdAt
                author {
                  url
                  login
                }
              body
            }
          }
        }
      }
    }
  `;

  const [getData] = useLazyQuery(getItems);

  const getResponse = async () => {
    if (localStorage.getItem(`https://github.com/${input}`)) {
      dispatch(setDragAndDropValue(JSON.parse(localStorage.getItem(`https://github.com/${input}`) || "{}")));
    } else {
      getData({ variables: {
          owner: `${input.slice(0, input.indexOf("/"))}`,
          name:  `${input.slice(input.indexOf("/") + 1)}`,
        } }).then((response) => {
          localStorage.setItem(`https://github.com/${input}`, JSON.stringify(response.data.repository.issues.edges));
          dispatch(setDragAndDropValue(
            response.data.repository.issues.edges
          ))
        });
    }

    dispatch(setLinksToRepoValue({
      owner: `${input.slice(0, input.indexOf("/"))}`,
      repo:  `${input.slice(input.indexOf("/") + 1)}`,
    }));
  }

  return (
    <Button data-testid={"FindButton"} cursor={"pointer"} onClick={() => getResponse()}>
      <Box padding={"5px"}>Load issues</Box>
    </Button>
  )
}