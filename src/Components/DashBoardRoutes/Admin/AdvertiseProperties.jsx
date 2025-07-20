import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdvertiseProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], refetch } = useQuery({
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

  return (
    <div className="p-4">
      <title>Advertise Properties</title>
      <h2 className="text-2xl font-bold mb-4">Advertise Verified Properties</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price Range</th>
              <th>Agent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>
                  <img src={p.image} alt="img" className="w-16 h-10 rounded" />
                </td>
                <td>{p.title}</td>
                <td>${p.minPrice} - ${p.maxPrice}</td>
                <td>{p.agentName}</td>
                <td>
                  {p.advertised ? (
                    <button className="btn btn-sm btn-disabled">Advertised</button>
                  ) : (

                    <>
                    
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAdvertise(p._id)}
                    >
                      Advertise
                    </button>
                    

                    </>
                    
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertiseProperties;
