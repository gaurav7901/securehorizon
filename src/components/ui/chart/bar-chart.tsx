
import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { ChartContainer } from "./chart-container"

export const BarChart = ({
  data,
  index,
  categories,
  colors,
  valueFormatter,
  yAxisWidth,
}: {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: any) => string
  yAxisWidth?: number
}) => {
  return (
    <ChartContainer config={{}}>
      <RechartsPrimitive.ComposedChart data={data}>
        <RechartsPrimitive.XAxis
          dataKey={index}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <RechartsPrimitive.YAxis
          width={yAxisWidth}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => 
            valueFormatter ? valueFormatter(value) : `${value}`
          }
        />
        <RechartsPrimitive.Tooltip
          content={({ active, payload, label }) => {
            if (!active || !payload?.length) return null;
            
            return (
              <div className="rounded-lg border bg-background p-2 shadow-md">
                <div className="font-bold">{label}</div>
                <div className="grid gap-1">
                  {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="h-2 w-2 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm capitalize">{item.name}: </span>
                      <span className="text-sm font-semibold">
                        {valueFormatter ? valueFormatter(item.value) : item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        />
        <RechartsPrimitive.Legend />
        <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
        
        {categories.map((category, index) => (
          <RechartsPrimitive.Bar
            key={category}
            dataKey={category}
            fill={colors[index % colors.length]}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsPrimitive.ComposedChart>
    </ChartContainer>
  );
};
