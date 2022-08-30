import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

import { PlusIcon as PlusIconMini } from "@heroicons/react/20/solid";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/24/outline";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainLayout({ children }) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState();
  const [trunks, setTrunks] = useState();

  const innerNav = [
    { name: "Feed", href: `feed`, current: router.pathname.includes("/feed") },
    {
      name: "Metrics",
      href: `metrics`,
      current: router.pathname.includes("/metrics"),
    },
  ];

  async function fetchProjects() {
    await fetch(`http://localhost:5001/api/v1/projects/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setProjects(res.projects);
      });
  }

  async function fetchTrunks() {
    await fetch(`http://localhost:5001/api/v1/channels/all`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setTrunks(res.channel);
      });
  }

  useEffect(() => {
    Promise.all([fetchProjects(), fetchTrunks()]).then(() => {
      // waits till all apis are finished bfore setting loading to false
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading && (
        <div className="flex">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 flex z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XMarkIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 flex items-center px-4">
                      <a href="/">
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                          alt="Workflow"
                        />
                      </a>
                    </div>
                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                      <nav className="px-2 space-y-1">
                        {projects.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center justify-center h-8 w-8 rounded-full bg-gray-500"
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div
            className={
              router.pathname.includes("/[project]")
                ? "hidden md:flex md:w-80 md:flex-row md:fixed md:inset-y-0"
                : "hidden md:flex md:w-30 md:flex-row md:fixed md:inset-y-0"
            }
          >
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col border-r border-gray-200 pt-5 bg-white overflow-y-auto w-20 items-center justify-center">
              <div className="flex flex-shrink-0 px-2">
                <a href="/">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                    alt="Workflow"
                  />
                </a>
              </div>
              <div className="mt-5 flex-grow flex flex-col px-4">
                <nav className="flex-1 pb-4 space-y-1">
                  {projects.map((item) => (
                    <a
                      key={item.name}
                      href={`/${item.name}/feed`}
                      className={classNames(
                        item.current
                          ? " text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group inline-flex items-center justify-center h-8 w-8 rounded-full mx-atuo px-6 text-lg"
                      )}
                    >
                      {item.name[0]}
                    </a>
                  ))}
                  <div className="pt-2 divide-y divide-gray-200">
                    <button
                      type="button"
                      className="inline-flex ml-1 items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => router.push("/create")}
                    >
                      <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </nav>
              </div>
            </div>
            {router.pathname.includes("/[project]") && (
              <div className="flex flex-col flex-grow border-r border-gray-200 pt-4 pb-4 bg-white overflow-y-auto">
                <div className="flex-grow flex flex-col">
                  <nav className="flex-1 bg-white" aria-label="Sidebar">
                    <div className="px-4 py-1 text-xl font-bold">
                      <h1>Test</h1>
                    </div>
                    <div className="mt-8">
                      {innerNav.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center rounded-md px-4 mx-4 mt-2 py-2 text-sm font-medium"
                          )}
                        >
                          <span className="align-middle font-mono text-sm">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </div>

                    <div className="mt-32">
                      <h3
                        className="group flex items-center rounded-md px-4 mx-4 mt-2 py-2 font-bold text-md"
                        id="projects-headline"
                      >
                        Channel
                      </h3>
                      <div
                        className="space-y-1"
                        role="group"
                        aria-labelledby="projects-headline"
                      >
                        {trunks.map((item) => (
                          <a
                            key={item.name}
                            href={`${item.name}`}
                            className={classNames(
                              item.current
                                ? "bg-indigo-50 border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group flex items-center rounded-md px-4 mx-4 mt-2 py-2 text-sm font-medium"
                            )}
                          >
                            <span className="truncate">{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            )}
          </div>

          <div
            className={
              router.pathname.includes("/[project")
                ? "flex flex-col flex-1 md:pl-80"
                : "flex flex-col flex-1 md:pl-20"
            }
          >
            <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
              <button
                type="button"
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 px-4 flex justify-between">
                <div className="flex-1 flex"></div>
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <span className="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <main className="flex-1">
              <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                  <div className="py-4">{children}</div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
