import React from "react";
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

  const intervalSelection = createIntervalSelection(inputLog);
  const pressTimeSelection = createPressTimeSelection(inputLog);

  const intervalExpectedValue = calculateExpectedValue(intervalSelection);
  const pressTimeExpectedValue = calculateExpectedValue(pressTimeSelection);

  const intervalDispersion = calculateDispersion(
    intervalSelection,
    intervalExpectedValue
  );
  const pressTimeDispersion = calculateDispersion(
    pressTimeSelection,
    pressTimeExpectedValue
  );

  const pressTimeSum = calculatePressTimeSum(inputLog);

  const gallopSuperposition = calculateGallopSuperposition(inputLog);
  const absorptionSuperposition = calculateAbsorptionSuperposition(inputLog);

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
        <Col span={8}/>
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
          <StyledValue>{prettyMilliseconds(absorptionSuperposition, 2)}</StyledValue>{" "}
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
