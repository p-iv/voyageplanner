import { useParams } from "react-router-dom";
import styles from "./Attraction.module.css";
import { useEffect } from "react";
import { usePlace } from "../context/PlaceContext";

function Attraction() {
  const { attractionId } = useParams();

  const { getPlace } = usePlace();
  useEffect(
    function () {
      getPlace(attractionId);
    },
    [attractionId]
  );

  return <div>attraction</div>;
}

export default Attraction;
