type Props = {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  time?: string;
  iconbgColor?: string;
};
export const BillingCard = ({
  title,
  subtitle,
  icon,
  buttonText,
  time,
  iconbgColor,
}: Props) => {
  return (
    <div className="w-1/2 px-2 pb-2 ">
      <div className="bg-[#eee8da] hover:shadow-lg transition-all duration-300 rounded-3xl p-4">
        <div className="flex">
          {/* icon */}
          {icon && (
            <div
              className={`mr-4 w-10 h-10 flex items-center justify-center ${iconbgColor} rounded-full`}
            >
              {icon}
            </div>
          )}
          <div>
            {title && <p className="text-lg font-bold">{title}</p>}
            {subtitle && <p className="text-sm">{subtitle}</p>}
          </div>
          <div className="ml-auto">
            {time && (
              <div
                className={`
        ${iconbgColor}
        rounded-full
        px-3 py-1
        flex items-center justify-center
        whitespace-nowrap
      `}
              >
                <p className="text-xs font-medium text-gray-700">{time}</p>
              </div>
            )}
          </div>
        </div>
        {buttonText && (
          <button className="mt-4 bg-black text-white py-2 hover:transition-all hover:shadow-lg hover:shadow-red-300 px-4 rounded-3xl">
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
