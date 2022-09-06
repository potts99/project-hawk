import { useState } from "react";
import { useRouter } from "next/router";

export default function createChannel() {
  const router = useRouter();
  const [channel, setChannel] = useState();

  async function postData() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/channels/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: channel,
        project: router.query.project,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(`/${router.query.project}/feed`));
  }
  return (
    <div>
      <header>
        <h1 className="text-3xl leading-tight tracking-tight text-gray-900">
          Create a new channel
        </h1>
      </header>

      <div className="mt-4">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Channel Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setChannel(e.target.value)}
                    value={channel}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-5">
          <div className="flex justify-end">
            <button
              onClick={() => router.back()}
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={() => postData()}
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
