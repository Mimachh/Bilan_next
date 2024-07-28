import React from "react";
import Compteur from "./compteur";

import DebtCounter from "./counter";


const JANUARY_FIRST_2022 = 1672527600000;
const JANUARY_FIRST_2024 = 1704067201 * 1000;




const CounterCore = () => {


  const startOfYear = 1672527600000; // 1er janvier 2022
  const now = new Date().getTime();

  const statToAdd = 10000

  const type = "number"
  return (
    <div>
      {/* <Compteur
        inc={deficitTotalCounter}
        refresh={refreshEvery20MilSecond}
        totalNumberForNow={total}
      /> */}
      <DebtCounter
        now={now}
        startOfYear={startOfYear}

        // this will come in one data variable
        annualNumber={408805}
        refreshRate={1000} 
        statToAdd={statToAdd}
        type={type}
        isStatic={false}
      />
    </div>
  );
};

export default CounterCore;
