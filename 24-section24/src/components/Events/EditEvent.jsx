import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();
  const id = useParams().id;
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["events", id] });
      const prevData = queryClient.getQueriesData(["events", id]);
      queryClient.setQueriesData(["events,id"], data.event);
      return { prevData };
    },
    onError: (error, data, context) => {
      queryClient.setQueriesData(["events", id], context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", id]);
    },
  });
  function handleSubmit(formData) {
    mutate({ id, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }
  let content;
  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />;
      </div>
    );
  }
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="cant fetch Data"
          message={
            error.info?.message ||
            "there is an error in fetching data from server"
          }
        />
        <div className="form-action">
          <Link to="/events" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }
  if (data && !isPending) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }
  return <Modal onClose={handleClose}>{content}</Modal>;
}
