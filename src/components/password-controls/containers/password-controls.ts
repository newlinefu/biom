import PasswordControls from "../components/password-controls";
import { connect } from "react-redux";
import { inputClear, keyUp, keyDown, valueChanged } from "../actions/password-controls-actions";
import {StateType} from "../../../redux/state-type";

const mapStateToProps = (state: StateType) => {
  const { inputValue, inputLog, passwordComplexity } = state.passwordControls;
  return {
    inputValue,
    inputLog,
    passwordComplexity,
  };
};

const mapDispatchToProps = {
    onKeyDown: keyDown,
    onKeyUp: keyUp,
    inputClear: inputClear,
    onValueChanged: valueChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordControls);
