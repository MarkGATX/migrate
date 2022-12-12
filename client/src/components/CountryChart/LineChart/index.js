import React from "react";
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryContainer, VictoryScatter, VictoryArea } from "victory";
import '../CountryChart.scss';

const LineChart = ({
  fields
}) => {
  return (
    <div className="chartContainer">
      <VictoryChart 
        height={600} 
        width={1000} 
        containerComponent={
          <VictoryContainer responsive={true}
        />
      }
      >
        <VictoryLine
          labelComponent={
            <VictoryLabel 
              renderInPortal 
              dy={-20} 
              dx={20} 
              textAnchor={({ text }) => text.length > 1 ? "start" : "middle"}
            />
          }
          style={{
            data: { stroke: "#022831" },
            parent: { border: "1px solid #ccc"},
          }}
          alignment="start"
          size={5}
          domain={{y: [0, 100]}}
          labels={({ datum }) => datum.y}
          data={[
            { x: "2018", y: fields["2018"]},
            { x: "2019", y: fields["2019"] },
            { x: "2020", y: fields["2020"] },
            { x: "2021", y: fields["2021"] },
            { x: "2022", y: fields["2022"] }
          ]}
        />
        <VictoryScatter
          data={[
            { x: "2018", y: fields["2018"]},
            { x: "2019", y: fields["2019"] },
            { x: "2020", y: fields["2020"] },
            { x: "2021", y: fields["2021"] },
            { x: "2022", y: fields["2022"] }
          ]}
          style={{
            data: {
              fill: "#b4d330",
            },
          }}
        />
        <VictoryAxis crossAxis
          label="Year"
          // style={{
          //   grid: {
          //     stroke: "red",
          //   }
          // }}
        />
        <VictoryAxis dependentAxis crossAxis
          label="Score"
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          // style={{
          //   grid: {stroke: "red" }
          // }}
        />
        
      </VictoryChart>
    </div>
  )
};

export default LineChart
 