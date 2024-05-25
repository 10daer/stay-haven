import styled from "styled-components";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { useCallback, useState } from "react";

import Heading from "../../ui/Heading";
import { useGlobalContext } from "../../context/useGlobalContext";
import { devices } from "../../styles/MediaQueries";
import Spinner from "../../ui/Spinner";
import useStopLoading from "../../hooks/useStopLoading";
import { StyledHeader } from "./SalesChart";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem 2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }

  @media ${devices.sm} {
    grid-column: 1 / -1;
  }

  @media ${devices.md} {
    grid-column: 2 / -1;
  }
`;

const SpinnerContainer = styled.div`
  width: 100%;
  & span {
    margin: 25% auto;
    display: block;
  }
`;

function createData(isDarkmode, secondArg) {
  let startData = [
    {
      duration: "1 night",
      value: 0,
      color: isDarkmode ? "#b91c1c" : "#ef4444",
    },
    {
      duration: "2 nights",
      value: 0,
      color: isDarkmode ? "#c2410c" : "#f97316",
    },
    {
      duration: "3 nights",
      value: 0,
      color: isDarkmode ? "#a16207" : "#eab308",
    },
    {
      duration: "4-5 nights",
      value: 0,
      color: isDarkmode ? "#4d7c0f" : "#84cc16",
    },
    {
      duration: "6-7 nights",
      value: 0,
      color: isDarkmode ? "#15803d" : "#22c55e",
    },
    {
      duration: "8-14 nights",
      value: 0,
      color: isDarkmode ? "#0f766e" : "#14b8a6",
    },
    {
      duration: "15-21 nights",
      value: 0,
      color: isDarkmode ? "#1d4ed8" : "#3b82f6",
    },
    {
      duration: "21+ nights",
      value: 0,
      color: isDarkmode ? "#7e22ce" : "#a855f7",
    },
  ];

  if (secondArg)
    startData = startData.map((el, i) => {
      return {
        duration: el.duration,
        value: i + 1,
        color: "#14b8a6",
      };
    });

  return startData;
}

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function renderActiveArc({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
}) {
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.duration} {`${Math.round(percent * 100)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle + 2}
        endAngle={endAngle - 2}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 4}
        fill={fill}
      />
    </g>
  );
}

function DurationChart({ sales, isFetching }) {
  const { isDarkMode } = useGlobalContext();
  const [activeIndex, setActiveIndex] = useState(null);
  const startData = createData(isDarkMode);
  const loading = useStopLoading(isFetching);
  let data = createData(isDarkMode, true);

  if (sales.length) {
    data = prepareData(startData, sales);
  }

  const handleEnter = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);
  const handleLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <ChartBox>
      <StyledHeader>
        <Heading as="h2">Stays Duration Chart</Heading>

        {!loading && !sales.length && (
          <Heading as="h5">No data available</Heading>
        )}
      </StyledHeader>

      {loading ? (
        <SpinnerContainer>
          <Spinner type="dashboard" />
        </SpinnerContainer>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              activeIndex={activeIndex}
              activeShape={renderActiveArc}
              onMouseEnter={handleEnter}
              onMouseOut={handleLeave}
              dataKey="value"
              nameKey="duration"
              cy={120}
              cx={100}
              startAngle={360}
              endAngle={0}
              outerRadius={100}
              innerRadius={60}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={index} stroke={entry.color} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              align="right"
              layout="vertical"
              verticalAlign="middle"
              width="30%"
              iconSize={10}
              iconType="circle"
              wrapperStyle={{ fontSize: "1.28rem", height: "fit-content" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartBox>
  );
}

export default DurationChart;
