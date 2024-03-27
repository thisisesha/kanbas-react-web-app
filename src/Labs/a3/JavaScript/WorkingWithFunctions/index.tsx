import WorkingWithArrays from "../arrays/WorkingWithArrays";
import ArrowFunction from "../functions/ArrowFunctions";
import LegacyES5Function from "../functions/ES5Functions";
import FunctionParanthesisAndParameters from "../functions/FunctionParenthesisAndParameters";
import ImpliedReturn from "../functions/ImpliedReturn";

function WorkingWithFunctions() {
    return(
        <div>
           <LegacyES5Function/>
           <ArrowFunction/>
           <ImpliedReturn/>
           <FunctionParanthesisAndParameters/>
           <WorkingWithArrays/>
        </div>
     );
    }

export default WorkingWithFunctions