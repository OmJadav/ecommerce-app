import React, { useContext, useEffect } from "react";
import { InputFieldForm } from "../common/InputFieldForm";
import { useForm } from "react-hook-form";
import { Context } from "../utils/context";
import { sendDataApi } from "../utils/api";
import { useParams } from "react-router-dom";
import useFetch from "../components/Hooks/useFetch";

export const AddProductForm = () => {
  const { id } = useParams();
  const { data } = useFetch(id ? `/api/products/product/${id}` : null);
  const product = data?.product;
  const { categories } = useContext(Context);
  // console.log(categories);
  const {
    register,
    formState: { errors },
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (product && id) {
      setValue("title", product.title);
      setValue("stock", product.stock);
      setValue("price", product.price);
      setValue("category", product.category._id);
      setValue("description", product.description);
      setValue("thumbnail", product.thumbnail);
      setValue("rating", product.rating);
      setValue("image1", product.images[0]);
      if (product.images[1]) {
        setValue("image2", product.images[1]);
      }
      if (product.images[2]) {
        setValue("image3", product.images[2]);
      }
      if (product.images[3]) {
        setValue("image4", product.images[3]);
      }
      if (product.images[4]) {
        setValue("image5", product.images[4]);
      }
    }
  }, [product, id, setValue]);

  return (
    <>
      {/* component */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4 flex flex-col my-2 ">
          <div className="text-center mb-2">
            <h1 className="font-bold text-3xl text-gray-900">
              Add New Product
            </h1>
          </div>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              // reset();
              const images = [
                data.image1,
                data.image2,
                data.image3,
                data.image4,
                data.image5,
              ].filter(Boolean);

              const product = {
                ...data,
                images,
              };

              delete product.image1;
              delete product.image2;
              delete product.image3;
              delete product.image4;
              delete product.image5;
              if (id && product) {
                sendDataApi(`/api/products/updateproduct/${id}`, product);
              } else {
                sendDataApi("/api/products/addnewproduct", product);
                reset();
              }
              console.log(product);
            })}
          >
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="title"
                  labelName="Product Name"
                  inputType="text"
                  placeholder="Enter Product Name"
                  formHook={register("title", {
                    required: "Product name is required",
                  })}
                  inputProps={{
                    required: true,
                  }}
                />
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="thumbnail"
                  labelName="Thumbnail Image"
                  inputType="text"
                  placeholder="Thumbnail Image"
                  formHook={register("thumbnail", {
                    required: "Thumbnail is required",
                  })}
                  inputProps={{
                    required: true,
                  }}
                />
                {errors.thumbnail && (
                  <p className="text-red-500">{errors.thumbnail.message}</p>
                )}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Description of Product"
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3 mb-3 md:mb-0">
                <InputFieldForm
                  id="price"
                  labelName="Product Price"
                  inputType="number"
                  placeholder="Enter Product Price"
                  formHook={register("price", {
                    required: "Price is required",
                  })}
                  inputProps={{
                    required: true,
                  }}
                />
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
                  >
                    <option label="Category" />

                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category?._id} value={category._id}>
                          {category.name}
                        </option>
                      ))
                    ) : (
                      <option>Something went wrong</option>
                    )}
                  </select>
                </div>
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>
              <div className="md:w-1/2 px-3">
                <InputFieldForm
                  id="stock"
                  labelName="Product Stock"
                  inputType="number"
                  placeholder="Enter Product Stock"
                  formHook={register("stock")}
                  inputProps={{
                    required: false,
                  }}
                />
              </div>
              <div className="md:w-1/2 px-3">
                <InputFieldForm
                  id="rating"
                  labelName="Product Rating"
                  inputType="number"
                  placeholder="Enter Product Rating"
                  formHook={register("rating")}
                  inputProps={{
                    required: false,
                  }}
                />
              </div>
            </div>

            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="image1"
                  inputType="text"
                  placeholder="Product Image Link 1"
                  formHook={register("image1", {
                    required: "Image 1 is required",
                  })}
                  inputProps={{
                    required: true,
                  }}
                />
                {errors.image1 && (
                  <p className="text-red-500">{errors.image1.message}</p>
                )}
              </div>
            </div>
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="image2"
                  inputType="text"
                  placeholder="Product Image Link 2"
                  formHook={register("image2")}
                  inputProps={{
                    required: false,
                  }}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="image3"
                  inputType="text"
                  placeholder="Product Image Link 3"
                  formHook={register("image3")}
                  inputProps={{
                    required: false,
                  }}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="image4"
                  inputType="text"
                  placeholder="Product Image Link 4"
                  formHook={register("image4")}
                  inputProps={{
                    required: false,
                  }}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-3">
              <div className="md:w-full px-3">
                <InputFieldForm
                  id="image5"
                  inputType="text"
                  placeholder="Product Image Link 5"
                  formHook={register("image5")}
                  inputProps={{
                    required: false,
                  }}
                />
              </div>
            </div>
            <div className="flex -mx-3">
              {id ? (
                <>
                  <div className="w-full px-3 mb-7">
                    <button
                      onClick={() => {
                        reset();
                      }}
                      className="block w-full  mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="w-full px-3 mb-7">
                    <button className="block w-full  mx-auto bg-red-500 hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold">
                      Delete
                    </button>
                  </div>
                  <div className="w-full px-3 mb-7">
                    <button className="block w-full  mx-auto bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold">
                      Update
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full px-3 mb-7">
                    <button
                      onClick={() => {
                        reset();
                      }}
                      className="block w-full  mx-auto bg--500 bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="w-full px-3 mb-7">
                    <button className="block w-full  mx-auto bg-green-500 hover:bg-green-700 focus:bg-green-700 text-white rounded-lg px-3 py-3 font-semibold">
                      Add Product
                    </button>
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
