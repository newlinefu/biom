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

        calculateVector({
          name,
          email,
          records: inputLog,
          password: inputValue,
        });
      }}
    >
      <Col>
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
      </Col>
      <Button htmlType="submit" type="primary">
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;
