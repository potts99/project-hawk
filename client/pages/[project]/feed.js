import { useState, useEffect } from "react";

export default function feedIndex() {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState();

  async function feedData() {
    await fetch(`http://localhost:5001/api/v1/projects/feed/1`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeed(res.feed);
        setLoading(false);
      });
  }

  console.log(feed);

  useEffect(() => {
    feedData();
  }, []);

  return (
    <div>
      {loading && <div>loading</div>}

      {!loading && (
        <div className="mx-auto w-1/2">
          <ul role="list" className="divide-y divide-gray-200 ">
            {feed.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex space-x-3">
                  {/* <img className="h-6 w-6 rounded-full" src={activityItem.person.imageUrl} alt="" /> */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-700">{item.description}</p>
                    </div>
                    <p className="text-sm text-gray-500">Test - {item.createdAt}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
