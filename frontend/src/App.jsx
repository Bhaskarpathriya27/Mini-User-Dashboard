import React from "react";
import { fetchCoins } from "./services/api";
import Skeleton from "./components/Skeleton";
import ThemeToggle from "./components/ThemeToggle";
import Sidebar from "./components/Sidebar";
import { ArrowUp, ArrowDown, ArrowUpDown, RefreshCw, Menu } from "lucide-react";

function App() {
  const [coins, setCoins] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [sortBy, setSortBy] = React.useState("market_cap");
  const [sortDir, setSortDir] = React.useState("desc");

  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const loadCoins = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCoins();
      setCoins(data);
    } catch (err) {
      setError(err.message || "Failed to load coins");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadCoins();
  }, [loadCoins]);

  const filteredCoins = coins
    .filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      if (sortDir === "asc") return valA - valB;
      return valB - valA;
    });

  const toggleSort = (key) => {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ column }) => {
    if (sortBy !== column)
      return <ArrowUpDown size={14} className="opacity-50" />;
    if (sortDir === "asc") return <ArrowUp size={14} />;
    return <ArrowDown size={14} />;
  };

  return (
    <div
      className="
          min-h-screen flex w-full
          bg-gray-100 text-gray-900
          dark:bg-[#0A0A0A] dark:text-gray-200
          transition-colors overflow-y-hidden
        "
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 p-4 md:p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <header
            className="
                flex flex-col md:flex-row gap-4 md:items-center md:justify-between
                mb-6 p-4 md:p-5 rounded-2xl
                bg-white dark:bg-[#0F0F0F]
                border border-gray-200 dark:border-white/5
              "
          >
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                className="
                    md:hidden p-2 rounded-lg
                    border border-gray-300 dark:border-white/10
                    hover:bg-gray-100 dark:hover:bg-white/10
                  "
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Crypto Markets
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                    px-4 py-2 rounded-lg
                    bg-gray-100 dark:bg-[#0B0B0B]
                    border border-gray-300 dark:border-white/10
                    text-gray-900 dark:text-gray-200
                    placeholder-gray-500
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-white/20
                    outline-none
                  "
                placeholder="Search coins..."
              />

              {/* Refresh icon button */}
              <button
                onClick={loadCoins}
                className="
                    w-10 h-10 flex items-center justify-center rounded-full
                    border border-gray-300 dark:border-white/10
                    bg-white dark:bg-[#0B0B0B]
                    hover:bg-gray-100 dark:hover:bg-white/10
                    transition active:scale-95
                  "
                title="Refresh"
              >
                <RefreshCw
                  size={18}
                  className={loading ? "animate-spin" : ""}
                />
              </button>

              <ThemeToggle />
            </div>
          </header>

          {loading && <Skeleton rows={8} />}

          {error && (
            <div className="p-4 bg-red-500/10 text-red-500 rounded-xl border border-red-500/30">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div
              className="
                  overflow-x-auto rounded-xl
                  bg-white dark:bg-[#0F0F0F]
                  border border-gray-200 dark:border-white/5
                "
            >
              <table className="min-w-full text-sm  ">
                <thead>
                  <tr className="bg-gray-100 dark:bg-[#0B0B0B] border-b border-gray-200 dark:border-white/5">
                    <th className="px-4 py-3 text-left">Coin</th>

                    <th
                      className="px-4 py-3 text-left cursor-pointer select-none"
                      onClick={() => toggleSort("current_price")}
                    >
                      <div className="flex items-center gap-1">
                        Price <SortIcon column="current_price" />
                      </div>
                    </th>

                    <th
                      className="px-4 py-3 text-left cursor-pointer select-none"
                      onClick={() => toggleSort("price_change_percentage_24h")}
                    >
                      <div className="flex items-center gap-1">
                        24h % <SortIcon column="price_change_percentage_24h" />
                      </div>
                    </th>

                    <th
                      className="px-4 py-3 text-left cursor-pointer select-none"
                      onClick={() => toggleSort("market_cap")}
                    >
                      <div className="flex items-center gap-1">
                        Market Cap <SortIcon column="market_cap" />
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCoins.map((coin) => {
                    const change = coin.price_change_percentage_24h ?? 0;
                    const isPositive = change >= 0;

                    return (
                      <tr
                        key={coin.symbol}
                        className="
                            border-b last:border-b-0
                            border-gray-200 dark:border-white/5
                            hover:bg-gray-100 dark:hover:bg-white/5
                            transition
                          "
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img src={coin.image} className="w-6 h-6" />
                            <div>
                              <div className="font-medium">{coin.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {coin.symbol.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium">
                          ${coin.current_price.toLocaleString()}
                        </td>

                        <td
                          className={`px-4 py-3 font-semibold ${
                            isPositive ? "text-[#00C076]" : "text-[#FF4D4D]"
                          }`}
                        >
                          {isPositive ? "▲" : "▼"} {change.toFixed(2)}%
                        </td>

                        <td className="px-4 py-3 text-xs">
                          ${coin.market_cap.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
