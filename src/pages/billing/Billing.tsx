import React from "react";
import CircularBarChart from "../../components/CircularBarChart";
import { PaymentCard } from "../../components/PaymentCard";
import { FaRegHeart } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { BillingCard } from "../../components/BillingCard";
import { TransactionCard } from "../../components/TransactionCard";
import TransactionsTable from "../../components/TransactionsTable";

export const Billing = () => {
  return (
    <div className="px-[15px] pb-4">
      <h1 className="text-[24px] font-bold mb-4">
        Your patients billing & invoices
      </h1>
      <div className="flex ">
        {/* Left side  */}
        <div className="px-4 w-full md:w-[30%]">
          <div className="">
            <CircularBarChart
              segments={[
                {
                  key: "finance",
                  icon: "dollar",
                  label: "Finance",
                  value: 8200,
                  color: "#A8C4E0",
                },
                {
                  key: "favourite",
                  icon: "heart",
                  label: "Favourite",
                  value: 9800,
                  color: "#F4B8D4",
                },
                {
                  key: "time",
                  icon: "hourglass",
                  label: "Time",
                  value: 5400,
                  color: "#E8D89A",
                },
              ]}
              defaultSelected="favourite"
              size={220}
              strokeWidth={22}
              onSelect={(key) => console.log("selected:", key)}
              gapFraction={0.05}
            />
            <PaymentCard
              increase={true}
              value={"+13%"}
              bgColor="bg-pink-200"
              icon={<FaRegHeart className="text-sm" />}
              title="Payment received"
              amount={"14,568"}
              subText="Total receipts value"
            />
            <PaymentCard
              increase={false}
              decrease={true}
              value={"-12%"}
              bgColor="bg-blue-200"
              icon={<GiSandsOfTime className="text-sm" />}
              title="Payments requested"
              amount={"6,234"}
              subText={"Total waiting payments value"}
            />
            <PaymentCard
              increase={false}
              decrease={true}
              value={"-5%"}
              bgColor="bg-yellow-200"
              icon={<FaRegHeart className="text-sm" />}
              title="Non insurance payments"
              amount={"3,786"}
              subText="Total value of non covered by insurance payments"
            />
          </div>
        </div>
        {/* Right side  */}
        <div className="px-4 w-full md:w-[70%]">
          <div className="">
            <p className="text-[18px] font-bold mb-4">Wait for bills</p>
            <div className="flex flex-wrap  items-center ">
              <BillingCard
                icon={<FaRegHeart className="text-sm" />}
                title="Samantha Williams"
                subtitle="130$ - Routine Check Up"
                buttonText="Request payment"
                time="09 : 15 AM"
                iconbgColor="bg-blue-200"
              />
              <BillingCard
                icon={<FaRegHeart className="text-sm" />}
                title="Amy White"
                subtitle="120$ - Video Consultation"
                buttonText="Request payment"
                time="09 : 45 AM"
                iconbgColor="bg-pink-200"
              />
              <BillingCard
                icon={<FaRegHeart className="text-sm" />}
                title="Amy White"
                subtitle="120$ - Video Consultation"
                buttonText="Request payment"
                time="09 : 45 AM"
                iconbgColor="bg-pink-200"
              />
            </div>
            <p className="text-[18px] font-bold mb-4">Latest transaction</p>
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex  items-center ">
                <TransactionCard
                  step1Value="10077 GEICO ***9306"
                  step2Value="324345 IntellyMed"
                  amount="+ $ 568.56"
                  time="15 min ago"
                  code="#3586895"
                />
                <TransactionCard
                  step1Value="William T ***3434"
                  step2Value="24245 Dr.Clinic ***4567"
                  amount="+ $ 100.00"
                  time="20 min ago"
                  code="#3586896"
                />
                <TransactionCard
                  step1Value="10079 GEICO ***9308"
                  step2Value="324347 IntellyMed"
                  amount="+ $ 200.00"
                  time="30 min ago"
                  code="#3586897"
                />
              </div>
            </div>
            <TransactionsTable />
          </div>
        </div>
      </div>
    </div>
  );
};
