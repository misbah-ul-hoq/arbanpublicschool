/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import {
  useGetNumberByUidQuery,
  useGetNumberQuery,
} from "@/redux/features/numbers/numberApi";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaInfoCircle } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
type Inputs = {
  uid: string;
};

const classes = [
  {
    className: "All Classes",
    value: "all",
  },
  {
    className: "Class 1",
    value: "1",
  },
  {
    className: "Class 2",
    value: "2",
  },
  {
    className: "Class 3",
    value: "3",
  },
  {
    className: "Class 4",
    value: "4",
  },
  {
    className: "Class 5",
    value: "5",
  },
  {
    className: "Class 6",
    value: "6",
  },
  {
    className: "Class 7",
    value: "7",
  },
  {
    className: "Class 8",
    value: "8",
  },

  {
    className: "Class 9",
    value: "9",
  },
  {
    className: "Class 10",
    value: "10",
  },
];

const AllNumbers = () => {
  const [studentNumber, setStudentNumber] = useState<unknown | null>(null);
  const { data: allNumbers, isLoading: allNumbersLoading } =
    useGetNumberQuery();
  const [numbers, setNumbers] = useState(allNumbers);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchStudentUid, setSearchStudentUid] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<Inputs>();
  useEffect(() => {
    setNumbers(allNumbers);
  }, [allNumbers]);

  const handleSearch: SubmitHandler<Inputs> = (data: Inputs) => {
    //@ts-ignore
    setNumbers(allNumbers?.filter((number) => number.uid == data.uid));
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);
    if (selectedValue === "all") {
      setNumbers(allNumbers);
    } else {
      setNumbers(
        //@ts-ignore
        allNumbers?.filter((number) => number.uid.slice(3, 4) == selectedValue),
      );
    }
  };

  if (allNumbersLoading)
    return <span className="loading loading-spinner"></span>;
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{}</h2>
        <select
          className="select select-primary w-full max-w-xs"
          onChange={handleSelectChange}
        >
          {classes.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.className}
              </option>
            );
          })}
        </select>
        <form className="join" onSubmit={handleSubmit(handleSearch)}>
          <input
            className="input join-item input-bordered"
            placeholder="Enter Uid"
            {...register("uid")}
          />
          <button className="btn btn-primary join-item">Search</button>
        </form>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Uid</th>
              <th>Class</th>
              <th>Exam</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {//@ts-ignore
            numbers?.map((number) => {
              return (
                <tr key={number.uid}>
                  <td>{number.uid}</td>
                  <td>{number.uid.slice(3, 4)}</td>
                  <td>{number.exam}</td>
                  <td className="flex gap-3">
                    <FaInfoCircle
                      className="inline-block cursor-pointer text-lg text-primary"
                      onClick={() => {
                        setStudentNumber(number);
                        document
                          .querySelector("#my_modal_1")
                          ?.classList.add("modal-open");
                      }}
                    />
                    <FiEdit className="cursor-pointer text-lg text-primary" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* single student info modal*/}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            Uid:{" "}
            {
              //@ts-ignore
              studentNumber?.uid
            }
          </h3>
          <p className="py-2">
            Exam:{" "}
            {
              //@ts-ignore
              studentNumber?.exam
            }
          </p>
          <p className="py-2 font-semibold">Numbers:</p>
          <div>
            {//@ts-ignore
            studentNumber?.numbers?.map((item, index) => {
              return (
                <div key={index} className="mb-4">
                  {Object.entries(item)
                    .filter(([key]) => key !== "_id")
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between border-b p-2"
                      >
                        <span className="font-bold">{key}</span>

                        <span>{String(value)}</span>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn"
                onClick={() => {
                  document
                    .querySelector("#my_modal_1")
                    ?.classList.remove("modal-open");
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AllNumbers;
