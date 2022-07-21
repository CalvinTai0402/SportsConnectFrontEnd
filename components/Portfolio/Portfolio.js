import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Input from "./Input";
import Textarea from "./Textarea";
import Experiences from "./Experiences";
import Educations from "./Educations";
import DatePicker from "react-datepicker";
import yyyymmdd from "../../utilities/yyyymmdd";
import { AiOutlineClose } from "react-icons/ai";
import useMyAxios from "../../hooks/useMyAxios";
import useCsrfToken from "../../hooks/useCsrfToken";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

Date.prototype.yyyymmdd = yyyymmdd;

export default function Portfolio() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date("2022-07-02T15:00:00Z"));
  const [photoUrl, setPhotoUrl] = useState("None");
  const [showUploadButton, setShowUploadButton] = useState(false);
  const [uploading, setUploading] = useState(false);

  const firstRun = useRef(true);
  let getCsrf = useCsrfToken();
  const router = useRouter();

  useEffect(() => {
    let fetchCurrentUser = async () => {
      let myAxios = useMyAxios(router);
      let res = await myAxios.get("/users/me").catch((e) => {
        return e.response;
      });
      let currentUser = res.data;
      setFirstName(currentUser.first_name);
      setLastName(currentUser.last_name);
      setPreferredName(currentUser.preferred_name);
      setBio(currentUser.bio);
      setGender(currentUser.gender);
      setContact(currentUser.contact_number);
      setCurrentAddress(currentUser.current_address);
      setPermanentAddress(currentUser.permanent_address);
      setEmail(currentUser.email);
      setBirthday(new Date(currentUser.birthday + "T15:00:00Z"));
      if (res.data.profile_photo.length > 0) {
        setPhotoUrl(res.data.profile_photo[0].photo_url);
      }
    };
    fetchCurrentUser();
  }, []);

  let handleUpdate = async () => {
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios
      .put("/users", {
        first_name: firstName,
        last_name: lastName,
        preferred_name: preferredName,
        bio: bio,
        gender: gender,
        contact_number: contact,
        current_address: currentAddress,
        permanent_address: permanentAddress,
        birthday: birthday.yyyymmdd(),
      })
      .catch((e) => {
        return e.response;
      });
  };

  let updateProfilePhoto = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    setUploading(true);
    let csrfToken = await getCsrf();
    let myAxios = useMyAxios(router, csrfToken);
    let res = await myAxios
      .post("/users/profile-photo", formData)
      .catch((e) => {
        return e.response;
      });
    setUploading(false);
    setPhotoUrl(res.data);
  };

  useEffect(() => {
    if (firstRun.current) {
      // we do not want to update on mount
      firstRun.current = false;
    } else {
      handleUpdate();
    }
  }, [
    firstName,
    lastName,
    preferredName,
    bio,
    gender,
    contact,
    currentAddress,
    permanentAddress,
    email,
    birthday,
  ]);

  return (
    <Fragment>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap mx-2 ">
          <div className="w-full md:w-3/12 mx-2">
            <div className="bg-white border-t-4 border-blue-400 h-full">
              <div className="image overflow-hidden">
                {photoUrl !== "None" ? (
                  <Image
                    className="h-auto w-full mx-auto"
                    src={photoUrl}
                    alt=""
                    width={550}
                    height={600}
                  />
                ) : (
                  <Image
                    className="h-auto w-full mx-auto"
                    src="https://sportsconnect-profilephotos.s3.amazonaws.com/default-photo-15f476212b3a96481fbe8119c9852426ae7685db0f0a57b48fbc3738ce68add8.jpg"
                    alt=""
                    width={550}
                    height={600}
                  />
                )}
                {uploading ? (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 h-auto w-full mx-auto"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : showUploadButton ? (
                  <span>
                    <span className="flex justify-between">
                      <label
                        className="text-sm font-medium text-gray-900 dark:text-gray-300 text-blue-600"
                        htmlFor="file_input"
                      >
                        Upload file
                      </label>
                      <label
                        className="mt-[2px]"
                        onClick={() => setShowUploadButton(false)}
                      >
                        <AiOutlineClose />
                      </label>
                    </span>
                    <input
                      className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      onChange={(e) => {
                        setShowUploadButton(false);
                        updateProfilePhoto(e);
                      }}
                    ></input>
                  </span>
                ) : (
                  <div
                    onClick={() => setShowUploadButton(!showUploadButton)}
                    className="text-sm grid place-items-center bg-slate-200 border-gray-500 text-blue-600"
                  >
                    {photoUrl === "None"
                      ? "Click to upload a new profile photo"
                      : "Change profile photo"}
                  </div>
                )}
              </div>
              <h1 className="text-gray-900 leading-8 my-2">
                <Input
                  label="Preferred name"
                  name="Preferred name"
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                />
              </h1>
              <div className="leading-6 w-full h-[20vh] max-h-[10rem] md:h-full md:max-h-[12rem]">
                <Textarea
                  label="Bio"
                  name="Bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
            <div className="my-4"></div>
          </div>
          <div className="w-full md:w-9/12 mx-2 ">
            <div className="bg-white pb-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-blue-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="md:px-4 py-2">
                    <Input
                      label="First name"
                      name="First name"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label="Last name"
                      name="Last name"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="md:px-4 py-2">
                    <Input
                      label="Gender"
                      name="Gender"
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label="Contact No."
                      name="Contact No."
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label="Current address"
                      name="Current address"
                      type="text"
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2 pb-0">
                    <Input
                      label="Permanent address"
                      name="Permanent address"
                      type="text"
                      value={permanentAddress}
                      onChange={(e) => setPermanentAddress(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label="Email"
                      name="Email"
                      type="email"
                      value={email}
                      readOnly={true}
                    />
                  </div>

                  <div className="md:px-4 focus:text-black-700">
                    <div className="text-gray-500">Birthday:</div>
                    <DatePicker
                      selected={birthday}
                      onChange={(date) => {
                        setBirthday(date);
                      }}
                      className="border-0 border-b-2 w-full border-gray-200 pb-2 focus:outline-none focus:ring-0 focus:border-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white shadow-sm rounded-sm">
              <div className="grid grid-cols-2 gap-x-3 px-4">
                <Experiences />
                <Educations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
