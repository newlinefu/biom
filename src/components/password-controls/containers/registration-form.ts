import { connect } from "react-redux";
import RegistrationForm from "../components/registration-form";
import { StateType } from "../../../redux/state-type";
import { vectorCalculate } from "../actions/vector-calculating";
import {
  valueChanged,
  keyDown,
  keyUp,
} from "../actions/password-controls-actions";

const mapStateToProps = (state: StateType) => {
  const { vectorCalculatingResult, inputLog, inputValue } =
    state.passwordControls;
  return {
    vectorCalculatingResult,
    inputLog,
    inputValue,
  };
};

const MapDispatchToProps = {
  calculateVector: vectorCalculate(),
  setInputValue: valueChanged,
  onKeyDown: keyDown,
  onKeyUp: keyUp,
};

export default connect(mapStateToProps, MapDispatchToProps)(RegistrationForm);
