import React from "react";
import {
  FormFiledNames,
  PasswordInputHistoryLogObject,
  PasswordKeyDownInterface,
  PasswordKeyUpInterface,
  RegistrationObject,
  VectorCalculatingResultData,
} from "../types/types";
import { Button, Col, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import VectorCalculationInfo from "./vector-calculation-info";
import styled from "styled-components";
import VectorChart from "./vector-chart";

interface RegistrationFormProps {
  inputLog: PasswordInputHistoryLogObject[];
  vectorCalculatingResult: VectorCalculatingResultData | null;
  calculateVector: (inputLog: RegistrationObject) => void;
  setInputValue: (value: string) => void;
  inputValue: string;
  onKeyDown: (value: PasswordKeyDownInterface) => void;
  onKeyUp: (value: PasswordKeyUpInterface) => void;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const {
    inputLog,
    calculateVector,
    vectorCalculatingResult,
    setInputValue,
    inputValue,
    onKeyDown,
    onKeyUp,
  } = props;
  const [form] = useForm();
  return (
    <Form
      form={form}
      onFinish={(values) => {
        const { [FormFiledNames.Name]: name, [FormFiledNames.Email]: email } =
          values;

        if (name && email && inputValue) {
          calculateVector({
            name,
            email,
            records: inputLog,
            password: inputValue,
          });
        } else {
          alert("Fill out all fields, please");
        }
      }}
    >
      <FormContentWrapper>
        <Form.Item name={FormFiledNames.Name}>
          <Input />
        </Form.Item>
        <Form.Item name={FormFiledNames.Email}>
          <Input />
        </Form.Item>
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) =>
            onKeyDown({ key: e.key, code: e.code, keyDownTime: Date.now() })
          }
          onKeyUp={(e) =>
            onKeyUp({ key: e.key, code: e.code, keyUpTime: Date.now() })
          }
        />
        <StyledButton htmlType="submit" type="primary">
          Register
        </StyledButton>
      </FormContentWrapper>
      {vectorCalculatingResult && (
        <>
          <VectorCalculationInfo
            vectorCalculatingResult={vectorCalculatingResult}
          />
          <VectorChart
            inputLog={inputLog}
            amplitude={vectorCalculatingResult.information.amplitude}
          />
        </>
      )}
    </Form>
  );
};

const FormContentWrapper = styled(Col)`
  max-width: 600px;
  margin: 0 auto 40px auto;
  padding-left: 30px;
  padding-right: 180px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

export default RegistrationForm;
