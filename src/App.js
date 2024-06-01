import { useRef } from "react";
import PlayBox from "./PlayBox";
import Header from "./Header";
import "./styles.css";
import Reactions from "./Reactions";
import useGame from "./useGame";

export default function App() {
  const areaRef = useRef(null);
  const { actions, ...values } = useGame({ areaRef });
  return (
    <div className="App">
      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
      <Header {...actions} />
      <PlayBox ref={areaRef} position={values.position} {...values} />
      <Reactions reactions={values.reactions} />
    </div>
  );
}
