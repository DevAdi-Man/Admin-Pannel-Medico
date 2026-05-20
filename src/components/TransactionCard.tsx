import React from "react";
type Props = {
  step1Value?: string;
  step2Value?: string;
  amount?: string | number;
  code?: string;
  time?: string;
};
export const TransactionCard = ({ step1Value, step2Value, amount, code, time }: Props) => {
  return (
    <div className="flex-[0_0_auto] w-[45%] px-2 pb-2">
      <div className="bg-[#eee8da]  rounded-3xl p-4 transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <ul>
              <li className="text-black leading-[28px] pl-4  text-sm relative after:left-0 after:absolute before:absolute after:bg-black after:content-[''] after:top-1/2 after:-translate-y-1/2 after:w-[8px] after:h-[8px] before:content-['']  before:top-[10px] after:rounded-full before:left-1 before:w-[1px] before:h-[30px] before:bg-gray-700 ">
                {step1Value || "10077 GEICO ***9306"}
              </li>
              <li className="text-black leading-[28px] pl-4 text-sm after:rounded-full relative after:left-0 after:absolute  after:bg-black after:content-[''] after:top-1/2 after:-translate-y-1/2 after:w-[8px] after:h-[8px] ">
                {step2Value || "324345 IntellyMed"}
              </li>
            </ul>
            {/* <div className="bg-black  w-[8px] h-[8px] rotate-[45deg]" />
            <div className="w-[1px] h-10 bg-black ml-1" />
            <div className="bg-black  w-[8px] h-[8px] rotate-[45deg]" /> */}
          </div>
          <div className="bg-green-700 text-white rounded-4xl px-4 py-2 ">
            {amount || "$0.00"}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm mt-4">
            <p className="font-bold text-md">{code || "N/A"}</p>
            <p className="text-gray-400 text-[12px]">{time || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};
