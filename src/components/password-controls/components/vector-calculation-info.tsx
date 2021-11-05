import React from "react";
import { VectorCalculatingResultData } from "../types/types";
import styled from "styled-components";

interface VectorCalculationInfoProps {
  vectorCalculatingResult: VectorCalculatingResultData;
}

interface SingleLineOutputRendererProps {
  vectorLineResult: number;
  index: number;
  N: number;
  functionLineResult: number;
  harResults: number[];
  holdTime: number;
}

interface LineSumCalculationResultProps {
  harResults: number[];
  holdTime: number;
  externalIndex: number;
}

const VectorCalculationInfo = (props: VectorCalculationInfoProps) => {
  const { vectorCalculatingResult } = props;

  return (
    <div>
      {vectorCalculatingResult.vector.map((singleValue, index) => (
        <>
          <SingleLineOutputRenderer
              harResults={
                vectorCalculatingResult.information.holdTimeCalculating[index]
                    .harResult
              }
              vectorLineResult={singleValue}
              functionLineResult={
                vectorCalculatingResult.information.functionsResult[index]
              }
              index={index}
              N={vectorCalculatingResult.information.pressCount}
              holdTime={
                vectorCalculatingResult.information.holdTimeCalculating[index]
                    .holdTime[index]
              }
          />
        </>
      ))}
    </div>
  );
};

const SingleLineOutputRenderer = (props: SingleLineOutputRendererProps) => {
  const {
    functionLineResult,
    vectorLineResult,
    harResults,
    N,
    index,
    holdTime,
  } = props;

  return (
    <LineRendererWrapper>
        <SpanWithSpaces>[{index}]</SpanWithSpaces>
        <RedText>[v <Index>{index}</Index> = {vectorLineResult.toFixed(3)}]</RedText>
        <SpanWithSpaces>=</SpanWithSpaces>
        <BlueText>1&nbsp;/&nbsp;[N = {N}] </BlueText>
        <RedText>(</RedText>
        <GreenText>[f({holdTime}) = {functionLineResult}]</GreenText>
        <GreyText>(</GreyText>
        <LineSumCalculationResult harResults={harResults} holdTime={holdTime} externalIndex={index}/>
        <GreyText>)</GreyText>
        <RedText>)</RedText>
    </LineRendererWrapper>
  );
};

const LineSumCalculationResult = (props: LineSumCalculationResultProps) => {
  const {harResults, holdTime, externalIndex} = props
  return <>
    {
      harResults.map((har, index, array) => <>
        <OrangeText>[h <Index>{index}&nbsp;{externalIndex}</Index>({holdTime}) = {har.toFixed(3)}]</OrangeText>
        <span style={{color: 'brown', fontSize: '22px'}}>{index !== array.length - 1 && '+'}</span>
      </>)
    }
  </>
};

const SpanWithSpaces = styled.span`
  margin: 0 10px;
  font-size: 22px;
`;
const Index = styled.span`
  margin-right: 10px;
  font-size: 11px;
`
const RedText = styled(SpanWithSpaces)`
  color: crimson;
`;
const BlueText = styled(SpanWithSpaces)`
  color: darkmagenta;
`;
const GreenText = styled(SpanWithSpaces)`
  color: darkgreen;
`;

const GreyText = styled(SpanWithSpaces)`
  color: lightslategrey;
`;

const OrangeText = styled(SpanWithSpaces)`
  color: orange;
`;

const LineRendererWrapper = styled.div`
  padding: 20px;
  border-bottom: 2px solid lightslategrey;
`
export default VectorCalculationInfo;
