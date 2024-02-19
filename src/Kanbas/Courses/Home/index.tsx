import ModuleList from "../Modules/List";
import Status from "./Status";

function Home() {
  return (
    <div className="row">
      <div className="col">
        <div className="flex-fill">
          <ModuleList />
        </div>
      </div>
      <div className="col-auto">
        <Status/>
      </div>
    </div>
  );
}
export default Home;