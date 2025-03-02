import { useQuery } from "@tanstack/react-query";
import { getDetailsVoted } from "../../../restApi/user/vote";
import { useParams } from "react-router-dom";

export const QuestionDetails = () => {
  const { id } = useParams() as { id: string };

  const detailsVoted = useQuery({
    queryKey: ["getDetailsVoted"],
    queryFn: () => getDetailsVoted(id),
  });
  console.log(detailsVoted.data);

  return <div>index</div>;
};
