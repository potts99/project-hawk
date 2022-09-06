import { useState } from "react";

export default function Playground() {
  const [token, setToken] = useState();
  const [project, setProject] = useState();
  const [channel, setChannel] = useState();
  const [event, setEvent] = useState();
  const [message, setMessage] = useState();

  async function post() {
    await fetch("http://localhost:5001/api/v1/events/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: event,
        project: project,
        channel: channel,
        description: message,
      }),
    });
  }

  return (
    <div className="flex flex-col justify-center align-center">
      <header>
        <div className="py-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            API Playground
          </h1>
        </div>
      </header>

      <main className="flex flex-row">
        <div className="flex-1 space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              API Bearer token
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder=""
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Project
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="trailLog"
                onChange={(e) => setProject(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Channel
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Waitlist"
                onChange={(e) => setChannel(e.target.value)}

              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Event
            </label>
            <div className="mt-1">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Waitlist sign up"
                onChange={(e) => setEvent(e.target.value)}

              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium ">
              Message: (Optional)
            </label>
            <div className="mt-1">
              <textarea
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="email: test@gmail.com"
                onChange={(e) => setMessage(e.target.value)}

              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="float-right">
            <button
              onClick={() => post()}
              type="button"
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
