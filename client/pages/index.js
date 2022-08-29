// Default Index Dashboard - will show various data driven graphs for global metrics

const stats = [
  { name: "Total Events", stat: "71,897" },
  { name: "Busiest Project", stat: "Test - 440 reqs" },
  { name: "Busiest Channel", stat: "User Sign Up - 300 reqs" },
];

export default function Index() {
  return (
    <div className="">
      <header>
        <div className="py-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Welcome to Project Hawk
          </h1>
        </div>
      </header>

      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Last 30 days
        </h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            >
              <dt className="truncate text-sm font-medium text-gray-500">
                {item.name}
              </dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                {item.stat}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
