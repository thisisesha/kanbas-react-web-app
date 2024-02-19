import { FaCalendarCheck } from "react-icons/fa";
import {moduleCalendar} from "../../../Database";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Calender() {
    const { courseId } = useParams();
    const task = moduleCalendar.filter(x => x.courseId === courseId);
    return (<>
        <div className="d-flex wd-coming">
            <h5>Coming Up</h5>
            <Link to={"#"} className="fa-regular fa-calendar-check calender-color" style={{"color":"red", "marginLeft":"20px"}}>
            <FaCalendarCheck className="me-1" />
                View Calender
            </Link>
            
        </div>
        <hr />
        <ul className="list-group wd-coming-up">
            {task.map((item) => (
                <li>
                    <Link to={"#"}><span className="wd-coming-up-color-red" style={{textDecoration: "none", "color":"red"}}>
                        <FaCalendarCheck className="me-1" />
                        {item.title}</span>
                        <br /><span className="wd-fg-color-gray">{item.description} {item.dateTime}</span>
                    </Link>
                </li>
            ))}
        </ul></>
    );
}

export default Calender