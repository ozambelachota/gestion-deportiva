import { useEffect } from "react";
import { useParams } from "react-router-dom";
export function EditedPartido() {
  const {id} = useParams();
  useEffect(()=>{

  },[id])
  return (
    <div>
      <form></form>
    </div>
  );
}
