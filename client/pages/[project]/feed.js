import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter} from 'next/router'

export default function feedIndex() {

  const router = useRouter()

  async function getFeed() {
    const res = await fetch(`http://localhost:5001/api/v1/projects/feed/c92cfeef-b6a4-4b7d-b24e-305dddb73391`);
    return res.json();
  }

  const { data, status } = useQuery(["feed"], () => getFeed());


  return (
    <div>
      {status === "loading" && <div>loading</div>}

      {status === "success" && (
        <div className="mx-auto w-1/2">
          <ul role="list" className="divide-y divide-gray-200 ">
            {data.feed.length > 0 && data.feed.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex space-x-3">
                  {/* <img className="h-6 w-6 rounded-full" src={activityItem.person.imageUrl} alt="" /> */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-700">
                        {item.description}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      Test - {item.createdAt}
                    </p>
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
