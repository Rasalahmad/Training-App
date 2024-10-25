import { Link, useLocation, useNavigate } from "react-router-dom";
import AppsOutageIcon from "@mui/icons-material/AppsOutage";
import PaymentsIcon from "@mui/icons-material/Payments";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useState } from "react";
import PaymentComponent from "../../components/Modal/Modal";

import SideBar from "./Components/SideBar";
import { useAuth } from "../../context/useAuth";

const UserAccount = () => {
  const { setActiveZ } = useAuth();
  const [status, setStatus] = useState("PD");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const studentData = state?.item;
  const infoArray = [
    { "Student Name": studentData.studentName },
    { Email: studentData.email },
    { "Student Id": studentData.studentId },
    { "Admission No": studentData.admissionNo },
    { "Phone Number": studentData.phoneNumber1 },
    { "Father Name": studentData.fatherName },
    { "Mother Name": studentData.motherName },
    { Nationality: studentData.nationality },
    { "NID No": studentData.nidNo },
    { "Present Address": studentData.presentAddress },
    { Religion: studentData.religion },
    { "Passport No": studentData.passportNo },
  ];
  const batchInfoArray = [
    { "Batch Name": studentData.batch?.batchName },
    { "Batch No": studentData.batch?.batchNo },
  ];

  const handleEditClick = (item) => {
    navigate("/registration", { state: { editMode: true, item } });
  };

  return (
    <div>
      <div className="w-full md:w-[83%] mx-auto  p-4 lg:mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="lg:grid grid-cols-12 gap-2">
            <SideBar
              studentData={studentData}
              setStatus={setStatus}
              status={status}
            />
            <div className="lg:w-[63vw] w-full lg:ms-10 mt-5 lg:mt-0 card-bordered rounded-xl  col-span-8 shadow-lg px-6 py-4">
              {status === "PD" ? (
                // personal info..........................................
                <div className="">
                  <div className="flex justify-between ">
                    <p className="text font-semibold text-xl text-cyan-400">
                      Student Information
                    </p>
                    <DriveFileRenameOutlineIcon
                      onClick={() => handleEditClick(studentData)}
                      className="text-cyan-400 hover:text-orange-400 cursor-pointer"
                    />
                  </div>
                  <div className="mt-3 border border-t-[1px border-gray-300 border-dashed"></div>
                  <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5 gap-3">
                    {infoArray.map((item, i) => (
                      <div key={i}>
                        <p className="text-md inline-block text-gray-400 font-semibold">
                          {Object.keys(item)[0]} :
                        </p>{" "}
                        <span className="text-xl font-semibold">
                          {item[Object.keys(item)[0]]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-8">
                    <p className="text font-semibold text-xl text-cyan-400">
                      Batch
                    </p>
                  </div>
                  <div className="mt-3 border border-t-[1px border-gray-300 border-dashed"></div>
                  <div className=" grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-5 gap-3">
                    {batchInfoArray.map((item, i) => (
                      <div key={i}>
                        <p className="text-md inline-block text-gray-400 font-semibold">
                          {Object.keys(item)[0]} :
                        </p>{" "}
                        <span className="text-xl font-semibold">
                          {item[Object.keys(item)[0]]}
                        </span>
                      </div>
                    ))}
                    <div>
                      <p className="text-md  text-gray-400 font-semibold">
                        About:
                      </p>{" "}
                      <span className="text-sm font-normal text-justify">
                        {studentData.batch?.about}
                      </span>
                    </div>
                  </div>
                </div>
              ) : status === "CD" ? (
                // course section ...............................................
                <>
                  <div>
                    <div className="flex justify-between">
                      <p className="text font-semibold text-xl text-cyan-400">
                        Course Detail
                      </p>
                      <AppsOutageIcon className="text-cyan-400" />
                    </div>
                    <div className="mt-3 border border-t-[1px border-gray-300 border-dashed"></div>
                    <div className="grid lg:grid-cols-8 my-6 shadow-md rounded-md hover:scale-95 ease-out duration-300">
                      <div className=" col-span-4">
                        <img
                          src={`${import.meta.env.VITE_APP_IMAGE_URL}/courses/${
                            studentData.course.image
                          }`}
                          className=" rounded-md w-92 p-4"
                          alt={studentData.course.image}
                        />
                      </div>
                      <div className=" col-span-4">
                        <p className=" card-title text-2xl mb-5">
                          {studentData.course.title}
                        </p>
                        <p>{studentData.course.desc.slice(0, 200)}...</p>
                        <div className="flex justify-between me-4 mt-6 mb-2">
                          <p>
                            <span className="text-gray-500 font-semibold">
                              Duration:{" "}
                            </span>
                            {studentData.course.duration}
                          </p>
                          <p>
                            <span className="text-gray-500 font-semibold">
                              Price:{" "}
                            </span>
                            {studentData.course.price}
                          </p>
                        </div>
                        <div className="flex justify-end mb-4 mr-4">
                          <Link
                            to={`/course/orion_computer_institute/${studentData.course._id}`}
                            className="s px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-500 focus:outline-none"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </>
              ) : (
                // payment setion.........................................
                <>
                  <div>
                    <div className="flex justify-between">
                      <p className="text font-semibold text-xl text-cyan-400">
                        Payment History
                      </p>
                      <label
                        htmlFor="payment_modal"
                        className="text-cyan-400 cursor-pointer"
                        onChange={setActiveZ("")}
                      >
                        <PaymentsIcon className="text-cyan-400 hover:text-orange-400" />
                      </label>
                    </div>
                    <div className="mt-3 border border-t-[1px border-gray-300 border-dashed"></div>

                    <div className="flex justify-center lg:gap-56 gap-16 card-bordered p-4 shadow-lg rounded-lg mt-6 ">
                      <div>
                        <p className="text-md inline-block text-gray-400 font-semibold">
                          Course price: {studentData.course.price}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`text-md inline-block text-gray-400 font-semibold`}
                        >
                          PAYMENT:{" "}
                          <span
                            className={` p-2 rounded-md ${
                              studentData?.registrationStatus === "pending"
                                ? "text-red-600 bg-red-100"
                                : studentData?.registrationStatus ===
                                  "completed"
                                ? "text-green-400 bg-green-100"
                                : "text-yellow-400 bg-yellow-100"
                            }`}
                          >
                            {studentData?.registrationStatus?.toUpperCase()}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5 mt-6">
                      <div className=" card-bordered p-4 shadow-lg rounded-lg">
                        <p className="text-md  text-gray-400 font-semibold flex justify-between gap-44 items-center">
                          <span>Paid:</span>
                        </p>
                        <p>{studentData?.paid}</p>
                      </div>
                      <div className="card-bordered p-4 shadow-lg rounded-lg">
                        <p className="text-md inline-block text-gray-400 font-semibold">
                          Due:
                        </p>
                        <p>{studentData?.due}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <PaymentComponent
        coursePrice={studentData.course.price}
        paid={studentData?.paid}
        id={studentData?._id}
      />
    </div>
  );
};

export default UserAccount;
