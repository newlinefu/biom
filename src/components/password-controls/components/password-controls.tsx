import React from "react";
import { Button, Col, Collapse, Input, Progress, Row } from "antd";
import {
  PasswordInputHistoryLogObject,
  PasswordKeyDownInterface,
  PasswordKeyUpInterface,
} from "../types/types";
import styled from "styled-components";
import PassStatCharts from "./pass-stat-charts";
import Statistics from "./statistics";
import VectorCalculatingInformation from "../containers/registration-form";
import Authorization from "../containers/authorization";

const { Panel } = Collapse;

interface PasswordControlsInterface {
  onKeyDown: (value: PasswordKeyDownInterface) => void;
  onKeyUp: (value: PasswordKeyUpInterface) => void;
  inputClear: () => void;
  inputValue: string;
  onValueChanged: (value: string) => void;
  inputLog: PasswordInputHistoryLogObject[];
  passwordComplexity: number;
}

const PasswordControls = (props: PasswordControlsInterface) => {
  const {
    inputValue,
    inputLog,
    inputClear,
    onKeyDown,
    onKeyUp,
    onValueChanged,
    passwordComplexity,
  } = props;
  return (
    <>
      <StyledRow>
        <Col offset={4}>
          <Input
            value={inputValue}
            onChange={(e) => onValueChanged(e.target.value)}
            onKeyDown={(e) =>
              onKeyDown({ key: e.key, code: e.code, keyDownTime: Date.now() })
            }
            onKeyUp={(e) =>
              onKeyUp({ key: e.key, code: e.code, keyUpTime: Date.now() })
            }
          />
        </Col>
        <Col offset={4} span={2}>
          <Button onClick={inputClear}>Clear</Button>
        </Col>
      </StyledRow>
      <StyledRow>
        <StatusCol offset={4}>
          <Progress percent={passwordComplexity} size="small" />
        </StatusCol>
      </StyledRow>
      <Collapse>
        <Panel header={"Dynamic"} key={1}>
          <PassStatCharts inputLog={inputLog} />
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header={"Statistics"} key={2}>
          <Statistics inputLog={inputLog} />
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header={"Registration and vector information displaying"} key={3}>
          <VectorCalculatingInformation />
        </Panel>
      </Collapse>
      <Collapse>
        <Panel header={"Authorization"} key={4}>
          <Authorization />
        </Panel>
      </Collapse>
    </>
  );
};

export default PasswordControls;

const StyledRow = styled(Row)`
  max-width: 850px;
  padding: 20px;
  margin: 0 auto;
`;

const StatusCol = styled(Col)`
  width: 50%;
`;
