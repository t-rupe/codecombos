import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

type SelectedOptionsType = {
  [key: string]: string;
};

const filters = [
  {
    id: "frontend",
    name: "Frontend",
    options: [
      { value: "react", label: "React", checked: false },
      { value: "angular", label: "Angular", checked: false },
      { value: "vue", label: "Vue.js", checked: false },
      { value: "svelte", label: "Svelte", checked: false },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    options: [
      { value: "nodejs", label: "Node.js", checked: false },
      { value: "django", label: "Django", checked: false },
      { value: "rubyonrails", label: "Ruby on Rails", checked: false },
      { value: "spring", label: "Spring", checked: false },
    ],
  },
  {
    id: "database",
    name: "Database",
    options: [
      { value: "postgresql", label: "PostgreSQL", checked: false },
      { value: "mongodb", label: "MongoDB", checked: false },
      { value: "mysql", label: "MySQL", checked: false },
      { value: "redis", label: "Redis", checked: false },
    ],
  },
  {
    id: "tools",
    name: "Additional Tools",
    options: [
      { value: "docker", label: "Docker", checked: false },
      { value: "kubernetes", label: "Kubernetes", checked: false },
      { value: "jenkins", label: "Jenkins", checked: false },
      { value: "webpack", label: "Webpack", checked: false },
    ],
  },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateStack() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsType>({
    frontend: "",
    backend: "",
    database: "",
    tools: "",
  });

  const handleOptionChange = (
    category: keyof SelectedOptionsType,
    value: string,
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      // Ensure that a string is passed, even when unchecking an option
      [category]: prev[category] === value ? "" : value,
    }));
  };

  const isOptionDisabled = (
    category: keyof SelectedOptionsType,
    value: string,
  ): boolean => {
    return !!selectedOptions[category] && selectedOptions[category] !== value;
  };

  const [projectGenerated, setProjectGenerated] = useState(false);

  const handleGenerateProject = () => {
    // Logic to generate project details
    setProjectGenerated(true);
  };

  const handleBack = () => {
    // Assuming you have a way to set the 'projectGenerated' state to false
    setProjectGenerated(false);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
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
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Project Generator
            </h1>
          </div>
          <section aria-labelledby="stack-heading" className="pt-6">
            <h2 id="stack-heading" className="sr-only">
              Customize your stack
            </h2>
            <div className="flex gap-x-8 gap-y-10 ">
              {/* Filters */}
              <form className="hidden lg:block">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => {
                              const disabled = isOptionDisabled(
                                section.id,
                                option.value as string,
                              );
                              return (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    value={option.value}
                                    type="checkbox"
                                    checked={
                                      selectedOptions[section.id] ===
                                      option.value
                                    }
                                    disabled={disabled}
                                    onChange={() =>
                                      handleOptionChange(
                                        section.id,
                                        option.value,
                                      )
                                    }
                                    className={classNames(
                                      "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
                                      disabled
                                        ? "cursor-not-allowed opacity-50"
                                        : "",
                                    )}
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className={classNames(
                                      "ml-3 text-sm",
                                      disabled
                                        ? "text-gray-400"
                                        : "text-gray-600",
                                    )}
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              <div className="flex flex-col items-center justify-center">
                {projectGenerated ? (
                  // Display the generated project idea

                  <div id="content" className="border p-6 lg:col-span-3 ">
                    <div className="space-y-4">
                      <button
                        type="button"
                        className="mt-4 rounded-md bg-gray-200 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        onClick={handleBack}
                      >
                        ← Back to Customization
                      </button>

                      <h2 className="text-2xl font-bold text-indigo-600">
                        🚀 Project Idea: "Local Eats Explorer"
                      </h2>
                      <h3 className="text-lg font-semibold text-gray-900">
                        📝 Project Description:
                      </h3>
                      <p className="text-gray-600">
                        The "Local Eats Explorer" is a web application designed
                        to help users discover and support local restaurants in
                        their area. Users can search for restaurants by
                        location, cuisine, rating, or current deals. Each
                        restaurant will have a profile with a menu, photos, user
                        reviews, and the option to book a table or order food
                        online. On the backend, restaurant owners can manage
                        their profile, update their menu, and respond to
                        reviews.
                      </p>
                      <h2 className="text-lg font-semibold text-gray-900">
                        🔧 Tech Stack:
                      </h2>
                      <h3 className="text-md font-semibold text-gray-900">
                        🌐 Frontend Technology: React.js
                      </h3>
                      <p>
                        React.js will provide a dynamic and responsive user
                        interface. Its component-based architecture makes it
                        easy to manage the state of the restaurant profiles,
                        user reviews, and search functionality
                      </p>
                      <h3 className="text-md font-semibold text-gray-900">
                        💾 Backend Technology: Node.js
                      </h3>
                      <p>
                        Node.js will serve as the runtime environment with
                        Express framework simplifying the creation of RESTful
                        APIs to interact with the frontend.
                      </p>
                      <h3 className="text-md font-semibold text-gray-900">
                        🗄️ Database: MongoDB{" "}
                      </h3>
                      <p>
                        MongoDB is a NoSQL database that is perfect for handling
                        the schema-less data of various restaurants, user
                        profiles, and reviews.
                      </p>
                      <h3 className="text-md font-semibold text-gray-900">
                        🛠️ Additional Tools:{" "}
                      </h3>
                      <h3 className="text-md font-semibold text-gray-900">
                        🐳 Docker:
                      </h3>
                      <p> Use Docker to containerize the application, ensuring
                        that it works consistently across different development
                        and production environments.</p>
                        <h3 className="text-md font-semibold text-gray-900">🗺️ Google Maps API :</h3>
                        <p>Integrate with Google Maps API to allow users to view
                        restaurant locations and get directions.</p>
                        <h3 className="text-md font-semibold text-gray-900">💳 Stripe:</h3>
                        <p> Implement Stripe for handling online payments when users
                        place an order or book a table.</p>
                        <h3 className="text-md font-semibold text-gray-900">💬 Socket.IO:</h3>
                        <p>Use
                        Socket.IO to enable real-time bidirectional event-based
                        communication for a live chat support feature for users
                        to interact with restaurant owners.</p>
                        <h3 className="text-md font-semibold text-gray-900">🧪 Jest:</h3>
                        <p>Utilize
                        Jest for writing unit and integration tests for both
                        frontend and backend code to ensure application
                        reliability.</p>
                        
                      <p className="text-indigo-700">
                     
                        This project not only provides a useful
                        service for food enthusiasts but also supports local
                        businesses by giving them an online presence and direct
                        channel to potential customers.
                      </p>
                    </div>
                  </div>
                ) : (
                  // Display the instructions for stack customization
                  <div id="content" className="border p-6">
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-gray-900">
                        How to Customize Your Stack
                      </h2>
                      <p className="text-gray-600">
                        Welcome to the Project Generator! Follow these steps to
                        customize the tech stack for your new project:
                      </p>
                      <ol className="list-inside list-decimal space-y-2">
                        <li>
                          Select the frontend framework you&apos;d like to use
                          for your project.
                        </li>
                        <li>
                          Choose the backend technology from the available
                          options.
                        </li>
                        <li>
                          Decide on the database that best fits your data
                          storage needs.
                        </li>
                        <li>
                          Check any additional tools or libraries you want to
                          include.
                        </li>
                      </ol>
                      <p className="text-gray-600">
                        As you make your selections, options that are not
                        compatible will be disabled to ensure the integrity of
                        your tech stack. Once you&apos;re satisfied with your
                        choices, click on the &apos;Generate Project&apos;
                        button to create your custom setup.
                      </p>
                      <p className="text-sm text-gray-500">
                        Note: You can always change your selections before
                        finalizing your project.
                      </p>
                      <button
                        type="button"
                        className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleGenerateProject}
                      >
                        Generate Project
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}