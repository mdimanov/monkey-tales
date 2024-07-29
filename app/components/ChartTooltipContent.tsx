import { TooltipProps } from "recharts";

const ChartTooltipContent = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const usageCount = payload[0].value;
    const timeText = usageCount === 1 ? "time" : "times";
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(128, 128, 128, 0.8)",
          padding: "10px",
          borderRadius: "5px",
          color: "#fff",
        }}
      >
        <p className="label">{`Used ${usageCount} ${timeText}`}</p>
      </div>
    );
  }

  return null;
};

export default ChartTooltipContent;
