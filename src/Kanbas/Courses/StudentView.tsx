import { FaGlasses } from "react-icons/fa";
import { Link } from "react-router-dom"

function StudentViewButton() {
    return (
        <div className="col">
            <Link className="float-end" to="#">
            <button type="button">
                    <FaGlasses className="me-1"/> Student View
                  </button>
            </Link>
        </div>
    )
}
export default StudentViewButton