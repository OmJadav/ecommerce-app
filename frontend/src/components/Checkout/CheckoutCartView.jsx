import React, { useContext } from "react";
import { Dialog, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Context } from "../../utils/context";
const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
];

const CheckoutCartView = () => {
  const { cartItems } = useContext(Context);
  // console.log(cartItems);

  return (
    <>
      <div className="flex h-full flex-col bg-white shadow-xl">
        <div className="flex-1 px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between ">
            <div className="text-2xl  font-medium text-gray-900">Your Cart</div>
          </div>
          <div className="mt-4">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems &&
                  cartItems.map((item) => (
                    <li key={item._id} className="flex py-6">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base  font-medium text-gray-900">
                            <h3 className="flex-1 flex-wrap">
                              <a className="truncate">{item.product.title}</a>
                            </h3>
                            <p className="ml-4 whitespace-nowrap">
                              ₹ {item.product.price}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {/* {product.color} */}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {item.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutCartView;
