import PasswordControls from "../components/password-controls";
import { connect } from "react-redux";
import { inputClear, keyUp, keyDown, valueChanged } from "../actions/password-controls-actions";

const mapStateToProps = (state: any) => {
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
