import React from "react";
import styled from "styled-components";
import { Button, Col, Form, Input } from "antd";
import {
  AuthorizationObject,
  FormFiledNames,
  PasswordInputHistoryLogObject,
  PasswordKeyDownInterface,
  PasswordKeyUpInterface,
} from "../types/types";
import { useForm } from "antd/es/form/Form";

interface AuthorizationProps {
  inputLog: PasswordInputHistoryLogObject[];
  setInputValue: (value: string) => void;
  inputValue: string;
  onKeyDown: (value: PasswordKeyDownInterface) => void;
  onKeyUp: (value: PasswordKeyUpInterface) => void;
  authorize: (payload: AuthorizationObject) => void;
}

const Authorization = (props: AuthorizationProps) => {
  const { inputLog, setInputValue, inputValue, onKeyDown, onKeyUp, authorize } =
    props;
  const [form] = useForm();
  return (
    <Form
      form={form}
      onFinish={(values) => {
        const { [FormFiledNames.Email]: email } = values;
        if (email && inputValue) {
          authorize({
            email,
            password: inputValue,
            records: inputLog,
          });
        } else {
          alert("Fill out all fields, please");
        }
      }}
    >
      <FormContentWrapper>
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
          Check user
        </StyledButton>
      </FormContentWrapper>
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

export default Authorization;
