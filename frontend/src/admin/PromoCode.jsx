import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import backendUrl from "../utils/backendUrl";
export const PromoCode = () => {
  const [promocode, setPromocode] = useState("");
  const [Promocode, setPromoCode] = useState("");

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/codes/promocodes`,
        {
          promocode,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Promocode created successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/codes/promocodes/${id}`, {
        withCredentials: true,
      });
      toast.success("Promocode deleted successfully");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  //promocode logic
  useEffect(() => {
    const fetchPromocodes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/codes/promocodes`, {
          withCredentials: true,
        });
        setPromoCode(response.data || null);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    };
    fetchPromocodes();
  }, [handleDelete, handleCreate]);

  return (
    // <div className="min-h-screen bg-gray-100 p-4">
    //   <div className="container mx-auto">
    //     <h1 className="text-3xl font-bold text-center mb-8">
    //       Manage Promo Codes
    //     </h1>
    //     <div className="bg-white p-6 rounded shadow-md mb-6">
    //       <h2 className="text-2xl font-bold mb-4">Create Promocode</h2>
    //       <input
    //         type="text"
    //         value={promocode}
    //         onChange={(e) => setPromocode(e.target.value)}
    //         className="w-full p-2 border rounded mb-4"
    //         placeholder="Enter promocode"
    //       />
    //       <button
    //         onClick={handleCreate}
    //         className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
    //       >
    //         Create
    //       </button>
    //     </div>
    //     <div className="bg-white p-6 rounded shadow-md">
    //       <h2 className="text-2xl font-bold mb-4">Promocode List</h2>
    //       <ul>
    //         {Promocode &&
    //           Promocode?.map((promo) => (
    //             <li
    //               key={promo._id}
    //               className="flex justify-between items-center mb-2"
    //             >
    //               <span>{promo.promocode}</span>
    //               <button
    //                 onClick={() => handleDelete(promo._id)}
    //                 className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800"
    //               >
    //                 Delete
    //               </button>
    //             </li>
    //           ))}
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 p-4 ">
      <div className="container mx-auto max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Manage Promo Codes
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Create Promocode
          </h2>
          <input
            type="text"
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
            className="w-full p-3 border rounded mb-4 text-gray-700"
            placeholder="Enter promocode"
          />
          <button
            onClick={handleCreate}
            className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
          >
            Create
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Promocode</h2>
          <ul>
            {Promocode && Promocode.length > 0 ? (
              Promocode.map((promo) => (
                <li
                  key={promo._id}
                  className="flex justify-between items-center mb-2 border-b pb-2 "
                >
                  <span className="text-gray-700">{promo.promocode}</span>
                  <button
                    onClick={() => handleDelete(promo._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-800 transition duration-200"
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-700 text-sm">No Promocode available!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
