import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useGlobalContext } from "../../context/useGlobalContext";
import { SpinnerMini } from "../../ui/Spinner";
import useStopLoading from "../../hooks/useStopLoading";
import GlobalTypes from "../../utils/GlobalType";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;
export const StyledHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

SalesChart.propTypes = GlobalTypes;

function SalesChart({ sales, numDays, isFetching }) {
  const { isDarkMode } = useGlobalContext();
  const loading = useStopLoading(isFetching);
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const dates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = dates.map((date) => {
    const todaySales = sales.filter((sale) =>
      isSameDay(sale.startDate, date.toISOString())
    );
    return {
      label: format(date, "MMM dd"),
      totalSales: todaySales.reduce((acc, curr) => acc + curr.totalPrice, 0),
      extrasSales: todaySales.reduce((acc, curr) => acc + curr.extrasPrice, 0),
    };
  });

  return (
    <StyledSalesChart>
      <StyledHeader>
        <Heading as="h2">
          Sales Chart from{" "}
          <span>
            {format(dates.at(0), "MMM dd yyyy")} &mdash;{" "}
            {format(dates.at(-1), "MMM dd yyyy")}
          </span>
        </Heading>

        {loading && <SpinnerMini type="dashboard" />}
        {!loading && !sales.length && (
          <Heading as="h5">No data available</Heading>
        )}
      </StyledHeader>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Area
            strokeWidth={2}
            name="Total sales"
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fillOpacity={0.8}
            fill={colors.totalSales.fill}
            unit="$"
          />
          <Area
            strokeWidth={2}
            name="Extras sales"
            type="monotone"
            dataKey="extrasSales"
            stroke={colors.extrasSales.stroke}
            fillOpacity={0.8}
            fill={colors.extrasSales.fill}
            unit="$"
          />
          <Tooltip
            itemStyle={{
              fontSize: "1.2rem",
              fontWeight: "600",
              padding: "0",
              margin: "0",
            }}
            contentStyle={{
              backgroundColor: colors.background,
              borderRadius: "8px",
              padding: "0px 8px 2px",
              borderLeft: `6px solid ${colors.extrasSales.fill}`,
            }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Legend align="right" />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
