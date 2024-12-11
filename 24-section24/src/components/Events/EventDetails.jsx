import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../Header.jsx";
import { fetchEvent } from "../../util/http.js";
import Modal from "./../UI/Modal.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { deleteEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";
import { useState } from "react";
export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigat = useNavigate();
  const params = useParams();
  const id = params.id;
  console.log(id);
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["events", id],
    queryFn: ({ signal }) => fetchEvent({ id, signal }),
  });
  const { mutate, isPending: deletPending } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigat("/events");
    },
  });
  function deletStart() {
    setIsDeleting(true);
  }
  function deletStop() {
    setIsDeleting(false);
  }

  function handelDelet(id) {
    mutate({ id });
  }
  let forrmatedDate;
  if (data) {
    forrmatedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }
  let content;
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetchinf event data...</p>
      </div>
    );
  }
  if (isError) {
    <ErrorBlock
      title="cant fetch this event data"
      message={error.info?.message || "there is no data"}
    />;
  }
  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            {deletPending && <p>deleting...</p>}
            {!deletPending && (
              <>
                <button onClick={deletStart}>Delete</button>
                <Link to="edit">Edit</Link>
              </>
            )}
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {forrmatedDate} @ {data.time}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleting && (
        <Modal>
          <h2>do you want to delet this event?</h2>
          <p>this action cant be undo!!</p>
          <div className="form-actions">
            <button onClick={() => handelDelet(id)} className="button">
              Delete
            </button>
            <button onClick={deletStop} className="button-text">
              Cancel
            </button>
          </div>
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>

      <article id="event-details">{content}</article>
    </>
  );
}
