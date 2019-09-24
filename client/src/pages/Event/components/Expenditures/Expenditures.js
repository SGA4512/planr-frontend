import React, { useState, useEffect } from "react";
import { Card, Icon, Statistic, Progress, Spin } from "antd";

const Expenditures = props => {
  const { totalCost, purchasedItemsCost, budget } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setPercent(Math.floor((100 * purchasedItemsCost) / budget));
    }, 1000);
  }, [totalCost, budget, purchasedItemsCost]);
  const percentOfBudget = Math.floor((100 * purchasedItemsCost) / budget);

  return (
    <div className="expenditures">
      <div className="progress-bar-container">
        <p>Percent of budget reached</p>
        {percentOfBudget > 100 ? (
          <Progress
            type="circle"
            width={180}
            strokeWidth={10}
            strokeColor={{
              "0%": "red",
              "100%": "orange"
            }}
            status="exception"
            percent={percentOfBudget}
          />
        ) : (
          <Progress
            type="circle"
            width={180}
            strokeWidth={10}
            strokeColor={{
              "0%": "#87d068",
              "100%": "#108ee9"
            }}
            percent={percentOfBudget}
          />
        )}
      </div>
      <div className="budget-stats">
        <Card className="stat">
          {!totalCost ? (
            <Spin />
          ) : (
            <Statistic
              title="All Items Cost"
              value={totalCost}
              precision={2}
              valueStyle={{ color: "#87D068" }}
              prefix={<Icon type="dollar" />}
            />
          )}
        </Card>
        <Card className="stat">
          {!totalCost ? (
            <Spin />
          ) : (
            <Statistic
              title="Purchased Items Total"
              value={purchasedItemsCost}
              precision={2}
              valueStyle={{ color: "#EF9F1F" }}
              prefix={<Icon type="dollar" />}
            />
          )}
        </Card>
        <Card className="stat">
          {!totalCost ? (
            <Spin />
          ) : budget - purchasedItemsCost < 0 ? (
            <Statistic
              title="Budget Exceeded"
              value={budget - purchasedItemsCost}
              precision={2}
              valueStyle={{ color: "red" }}
              prefix={<Icon type="dollar" />}
            />
          ) : (
            <Statistic
              title="Budget Remaining"
              value={budget - purchasedItemsCost}
              precision={2}
              valueStyle={{ color: "#0F8FE8" }}
              prefix={<Icon type="dollar" />}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Expenditures;
