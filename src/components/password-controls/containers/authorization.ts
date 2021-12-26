import { connect } from "react-redux";
import {
  keyUp,
  keyDown,
  valueChanged,
} from "../actions/password-controls-actions";
import { StateType } from "../../../redux/state-type";
import Authorization from "../components/authorization";
import { authorize } from "../actions/vector-calculating";

const mapStateToProps = (state: StateType) => {
  const { inputLog, inputValue } = state.passwordControls;
  return {
    inputLog,
    inputValue,
  };
};

const mapDispatchToProps = {
  setInputValue: valueChanged,
  onKeyDown: keyDown,
  onKeyUp: keyUp,
  authorize: authorize(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
