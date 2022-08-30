import { useState } from "react";
import { useRouter } from "next/router";

export default function createProject() {
  const router = useRouter();
  const [project, setProject] = useState();

  async function postData() {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/projects/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: project,
      }),
    })
      .then((res) => res.json())
      .then((res) => router.push(`/${res.project.id}/feed`));
  }


  return (
    <div>
      <header>
        <h1 className="text-3xl leading-tight tracking-tight text-gray-900">
          Create a new project
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
                  Project Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    localhost:3000/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={(e) => setProject(e.target.value)}
                    value={project}
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
