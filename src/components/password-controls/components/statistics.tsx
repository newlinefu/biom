import React, { useEffect, useState } from "react";
import { PasswordInputHistoryLogObject } from "../types/types";
import { Col, Row, Typography } from "antd";
import {
  calculateDispersion,
  calculateExpectedValue,
  createIntervalSelection,
  createPressTimeSelection,
  calculatePressTimeSum,
  calculateAbsorptionSuperposition,
  calculateGallopSuperposition,
} from "../utils/statistics";
import styled from "styled-components";
import { prettyMilliseconds } from "../utils/utils";

const { Title } = Typography;

interface StatisticsProps {
  inputLog: PasswordInputHistoryLogObject[];
}

const Statistics = (props: StatisticsProps) => {
  const { inputLog } = props;

  const [intervalExpectedValue, setIntervalExpectedValue] = useState(0);
  const [pressTimeExpectedValue, setPressTimeExpectedValue] = useState(0);
  const [intervalDispersion, setIntervalDispersion] = useState(0);
  const [pressTimeDispersion, setPressTimeDispersion] = useState(0);
  const [pressTimeSum, setPressTimeSum] = useState(0);
  const [gallopSuperposition, setGallopSuperposition] = useState(0);
  const [absorptionSuperposition, setAbsorptionSuperposition] = useState(0);

  const clearStatistics = () => {
    setIntervalExpectedValue(0);
    setPressTimeExpectedValue(0);
    setIntervalDispersion(0);
    setPressTimeDispersion(0);
    setPressTimeSum(0);
    setGallopSuperposition(0);
    setAbsorptionSuperposition(0);
  };

  useEffect(() => {
    if (inputLog.length === 0) {
      clearStatistics();
    } else {
      const intervalSelection = createIntervalSelection(inputLog);
      const pressTimeSelection = createPressTimeSelection(inputLog);

      calculateExpectedValue(intervalSelection).then((expValue: any) =>
        setIntervalExpectedValue(expValue)
      );
      calculateExpectedValue(pressTimeSelection).then((expValue: any) =>
        setPressTimeExpectedValue(expValue)
      );

      calculateDispersion(intervalSelection, intervalExpectedValue).then(
        (disp: any) => setIntervalDispersion(disp)
      );
      calculateDispersion(pressTimeSelection, pressTimeExpectedValue).then(
        (pressTimeDisp: any) => setPressTimeDispersion(pressTimeDisp)
      );

      calculatePressTimeSum(inputLog).then((sum: any) => setPressTimeSum(sum));

      calculateGallopSuperposition(inputLog).then((sup: any) =>
        setGallopSuperposition(sup)
      );
      calculateAbsorptionSuperposition(inputLog).then((sup: any) =>
        setAbsorptionSuperposition(sup)
      );
    }
  }, [inputLog]);

  return (
    <>
      <StyledRow>
        <Col span={8}>
          <StyledTile>Press Time statistics</StyledTile>
        </Col>
      </StyledRow>
      <StyledRow justify={"space-around"}>
        <Col span={8}>
          <StatisticTitle>Expected value:</StatisticTitle>{" "}
          <StyledValue>
            {prettyMilliseconds(pressTimeExpectedValue, 2)}
          </StyledValue>{" "}
          ms
        </Col>
        <Col span={8}>
          <StatisticTitle>Dispersion:</StatisticTitle>{" "}
          <StyledValue>
            {prettyMilliseconds(pressTimeDispersion, 2)}
          </StyledValue>{" "}
          ms
        </Col>
      </StyledRow>
      <StyledRow justify={"space-around"}>
        <Col span={8}>
          <StatisticTitle>Press Time Sum:</StatisticTitle>{" "}
          <StyledValue>{prettyMilliseconds(pressTimeSum, 2)}</StyledValue> ms
        </Col>
        <Col span={8} />
      </StyledRow>
      <StyledRow>
        <Col span={8}>
          <StyledTile>Interval statistics</StyledTile>
        </Col>
      </StyledRow>
      <StyledRow justify={"space-around"}>
        <Col span={8}>
          <StatisticTitle>Expected value:</StatisticTitle>{" "}
          <StyledValue>
            {prettyMilliseconds(intervalExpectedValue, 2)}
          </StyledValue>{" "}
          ms
        </Col>
        <Col span={8}>
          <StatisticTitle>Dispersion:</StatisticTitle>{" "}
          <StyledValue>{prettyMilliseconds(intervalDispersion, 2)}</StyledValue>{" "}
          ms
        </Col>
      </StyledRow>
      <StyledRow>
        <Col span={8}>
          <StyledTile>Superpositions</StyledTile>
        </Col>
      </StyledRow>
      <StyledRow justify={"space-around"}>
        <Col span={8}>
          <StatisticTitle>Gallop:</StatisticTitle>{" "}
          <StyledValue>
            {prettyMilliseconds(gallopSuperposition, 2)}
          </StyledValue>{" "}
          ms
        </Col>
        <Col span={8}>
          <StatisticTitle>Absorption:</StatisticTitle>{" "}
          <StyledValue>
            {prettyMilliseconds(absorptionSuperposition, 2)}
          </StyledValue>{" "}
          ms
        </Col>
      </StyledRow>
    </>
  );
};

export default Statistics;

const StyledTile = styled(Title)`
  color: slategray !important;
`;
const StyledValue = styled.span`
  color: #1890ff;
`;
const StatisticTitle = styled.span`
  font-weight: bold;
  color: slategray;
`;

const StyledRow = styled(Row)`
  max-width: 1200px;
  padding: 20px;
  margin: 0 auto;

  font-size: 18px;
  color: darkgrey;
`;
