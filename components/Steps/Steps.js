import React, { Fragment } from "react";
import Modal from "../Modal/Modal";

export default function Steps() {
  return (
    <Fragment>
      <div className="grid place-items-center m-8">
        <div className="text-gray-500 sm:text-xl dark:text-gray-400 mb-8">
          <h1>The following is a general process guideline.</h1>
        </div>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Prepare your college tennis recruiting videos
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 1
            </time>
            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              Record match play videos (recommended to record videos from an
              actual tournament) and practice videos (forehand, backhand,
              volley, serves, rallies).
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Submit your TOEFL result
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 2
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              Take the{" "}
              <a
                href="https://www.ets.org/toefl"
                target="_blank"
                rel="noreferrer"
              >
                <u>TOEFL</u>
              </a>{" "}
              exam and submit your results.{" "}
              <Modal
                display="What is TOEFL?"
                title="TOEFL"
                description="Test of English as a Foreign Language (TOEFL) is a standardized test to measure the English language ability of non-native speakers who
                want to enroll in English-speaking universities. This test is accepted by more than 11,000 universities and other institutions in over 190 countries and territories."
              />
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Submit your SAT result
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 3
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              Take the{" "}
              <a
                href="https://satsuite.collegeboard.org/sat"
                target="_blank"
                rel="noreferrer"
              >
                <u>SAT</u>
              </a>{" "}
              test and submit your results.
              <Modal
                display="What is SAT?"
                title="TOEFL"
                description="SAT is an entrance exam used by most colleges and universities to make admissions decisions. 
                It is a multiple-choice, pencil-and-paper test created and administered by the College Board.
                The purpose of SAT is to measure a high school student's readiness for college, and provide colleges a baseline 
                to compare all applicants. College admissions officers will review standardized test scores alongside your high school GPA, 
                the classes you took in high school, letters of recommendation from teachers or mentors, extracurricular activities, 
                admissions interviews, and personal essays. How important SAT scores are in the college application process varies from school to school."
              />
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Submit your high school transcript
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 4
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              Submit your official high school transcript with an English
              translation.
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Submit your personal statement
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 5
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              A brief overview of who you are, your strengths and any work
              experience and/or education you have. More on personal statements.
            </div>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
              <svg
                className="w-3 h-3 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Apple for F1 visa
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              Step 6
            </time>
            <div className="text-base font-normal text-gray-500 dark:text-gray-400">
              Upon receiving an offer and I-20 from a college, you will need to
              apply for an F1 visa through a US embassy.
            </div>
            <Modal
              display="How to get a visa?"
              title="Visa instructions"
              link={
                <>
                  <a
                    href="https://www.topuniversities.com/student-info/studying-abroad/how-get-us-student-visa"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Here is how you can get a student visa
                  </a>
                </>
              }
            />
          </li>
        </ol>
      </div>
    </Fragment>
  );
}
