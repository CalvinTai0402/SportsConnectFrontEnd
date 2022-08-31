import Image from 'next/image';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import Input from './Input';
import Textarea from './Textarea';
import Experiences from './Experiences';
import Educations from './Educations';
import yyyymmdd from '../../utilities/yyyymmdd';
import useTranslation from 'next-translate/useTranslation';
import {
  getCurrentUser,
  updateUser,
  uploadProfilePhoto,
} from '../../network/lib/users';
import YearMonthDayPicker from '../DatePicker/YearMonthDayPicker';
import CropImage from '../CropImage/CropImage';

Date.prototype.yyyymmdd = yyyymmdd;

export default function Portfolio() {
  const { t } = useTranslation();
  const [name, setName] = useState(null); // have to use nulls for the logic of firstRuns because fetchCurrentUser() updates with String
  const [wechatId, setWechatId] = useState(null);
  const [preferredName, setPreferredName] = useState(null);
  const [bio, setBio] = useState(null);
  const [gender, setGender] = useState(null);
  const [contact, setContact] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [permanentAddress, setPermanentAddress] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('None');
  const [uploading, setUploading] = useState(false);
  const abortControllerRef = useRef(new AbortController());
  let allMounted = useRef(false);

  const firstRuns = {
    // we do not want to handleUpdate() on first Mount
    name: useRef(false),
    wechatId: useRef(false),
    preferredName: useRef(false),
    bio: useRef(false),
    gender: useRef(false),
    contact: useRef(false),
    currentAddress: useRef(false),
    permanentAddress: useRef(false),
    email: useRef(false),
    birthday: useRef(false),
  };

  const secondRuns = {
    // we also do not want to handleUpdate() on fetchCurrentUser()
    name: useRef(false),
    wechatId: useRef(false),
    preferredName: useRef(false),
    bio: useRef(false),
    gender: useRef(false),
    contact: useRef(false),
    currentAddress: useRef(false),
    permanentAddress: useRef(false),
    email: useRef(false),
    birthday: useRef(false),
  };

  useEffect(() => {
    if (!firstRuns.name.current) firstRuns.name.current = true;
    else if (!secondRuns.name.current) secondRuns.name.current = true;
  }, [name]); // we need both firstRuns and secondRuns because the component first updates and then fetchCurrentUser()

  useEffect(() => {
    if (!firstRuns.wechatId.current) firstRuns.wechatId.current = true;
    else if (!secondRuns.wechatId.current) secondRuns.wechatId.current = true;
  }, [wechatId]);

  useEffect(() => {
    if (!firstRuns.preferredName.current)
      firstRuns.preferredName.current = true;
    else if (!secondRuns.preferredName.current)
      secondRuns.preferredName.current = true;
  }, [preferredName]);

  useEffect(() => {
    if (!firstRuns.bio.current) firstRuns.bio.current = true;
    else if (!secondRuns.bio.current) secondRuns.bio.current = true;
  }, [bio]);

  useEffect(() => {
    if (!firstRuns.gender.current) firstRuns.gender.current = true;
    else if (!secondRuns.gender.current) secondRuns.gender.current = true;
  }, [gender]);

  useEffect(() => {
    if (!firstRuns.contact.current) firstRuns.contact.current = true;
    else if (!secondRuns.contact.current) secondRuns.contact.current = true;
  }, [contact]);

  useEffect(() => {
    if (!firstRuns.currentAddress.current)
      firstRuns.currentAddress.current = true;
    else if (!secondRuns.currentAddress.current)
      secondRuns.currentAddress.current = true;
  }, [currentAddress]);

  useEffect(() => {
    if (!firstRuns.permanentAddress.current)
      firstRuns.permanentAddress.current = true;
    else if (!secondRuns.permanentAddress.current)
      secondRuns.permanentAddress.current = true;
  }, [permanentAddress]);

  useEffect(() => {
    if (!firstRuns.email.current) firstRuns.email.current = true;
    else if (!secondRuns.email.current) secondRuns.email.current = true;
  }, [email]);

  useEffect(() => {
    if (!firstRuns.birthday.current) firstRuns.birthday.current = true;
    else if (!secondRuns.birthday.current) secondRuns.birthday.current = true;
  }, [birthday]);

  useEffect(() => {
    let fetchCurrentUser = async () => {
      let res = await getCurrentUser(abortControllerRef.current);
      if (res?.status === 200) {
        let currentUser = res.data;
        if (currentUser.birthday) {
          setBirthday(new Date(currentUser.birthday + 'T15:00:00Z'));
        } else {
          setBirthday(new Date('2022-07-02T15:00:00Z'));
        }
        if (res.data.profile_photo?.length > 0) {
          setPhotoUrl(res.data.profile_photo[0].photo_url);
        }
        setName(currentUser.name);
        setWechatId(currentUser.wechatId);
        setPreferredName(currentUser.preferred_name);
        setBio(currentUser.bio);
        setGender(currentUser.gender);
        setContact(currentUser.contact_number);
        setCurrentAddress(currentUser.current_address);
        setPermanentAddress(currentUser.permanent_address);
        setEmail(currentUser.email);
      }
    };
    fetchCurrentUser();
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (allMounted.current) {
      handleUpdate();
    } else {
      let currentlyAllMounted = true;
      for (var key of Object.keys(firstRuns)) {
        if (!firstRuns[key].current || !secondRuns[key].current) {
          currentlyAllMounted = false;
          break;
        }
      }
      if (currentlyAllMounted) allMounted.current = true;
    }
  }, [
    name,
    wechatId,
    preferredName,
    bio,
    gender,
    contact,
    currentAddress,
    permanentAddress,
    email,
    birthday,
  ]);

  let handleUpdate = async () => {
    await updateUser({
      name: name,
      email: email,
      wechatId: wechatId,
      preferred_name: preferredName,
      bio: bio,
      gender: gender,
      contact_number: contact,
      current_address: currentAddress,
      permanent_address: permanentAddress,
      birthday: birthday.yyyymmdd(),
    });
  };

  return (
    <Fragment>
      <div className="container mx-auto my-5 p-5 min-h-[80vh]">
        <div className="md:flex no-wrap mx-2 ">
          <div className="w-full md:w-3/12 sm:mx-2">
            <div className="bg-white border-t-4 border-blue-400 h-full">
              <div className="image overflow-hidden">
                {photoUrl !== 'None' ? (
                  <Image
                    className="h-auto w-full mx-auto"
                    src={photoUrl}
                    alt=""
                    width={600}
                    height={600}
                  />
                ) : (
                  <Image
                    className="h-auto w-full mx-auto"
                    src="https://sportsconnect-profilephotos.s3.amazonaws.com/default-photo.jpg"
                    alt=""
                    width={600}
                    height={600}
                  />
                )}
                {uploading && (
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin fill-blue-600 mb-2 mx-auto"
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
                )}
                <div className="text-md grid place-items-center bg-slate-200  text-blue-600">
                  {photoUrl === 'None' ? (
                    <CropImage
                      display={t('portfolio:upload_new_photo')}
                      setUploading={setUploading}
                      setPhotoUrl={setPhotoUrl}
                      uploadProfilePhoto={uploadProfilePhoto}
                    />
                  ) : (
                    <CropImage
                      display={t('portfolio:change_profile_photo')}
                      setUploading={setUploading}
                      setPhotoUrl={setPhotoUrl}
                      uploadProfilePhoto={uploadProfilePhoto}
                    />
                  )}
                </div>
              </div>
              <h1 className="text-gray-900 leading-8 my-2">
                <Input
                  label={t('portfolio:preferred_name')}
                  name="Preferred name"
                  type="text"
                  value={preferredName}
                  onChange={(e) => setPreferredName(e.target.value)}
                />
              </h1>
              <div className="leading-6 w-full h-[20vh] max-h-[10rem] md:h-full md:max-h-[12rem]">
                <Textarea
                  label={t('portfolio:bio')}
                  name="Bio"
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
            <div className="my-4"></div>
          </div>
          <div className="w-full md:w-9/12 sm:mx-2 ">
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
                <span className="tracking-wide">{t('portfolio:about')}</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="md:px-4 py-2">
                    <Input
                      label={t('portfolio:name')}
                      name="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label={t('portfolio:wechat_id')}
                      name=""
                      type="text"
                      value={wechatId}
                      onChange={(e) => setWechatId(e.target.value)}
                    />
                  </div>

                  <div className="md:px-4 py-2">
                    <Input
                      label={t('portfolio:gender')}
                      name="Gender"
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label={t('portfolio:contact_no')}
                      name="Contact No."
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label={t('portfolio:current_address')}
                      name="Current address"
                      type="text"
                      value={currentAddress}
                      onChange={(e) => setCurrentAddress(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2 pb-0">
                    <Input
                      label={t('portfolio:permanent_address')}
                      name="Permanent address"
                      type="text"
                      value={permanentAddress}
                      onChange={(e) => setPermanentAddress(e.target.value)}
                    />
                  </div>
                  <div className="md:px-4 py-2">
                    <Input
                      label={t('portfolio:email')}
                      name="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="md:px-4 focus:text-black-700">
                    <div className="text-gray-500">
                      {t('portfolio:birthday')}
                    </div>
                    <YearMonthDayPicker
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
              <div className="sm:grid sm:grid-cols-2 gap-x-3 px-4">
                <div className="mb-10 sm:mb-0">
                  <Experiences />
                </div>
                <Educations />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
