import { useState, useMemo, useEffect } from "react";
import { TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function useWindowWidth() {
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

// --- Simulated Data
const yearlyData: Record<number, Array<{ month: string; weight: number }>> = {
  // 2023 has a full year of data
  2023: [
    { month: "January", weight: 70 },
    { month: "February", weight: 71 },
    { month: "March", weight: 72 },
    { month: "April", weight: 72 },
    { month: "May", weight: 73 },
    { month: "June", weight: 74 },
    { month: "July", weight: 75 },
    { month: "August", weight: 75 },
    { month: "September", weight: 74 },
    { month: "October", weight: 76 },
    { month: "November", weight: 76 },
    { month: "December", weight: 77 },
  ],
  // 2024 only has data up to June (partial year data)
  2024: [
    { month: "January", weight: 70 },
    { month: "February", weight: 72 },
    { month: "March", weight: 73 },
    { month: "April", weight: 72 },
    { month: "May", weight: 74 },
    { month: "June", weight: 75 },
    // No data for July-December 2024
  ],
  // 2025 has partial data
  2025: [
    { month: "January", weight: 80 },
    { month: "February", weight: 81 },
  ]
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Determine available years for logic
const availableYears = Object.keys(yearlyData).map(Number).sort((a, b) => a - b);

// --- Constants for colors
const COLOR_GREEN = "#22c55e"; // Tailwind green-500
const COLOR_AMBER = "#fb923c"; // Tailwind amber-500


export default function WeightChart() {
  const [mode, setMode] = useState<"year" | "month">("year");
  const initialYear = availableYears.length > 0 ? availableYears[availableYears.length - 1] : new Date().getFullYear();
  const [period, setPeriod] = useState({ year: initialYear, monthIndex: 0 }); 
  const width = useWindowWidth();

  const { year, monthIndex } = period;

  // --- Determine if the SELECTED period has data
  const hasSelectedYearData = !!yearlyData[year];
  const hasSelectedMonthData = hasSelectedYearData && yearlyData[year][monthIndex] !== undefined;
  
  // --- Find the single closest data point for fallback when NOTHING is available (e.g., year 2000)
  const chartYear = useMemo(() => {
    if (hasSelectedYearData) return year;
    
    let closestYear = availableYears[0] || year;
    let minDiff = Infinity;

    for (const dataYear of availableYears) {
      const diff = Math.abs(dataYear - year);
      
      if (diff < minDiff) {
        minDiff = diff;
        closestYear = dataYear;
      } else if (diff === minDiff && dataYear > closestYear) {
         closestYear = dataYear;
      }
    }
    return closestYear;
  }, [year, hasSelectedYearData]);

  const chartMonthIndex = useMemo(() => {
    const dataForYear = yearlyData[chartYear];
    if (!dataForYear || dataForYear.length === 0) return 0;
    
    if (dataForYear[monthIndex]) {
      return monthIndex;
    }
    
    return dataForYear.length - 1; 

  }, [chartYear, monthIndex]);

  // --- Determine the single fallback weight value
  const fallbackWeight = useMemo(() => {
    return yearlyData[chartYear]?.[chartMonthIndex]?.weight ?? 70;
  }, [chartYear, chartMonthIndex]);


  // Helper state to track if we are using a full single-value fallback line (reserved for AMBER color)
  const isFullFallback = !hasSelectedYearData || (mode === 'month' && !hasSelectedMonthData);
  
  // Helper state to track if the selected year has partial data (reserved for GREEN color, but padded)
  const isPartialYear = mode === 'year' && hasSelectedYearData && yearlyData[year].length < 12;

  // --- Create the chart data
  const monthlyData = useMemo(() => {
    if (hasSelectedMonthData) {
      const baseWeight = yearlyData[year][monthIndex].weight;
      return Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        weight: +(
          baseWeight +
          Math.sin(i / 5) * 0.5 +
          (Math.random() - 0.5) * 0.2
        ).toFixed(1),
      }));
    }
    
    // If no data for the selected month, show a flat line using the fallback weight
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      weight: fallbackWeight,
    }));
  }, [year, monthIndex, hasSelectedMonthData, fallbackWeight]);

  // This memo generates data using only the 'weight' key, handling both full and partial padding.
  const chartData = useMemo(() => {
    if (mode === "year") {
      // 1. If the year has NO data at all (e.g., 2000), show a full flat line using the fallback weight
      if (!hasSelectedYearData) {
        return months.map(month => ({
          month,
          weight: fallbackWeight,
        }));
      }
      
      // 2. If the year HAS partial data (e.g., 2024 up to June), implement "hold last value"
      const currentYearData = yearlyData[year];
      const dataLength = currentYearData.length;
      
      if (dataLength < 12) {
        const lastRecordedWeight = currentYearData[dataLength - 1].weight;
        const completeYearData = [...currentYearData];
        
        // Pad the remaining months with the last recorded weight
        for (let i = dataLength; i < 12; i++) {
          completeYearData.push({
            month: months[i],
            weight: lastRecordedWeight,
          });
        }
        return completeYearData;
      }
      
      // 3. If the year has full data (12 months), return it directly
      return currentYearData;
    }
    
    // Month Mode: use the monthlyData memo
    return monthlyData;
  }, [mode, year, hasSelectedYearData, fallbackWeight, monthlyData]);


  // --- Navigation Handlers (unchanged)
  const handlePrev = () => {
    setPeriod(({ year, monthIndex }) => {
      if (mode === "year") return { year: year - 1, monthIndex };
      if (monthIndex === 0) return { year: year - 1, monthIndex: 11 };
      return { year, monthIndex: monthIndex - 1 };
    });
  };

  const handleNext = () => {
    setPeriod(({ year, monthIndex }) => {
      if (mode === "year") return { year: year + 1, monthIndex };
      if (monthIndex === 11) return { year: year + 1, monthIndex: 0 };
      return { year, monthIndex: monthIndex + 1 };
    });
  };

  // --- UX Labels
  const displayLabel =
    mode === "year" ? `${year}` : `${months[monthIndex]} ${year}`;
  
  
  let dataHint = "Yearly overview";
  if (mode === 'month') {
      dataHint = isFullFallback 
          ? `No data for ${months[monthIndex]}. Showing ${fallbackWeight}kg from ${months[chartMonthIndex]} ${chartYear}.`
          : `Daily progress in ${months[monthIndex]}`;
  } else if (isPartialYear) {
      const lastMonth = months[yearlyData[year].length - 1];
      dataHint = `Showing trend up to ${lastMonth}. Missing data is held at the last value (${yearlyData[year][yearlyData[year].length - 1].weight}kg).`;
  } else if (isFullFallback) {
      dataHint = `No data available for ${year}. Showing closest year's data held at ${fallbackWeight}kg.`;
  }
  
  const lineStrokeColor = isFullFallback ? COLOR_AMBER : COLOR_GREEN;


  // --- Adjust tick density based on width and mode
  const xAxisInterval = useMemo(() => {
    if (mode === "year") {
      if (width < 400) return 2;
      if (width < 640) return 1;
      return 0;
    } else {
      if (width < 400) return 6;
      if (width < 640) return 4;
      if (width < 768) return 2;
      return 1;
    }
  }, [width, mode]);

  return (
    <Card className="bg-neutral-800/70 border border-neutral-700/60 backdrop-blur-md shadow rounded-2xl transition-all">
      <CardHeader className="flex flex-col sm:flex-row justify-between md:items-center">
        <div>
          <CardTitle className="text-xl text-gray-100 font-semibold">
            Weight Progress
          </CardTitle>
          <CardDescription className="text-neutral-400">
            {dataHint}
          </CardDescription>
        </div>

        <div className="flex flex-row items-center mx-auto sm:mx-0 justify-between gap-2">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="hover:text-green-500 text-neutral-400"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <span className="text-neutral-200 text-sm min-w-[110px] text-center">
              {displayLabel}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="hover:text-green-500 text-neutral-400"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <Toggle
            pressed={mode === "month"}
            onPressedChange={() =>
              setMode((prev) => (prev === "year" ? "month" : "year"))
            }
            className="ml-3 text-sm text-neutral-300 border border-neutral-600 px-3 py-1 rounded-md hover:border-green-600/70"
          >
            {mode === "year" ? "Monthly View" : "Yearly View"}
          </Toggle>
        </div>
      </CardHeader>

      <CardContent className="pt-2 pl-0 md:pl-2">
        <ChartContainer
          config={{
            line: {
              label: "Weight",
              icon: TrendingUp,
              color: lineStrokeColor,
            },
          }}
          className="h-56 md:h-80 w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey={mode === "year" ? "month" : "day"}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                interval={xAxisInterval}
                tick={{ fill: "#a3a3a3", fontSize: 12 }}
                tickFormatter={(value) =>
                  mode === "year" ? value.slice(0, 3) : value
                }
              />
              <YAxis
                // Use adjusted domain only if it's a full fallback (single point)
                domain={isFullFallback ? [fallbackWeight - 1, fallbackWeight + 1] : ["dataMin - 1", "dataMax + 1"]}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#a3a3a3", fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              
              {/* --- Single Line Component for all scenarios (color controlled by isFullFallback) */}
              <Line
                dataKey="weight"
                type="monotone"
                // GREEN for actual data or partially padded data, AMBER only for full fallback (no data)
                stroke={lineStrokeColor} 
                strokeWidth={isFullFallback ? 2 : 3}
                // Show dots only when in month mode and not using a full fallback
                dot={!isFullFallback && mode === "month" ? { r: 3, fill: lineStrokeColor, strokeWidth: 0 } : false} 
                activeDot={{
                  r: 5,
                  fill: lineStrokeColor,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />

            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium text-green-500">
          Trending up by 5.2% this {mode === "year" ? "year" : "month"}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-neutral-400 leading-none">
          Showing {mode === "year" ? "yearly trend" : "daily changes"}
        </div>
      </CardFooter>
    </Card>
  );
}