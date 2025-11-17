import { useEffect, useState } from "react";
import { getTrainingsWithCustomer } from "../api/trainingapi";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { groupBy, sumBy } from "lodash";
import type { Training } from "../types";

export default function StatsPage() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    getTrainingsWithCustomer()
      .then((data: Training[]) => {
        const grouped = groupBy(data, "activity");

        const formatted = Object.keys(grouped).map(activity => ({
          activity,
          totalMinutes: sumBy(grouped[activity], "duration"),
        }));

        setChartData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ width: "90%", height: 500, margin: "50px auto" }}>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="activity" />

      <YAxis 
        label={{
          value: "Duration (minutes)",
          angle: -90,
          position: "insideLeft",
          dy: 50
        }}
      />

      <Tooltip />
      <Bar dataKey="totalMinutes" fill="#3f51b5" />
    </BarChart>
  </ResponsiveContainer>
</div>
  );
}
