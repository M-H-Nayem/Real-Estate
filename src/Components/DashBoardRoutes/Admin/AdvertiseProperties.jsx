import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Loading/Loading";

const AdvertiseProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], refetch, isLoading } = useQuery({
    queryKey: ["adminVerifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties?verified=verified");
      return res.data;
    },
  });

  const handleAdvertise = async (id) => {
    try {
      const res = await axiosSecure.patch(`/properties/advertise/${id}`, {
        advertised: true,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Property marked for advertisement", "success");
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Could not advertise property", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className=" sm:p-6 lg:p-8">
      <title>Advertise Properties</title>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Advertise Verified Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500 mt-5">No verified properties to advertise.</p>
      ) : (
        <>
          {/* Card View for Mobile and Tablet (up to lg breakpoint) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
            {properties.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow-md p-4 space-y-3 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <img src={p.image} alt="Property" className="w-24 h-16 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{p.title}</h3>
                    <p className="text-sm text-gray-500">
                      Agent: {p.agentName}
                    </p>
                    <p className="text-sm font-bold text-green-700">
                      Price: ${p.minPrice} - ${p.maxPrice}
                    </p>
                  </div>
                </div>

                <div className="mt-2">
                  {p.advertised ? (
                    <button className="btn w-full btn-sm btn-disabled">Advertised</button>
                  ) : (
                    <button
                      className="btn w-full btn-sm btn-primary"
                      onClick={() => handleAdvertise(p._id)}
                    >
                      Advertise
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Table View for Large Devices (lg breakpoint and above) */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="table w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="py-3 px-4 text-left">No</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Price Range</th>
                  <th className="py-3 px-4 text-left">Agent</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p, index) => (
                  <tr key={p._id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <img src={p.image} alt="Property" className="w-16 h-10 object-cover rounded" />
                    </td>
                    <td className="py-2 px-4">{p.title}</td>
                    <td className="py-2 px-4">${p.minPrice} - ${p.maxPrice}</td>
                    <td className="py-2 px-4">{p.agentName}</td>
                    <td className="py-2 px-4">
                      {p.advertised ? (
                        <button className="btn btn-sm btn-disabled">Advertised</button>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleAdvertise(p._id)}
                        >
                          Advertise
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvertiseProperties;
