import { useParams } from "react-router-dom";
import styles from "./Destination.module.css";
import { useDestination } from "../context/DestinationContext";
import { useEffect } from "react";

function Destination() {
  const { id } = useParams();
  const { getDestination, currentDestination, isLoading, getLocation } =
    useDestination();

  useEffect(
    function () {
      getDestination(id);
      getLocation(id);
    },
    [id]
  );

  return <div>destination</div>;
}

export default Destination;
