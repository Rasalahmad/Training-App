/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import logo2 from "../../assets/icons/OCI.jpg";
import logo1 from "../../assets/icons/OSC.jpg";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useGetCoursesQuery } from "../../redux/features/course/courseApi";
import {
  useGetRegisterStudentQuery,
  useRegisterStudentMutation,
  useUpdateRegisterStudentMutation,
} from "../../redux/features/studentRegistration/studentRegistrationApi";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllBatchQuery } from "../../redux/features/batch/batchApi";
import { ImageUrl } from "../../utils/imageUrl";
import { handleDownloadRegFrom } from "../../utils";
const Registration = () => {
  // Bangla to English
  const [lang, setLang] = useState("Eng");
  // get course data
  const { data: courseData } = useGetCoursesQuery();
  const { data: batchData } = useGetAllBatchQuery();
  const [registerStudent, { isLoading }] = useRegisterStudentMutation();
  const [updateRegisterStudent] = useUpdateRegisterStudentMutation();
  const { refetch } = useGetRegisterStudentQuery();
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [uploadimg, setUpLoadimg] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const {
    admissionNo,
    studentId: stdId,
    studentName,
    fatherName,
    motherName,
    presentAddress,
    permanentAddress,
    nationality,
    religion,
    phoneNumber1,
    guardianNo,
    nidNo,
    birthCertificate,
    dateOfBirth,
    email,
    gender,
    course,
    batch,
    image: defaultImage,
    _id: studentId,
  } = state?.item || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      admissionNo,
      stdId,
      studentName,
      fatherName,
      motherName,
      presentAddress,
      permanentAddress,
      nationality,
      religion,
      phoneNumber1,
      guardianNo,
      nidNo,
      birthCertificate,
      dateOfBirth:
        dateOfBirth && new Date(dateOfBirth)?.toISOString()?.substr(0, 10),
      email,
      gender,
      course: course?._id,
      batch: batch?._id,
    },
  });
  const onSubmit = async (data) => {
    const formData = new FormData();
    const appendToFormData = (key, value) => {
      if (value) {
        formData.append(key, value);
      }
    };

    appendToFormData("image", uploadimg);
    appendToFormData("admissionNo", data?.admissionNo);
    appendToFormData("studentId", data?.studentId);
    appendToFormData("studentName", data?.studentName);
    appendToFormData("fatherName", data?.fatherName);
    appendToFormData("motherName", data?.motherName);
    appendToFormData("permanentAddress", data?.permanentAddress);
    appendToFormData("presentAddress", data?.presentAddress);
    appendToFormData("nationality", data?.nationality);
    appendToFormData("religion", data?.religion);
    appendToFormData("phoneNumber1", data?.phoneNumber1);
    appendToFormData("guardianNo", data?.guardianNo);
    appendToFormData("nidNo", data?.nidNo);
    appendToFormData("birthCertificate", data?.birthCertificate);
    appendToFormData("dateOfBirth", data?.dateOfBirth);
    appendToFormData("email", data?.email);
    appendToFormData("course", data?.course);
    appendToFormData("gender", data?.gender);
    appendToFormData("batch", data?.batch);

    try {
      if (state?.editMode) {
        const res = await updateRegisterStudent({
          studentId,
          registerStudentData: formData,
        }).unwrap();
        if (res.statusCode === 200) {
          toast.success("Student updated successfully");
          refetch();
          navigate("/student");
        }
      } else {
        const res = await registerStudent(formData).unwrap();
        if (res.statusCode === 200) {
          toast.success("Student added successfully");
          refetch();
          navigate("/student");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleState = (type) => {
    const delay = 500;
    console.log(type);

    setTimeout(() => {
      if (type === "OCI") {
        setActive(false);
      } else {
        setActive(true);
      }
    }, delay);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("prescription", uploadimg);
    console.log("Form data");
  };

  const handlerBang = () => {
    setLang("Bang");
  };
  const handlerLang = () => {
    setLang("Eng");
  };
  return (
    <div className="w-[85%] mx-auto mb-9">
      <div className=" flex justify-between items-center">
        <p className="bg-white card-bordered shadow-lg px-2 font-semibold rounded-lg  py-2">
          Click The Icon
        </p>
        <div className="flex justify-between items-center gap-3">
          <button
            onClick={handlerBang}
            className={`${
              lang === "Bang"
                ? " text-gray-400 font-medium p-2 rounded-lg cursor-not-allowed"
                : " shadow-2xl bg-cyan-500 text-white font-medium p-2 rounded-lg cursor-pointer"
            }  `}
          >
            বাংলা
          </button>
          <button
            onClick={handlerLang}
            className={`${
              lang === "Bang"
                ? " shadow-2xl bg-cyan-500 text-white font-medium p-2 rounded-lg cursor-pointer"
                : "text-gray-400 font-medium p-2 rounded-lg cursor-not-allowed "
            }  `}
          >
            English
          </button>
        </div>
      </div>
      <div className="lg:grid grid-cols-12 gap-2">
        <div className=" lg:col-span-2 w-[50%] lg:w-auto mb-2 lg:mb-auto hover:text-black  relative shadow-lg top-2 z p-2 px-4 bg-primary  cursor-pointer  bg-gradient-to-r from-blue-500 to-blue-500 rounded-md font-semibold text-white">
          <div className=" grid grid-cols-2 gap-3">
            {active ? (
              <>
                <img
                  onClick={() => handleState("OCI")}
                  className="h-12 duration-1000 shadow-xl rounded-full"
                  src={logo1}
                />
                <div></div>
              </>
            ) : (
              <>
                <div></div>
                <img
                  onClick={() => handleState("OSP")}
                  className="h-12 duration-1000   shadow-xl  rounded-full"
                  src={logo2}
                />
              </>
            )}
          </div>
        </div>
        <div className=" col-span-10 flex items-center justify-center  hover:text-black  relative shadow-lg top-2  bg-primary  cursor-pointer  bg-gradient-to-r  from-blue-500  to-cyan-500 rounded-md font-semibold text-white">
          <div className=" text-center ">
            {active ? (
              <>
                <h1 className="text-2xl font-semibold uppercase cursor-not-allowed  ">
                  Orion Selai Proshikhon center
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-2xl py-4 lg:py-auto font-semibold uppercase cursor-not-allowed  ">
                  Orion computer Institute
                </h1>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hero lg:flex justify-start lg:my-16 my-10 ">
        <div className=" ">
          <div className=" card w-full  bg-base-100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body ml-[-30px]"
            >
              <div className=" lg:flex justify-between">
                <div className="lg:flex block join mb-5 lg:mb-auto">
                  <button className=" uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Admission No
                  </button>
                  <input
                    type="string"
                    className="input input-bordered join-item"
                    placeholder="Admission No"
                    {...register("admissionNo", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="lg:flex justify-between">
                <div className="lg:mt-[200px] my-3 bg-gradient-to-r h-[100%] uppercase cursor-not-allowed   line-clamp-4  from-blue-500  to-cyan-500  py-2 px-2 lg:w-[30vw] w-[85vw] text-center  text-white text-lg rounded-lg font-semibold">
                  Application Form for Admission
                </div>
                <div>
                  <div
                    className="lg:h-[30vh] h-[20vh] w-64  px-2 lg:px-auto border-2 border-dashed   border-gray-400 rounded-lg p-2 text-center"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {image || defaultImage ? (
                      <img
                        src={image || `${ImageUrl}/students/${defaultImage}`}
                        alt="Uploaded"
                        className="   lg:h-[25vh] h-[30vh] w-[30vw] object-contain"
                      />
                    ) : (
                      <div>
                        <AddPhotoAlternateIcon style={{ fontSize: "150px" }} />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setUpLoadimg(file);
                      if (file && file.type.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setImage(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <div className="mb-12">
                    <label
                      htmlFor="imageInput"
                      className=" relative top-9 p-2 px-4 bg-primary  cursor-pointer  bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-semibold text-white"
                    >
                      Upload Image
                    </label>
                  </div>
                </div>
              </div>

              <div className="join">
                <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                  Student Name
                </button>
                <input
                  type="text"
                  className="lg:w-[70vw] w-[55vw] input input-bordered join-item"
                  placeholder="Student Name"
                  required
                  {...register("studentName", {
                    required: true,
                  })}
                />
              </div>

              <div className="join">
                <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                  Father's Name
                </button>
                <input
                  type="text"
                  className="lg:w-[70vw] w-[55vw] input input-bordered join-item"
                  placeholder="father's Name"
                  required
                  {...register("fatherName", {
                    required: true,
                  })}
                />
              </div>
              <div className="join">
                <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                  Mother's Name
                </button>
                <input
                  type="text"
                  className="lg:w-[70vw]  input input-bordered join-item"
                  placeholder="mother's Name"
                  required
                  {...register("motherName", {
                    required: true,
                  })}
                />
              </div>
              <div className="join">
                <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                  Permanent Address
                </button>
                <input
                  type="text"
                  className="lg:w-[70vw] w-[43vw]  input input-bordered join-item"
                  placeholder="permanent address"
                  required
                  {...register("permanentAddress", {
                    required: true,
                  })}
                />
              </div>
              <div className="join">
                <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                  Present Address
                </button>
                <input
                  type="text"
                  className="lg:w-[70vw] w-[49vw] input input-bordered join-item"
                  placeholder="present address"
                  required
                  {...register("presentAddress", {
                    required: true,
                  })}
                />
              </div>
              <div className="lg:flex justify-between gap-2 ">
                <div className="join lg:mb-auto mb-3">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Student Id
                  </button>
                  <input
                    type="text"
                    className="lg:w-[28vw] w-[57vw] input input-bordered join-item"
                    placeholder="student Id"
                    required
                    {...register("studentId", {
                      required: true,
                    })}
                  />
                </div>
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Batch Name:
                  </button>
                  <select
                    {...register("batch", { required: true })}
                    aria-invalid={errors.from ? "true" : "false"}
                    className="select  select-bordered lg:w-[28vw] rounded-r-lg rounded-l-none "
                  >
                    <option selected disabled value="@">
                      Select batch
                    </option>
                    {batchData?.data?.map((batch) => (
                      <option key={batch._id} value={batch._id}>
                        {batch?.batchName}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="lg:flex justify-between gap-2 ">
                <div className="join lg:mb-auto mb-3">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Nationality
                  </button>
                  <input
                    type="text"
                    className="lg:w-[28vw] w-[57vw] input input-bordered join-item"
                    placeholder="nationality"
                    required
                    {...register("nationality", {
                      required: true,
                    })}
                  />
                </div>
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item  lg:w-[188px]">
                    Religion
                  </button>
                  <select
                    {...register("religion", { required: true })}
                    aria-invalid={errors.from ? "true" : "false"}
                    className="select select-bordered lg:w-[28vw] rounded-r-lg rounded-l-none "
                  >
                    <option selected disabled value="@">
                      Select religion
                    </option>
                    <option value="Islam">Islam</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Christian">Christian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="lg:flex justify-between gap-2">
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Phone Number
                  </button>
                  <input
                    type="string"
                    className="lg:w-[28vw] w-[63vw] lg:mb-auto mb-3 input input-bordered join-item"
                    placeholder="phone number"
                    required
                    {...register("phoneNumber1", {
                      required: true,
                    })}
                  />
                </div>
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Guardian Number
                  </button>
                  <input
                    type="text"
                    className="lg:w-[28vw] w-[63vw] input input-bordered join-item"
                    placeholder="guardian number"
                    required
                    {...register("guardianNo", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="lg:flex justify-between gap-2">
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    National ID (If any)
                  </button>
                  <input
                    type="text"
                    className="lg:w-[28vw] w-[63vw] lg:mb-auto mb-3 input input-bordered join-item"
                    placeholder="national id (if any)"
                    required
                    {...register("nidNo")}
                  />
                </div>
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item  lg:w-[188px]">
                    Course
                  </button>
                  <select
                    {...register("course", { required: true })}
                    aria-invalid={errors.from ? "true" : "false"}
                    className="select  select-bordered lg:w-[28vw] rounded-r-lg rounded-l-none "
                  >
                    <option selected disabled value="MS office">
                      Select course
                    </option>
                    {courseData?.data?.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course?.title} - {course?.duration}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="lg:flex justify-between gap-2">
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    birth certificate:
                  </button>
                  <input
                    type="number"
                    className="lg:w-[28vw] w-[43vw] input input-bordered join-item"
                    placeholder="birth certificate"
                    required
                    {...register("birthCertificate")}
                  />
                </div>
                <div className="join lg:mt-auto mt-3">
                  <button className="uppercase cursor-not-allowed  btn join-item rounded-r-full lg:w-[188px]">
                    Date of Birth
                  </button>
                  <input
                    type="date"
                    className="lg:w-[28vw] w-[63vw]  input input-bordered join-item"
                    placeholder="date of birth"
                    required
                    {...register("dateOfBirth", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="lg:flex justify-between gap-2">
                <div className="join lg:mb-auto mb-2">
                  <button className=" uppercase cursor-not-allowed  btn  join-item rounded-r-full lg:w-[188px]">
                    E-mail
                  </button>
                  <input
                    type="text"
                    className="lg:w-[28vw] w-[70vw] input input-bordered join-item"
                    placeholder="e-mail"
                    required
                    {...register("email")}
                  />
                </div>
                <div className="join">
                  <button className="uppercase cursor-not-allowed  btn join-item  lg:w-[188px]">
                    Gender
                  </button>
                  <select
                    {...register("gender", { required: true })}
                    aria-invalid={errors.from ? "true" : "false"}
                    className="select select-bordered lg:w-[28vw] rounded-r-lg rounded-l-none "
                  >
                    <option selected disabled value="@">
                      Select gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div className="form-control mt-6">
                <button className="w-[86vw] lg:w-auto hover:text-black  relative shadow-lg top-2 z p-2 px-4 bg-primary  cursor-pointer  bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md font-semibold text-white">
                  {isLoading ? "Loading..." : "Registration"}
                </button>
              </div>
            </form>
            <div>
              <button
                onClick={handleDownloadRegFrom}
                className=" bg-red-500 p-2 rounded-lg border hover:bg-transparent hover:border-red-500 hover:text-black text-white"
              >
                Download The Registration form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
