import {useSelector} from "react-redux";
import {RootState} from "../../store/store.tsx";
import {useEffect, useState} from "react";
import {Octokit} from "octokit";
import {Box, Link} from "@chakra-ui/react";

export default function LinksToRepo() {
  const links = useSelector((state: RootState) => state.linksToRepo.value);
  const [stars, setStars] = useState("");


  useEffect(() => {
    const octokit = new Octokit({
      auth: "", //add your key here
    });

    if (links.owner && links.repo) {
      const getResponse = async () => {
        const response = await octokit.request(`GET /repos/${links.owner}/${links.repo}`, {
          owner: links.owner,
          repo: links.repo,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28'
          }
        })
        setStars(String(response.data.stargazers_count));
      }
      getResponse();
    }
  }, [links])

  if (links.owner !== "" && links.repo !== "") {
    return (
      <Box display={"flex"} width={"100%"} justifyItems={"start"} gap={"10px"}>
        <Link
          data-testid={"RepoOwner"}
          target={"_blank"}
          href={`https://github.com/${links.owner}`}
          cursor={"pointer"}>
          {links.owner.charAt(0).toUpperCase() + links.owner.slice(1)}
        </Link>
        <div>{">"}</div>
        <Link
          data-testid={"Repo"}
          target={"_blank"}
          href={`https://github.com/${links.owner}/${links.repo}`}
          style={{cursor: "pointer"}}>
          {links.repo.charAt(0).toUpperCase() + links.repo.slice(1)}
        </Link>
        <p>{`${stars.slice(0, 3)}K stars`}</p>
      </Box>
    )
  }
}