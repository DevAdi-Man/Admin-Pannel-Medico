import { useState, } from "react";
import {
  FiVideo,
  FiHome,
  FiShield,
  FiFilter,
  FiMoreHorizontal,
  FiChevronUp,
  FiChevronDown,
  FiSearch,
  FiDownload,
} from "react-icons/fi";

const FILTERS = ["All", "Telemedicine", "In clinic", "Insurance"];

const STATUS_CONFIG = {
  Requested: {
    badge: "bg-orange-50 text-orange-700 border border-orange-200",
    dot: "bg-orange-400",
  },
  Paid: {
    badge: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500",
  },
  Sent: {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
};

const TYPE_CONFIG = {
  Telemedicine: { icon: FiVideo, cls: "bg-violet-50 text-violet-700" },
  "In clinic": { icon: FiHome, cls: "bg-rose-50 text-rose-700" },
  Insurance: { icon: FiShield, cls: "bg-green-50 text-green-700" },
};

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700",
  "bg-pink-100 text-pink-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-blue-100 text-blue-700",
];

const ROWS = [
  {
    type: "Telemedicine",
    sendDate: "12/12/24",
    name: "Rachel Mayers",
    amount: "$348.65",
    recipient: "123456 American Family Insurance",
    dueDate: "12/12/24",
    status: "Requested",
  },
  {
    type: "In clinic",
    sendDate: "11/12/24",
    name: "Samantha Williams",
    amount: "$348.65",
    recipient: "Samantha Williams",
    dueDate: "—",
    status: "Paid",
  },
  {
    type: "Insurance",
    sendDate: "12/12/24",
    name: "Amy White",
    amount: "$348.65",
    recipient: "123324 GEICO",
    dueDate: "12/12/24",
    status: "Sent",
  },
  {
    type: "In clinic",
    sendDate: "11/12/24",
    name: "Tyler Young",
    amount: "$348.65",
    recipient: "123456 American Family Insurance",
    dueDate: "—",
    status: "Paid",
  },
  {
    type: "Telemedicine",
    sendDate: "12/12/24",
    name: "Amy White",
    amount: "$348.65",
    recipient: "123324 GEICO",
    dueDate: "12/12/24",
    status: "Paid",
  },
  {
    type: "Telemedicine",
    sendDate: "12/12/24",
    name: "Rachel Mayers",
    amount: "$348.65",
    recipient: "123456 American Family Insurance",
    dueDate: "12/10/24",
    status: "Requested",
  },
  {
    type: "Insurance",
    sendDate: "12/12/24",
    name: "Rachel Mayers",
    amount: "$348.65",
    recipient: "123456 American Family Insurance",
    dueDate: "12/12/24",
    status: "Paid",
  },
];

const HEADERS = [
  { key: "type", label: "Type" },
  { key: "sendDate", label: "Send date" },
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
  { key: "recipient", label: "Recipient" },
  { key: "dueDate", label: "Due date" },
  { key: "status", label: "Status" },
];

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const cls = AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
  return (
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${cls}`}
    >
      {initials}
    </div>
  );
}

function TypeBadge({ type }:{type:string | number}) {
  const cfg = TYPE_CONFIG[type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG["Insurance"];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${cfg.cls}`}
    >
      <Icon size={11} />
      {type}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.Paid;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {status}
    </span>
  );
}

function SortIcon({ colKey, sortCol, sortDir }: { colKey: string; sortCol: string | null; sortDir: string }) {
  if (sortCol !== colKey)
    return <FiChevronUp size={12} className="opacity-30" />;
  return sortDir === "asc" ? (
    <FiChevronUp size={12} className="text-violet-600" />
  ) : (
    <FiChevronDown size={12} className="text-violet-600" />
  );
}

export default function TransactionsTable() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  const filtered = ROWS.filter((r) => {
    const matchFilter = activeFilter === "All" || r.type === activeFilter;
    const matchSearch =
      search === "" ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.recipient.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const sorted = sortCol
    ? [...filtered].sort((a, b) => {
        const va = a[sortCol as keyof typeof a] ?? "";
        const vb = b[sortCol as keyof typeof b] ?? "";
        return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      })
    : filtered;

  const handleSort = (col: string) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-[#eee8da] rounded-2xl border border-gray-100 shadow-sm overflow-hidden font-sans">
      {/* ── Top bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-100">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Transactions
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {sorted.length} records
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
            <FiSearch size={14} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="bg-transparent text-sm text-gray-700 outline-none w-28 placeholder-gray-400"
            />
          </div>

          {/* Filter btn */}
          <button className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600 font-medium hover:bg-gray-100 transition-colors">
            <FiFilter size={13} /> Filter
          </button>

          {/* Export btn */}
          <button className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 transition-colors rounded-lg px-3 py-1.5 text-sm text-white font-medium">
            <FiDownload size={13} /> Export
          </button>
        </div>
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex gap-1 px-5 py-2.5 border-b border-gray-100 overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1 rounded-full text-sm whitespace-nowrap transition-all ${
              activeFilter === f
                ? "bg-violet-50 border border-violet-200 text-violet-700 font-semibold"
                : "text-gray-500 hover:text-gray-700 font-normal"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" style={{ minWidth: 760 }}>
          <thead>
            <tr className="bg-[#efedebdb]">
              {HEADERS.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-2.5 text-left text-xs font-semibold text-gray-400 whitespace-nowrap cursor-pointer select-none border-b border-gray-100 hover:text-gray-600 transition-colors"
                >
                  <span className="inline-flex items-center gap-1">
                    {label}
                    <SortIcon
                      colKey={key}
                      sortCol={sortCol}
                      sortDir={sortDir}
                    />
                  </span>
                </th>
              ))}
              <th className="px-4 py-2.5 text-center text-xs font-semibold text-gray-400 border-b border-gray-100">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-gray-50 transition-colors hover:bg-violet-50/40 ${
                  i % 2 === 0 ? "bg-[#eee8da]" : "bg-gray-50/50"
                }`}
              >
                {/* Type */}
                <td className="px-4 py-3">
                  <TypeBadge type={row.type} />
                </td>

                {/* Send date */}
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {row.sendDate}
                </td>

                {/* Name */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={row.name} />
                    <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                      {row.name}
                    </span>
                  </div>
                </td>

                {/* Amount */}
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 whitespace-nowrap">
                  {row.amount}
                </td>

                {/* Recipient */}
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[180px]">
                  <div className="truncate">{row.recipient}</div>
                </td>

                {/* Due date */}
                <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                  {row.dueDate}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-center">
                  <button className="inline-flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 transition-colors">
                    <FiMoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sorted.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">
            No transactions match your filters.
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          Showing {sorted.length} of {ROWS.length} transactions
        </span>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-7 h-7 rounded-md text-xs font-medium transition-colors ${
                p === 1
                  ? "bg-violet-50 border border-violet-200 text-violet-700"
                  : "border border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
