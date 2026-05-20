import { FaDollarSign, FaLongArrowAltUp } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
type PaymentCardProps = {
  bgColor: string;
  icon?: React.ReactNode;
  title?: string;
  amount?: string | number;
  decrease?: boolean;
  increase?: boolean;
  value?: number | string;
  subText?: string;
};
export const PaymentCard = ({
  bgColor,
  icon,
  title,
  amount,
  subText,
  decrease = false,
  increase = false,
  value,
}: PaymentCardProps) => {
  return (
    <div
      className={`
    ${bgColor}
    mt-4
    p-4
    rounded-2xl
    hover:shadow-lg
    transition-all duration-300
  `}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className="
          p-2
          bg-[#2727274c]
          rounded-full
          shrink-0
        "
          >
            {icon}
          </div>
        )}

        {title && (
          <h2 className="text-sm md:text-base font-medium text-black break-words">
            {title}
          </h2>
        )}
      </div>

      {/* Content */}
      <div
        className="
      flex flex-col
      sm:flex-row
      sm:items-center
      sm:justify-between
      gap-4
      mt-4
    "
      >
        {/* Amount */}
        <div className="min-w-0">
          <div className="flex items-center text-black flex-wrap">
            <FaDollarSign
              className="
            mr-1
            text-2xl md:text-3xl
            shrink-0
          "
            />

            <p
              className="
            text-2xl md:text-4xl
            font-semibold
            break-words
          "
            >
              {amount}
            </p>
          </div>

          {subText && (
            <p
              className="
            mt-2
            text-sm
            text-black/70
            break-words
          "
            >
              {subText}
            </p>
          )}
        </div>

        {/* Badge */}
        <div
          className="
        bg-white
        rounded-full
        px-3 py-1
        w-fit
        shrink-0
      "
        >
          {decrease && (
            <div className="flex items-center gap-1">
              <FaArrowDownLong className="text-red-400 text-sm" />

              <p className="text-black text-sm font-medium">{value}</p>
            </div>
          )}

          {increase && (
            <div className="flex items-center gap-1">
              <FaLongArrowAltUp className="text-green-400 text-sm" />

              <p className="text-black text-sm font-medium">{value}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
