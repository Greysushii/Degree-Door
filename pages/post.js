import Link from 'next/link'
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import Dropdown from '../components/Dropdown'
import Navbar from '../components/Navbar'
import ProtectedRoute from '../components/HOC/ProtectedRoute'
import { useAuthContext } from '../context/AuthContext'

export default function Post() {
  const { db } = useAuthContext() // Gain db from AuthContext
  const [open, setOpen] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)

  const [formData, setFormData] = useState({
    course: "",
    pros: "",
    cons: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  async function handleSubmit(event) {
    const reviewsRef = collection(db, "Degrees/cs/Reviews")
    const reviewData = {
      timeStamp: serverTimestamp(),
      course: formData.course,
      pros: formData.pros,
      cons: formData.cons
    }
    await addDoc(reviewsRef, reviewData)
    setFormData({
      course: "",
      pros: "",
      cons: "",
    })
    setOpen(false)
    setOpenSuccess(true)
  }

  return (
    <ProtectedRoute>
       <Navbar>
        <Dropdown />
      </Navbar>
      <div className="box-border h-max-[100vh] w-30 p-20">

      {/* add dialog box confirmation message for submit button */}
      {open && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">CONFIRMATION</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Do you want to continue with submission?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button 
                  type="button" 
                  className="inline-flex w-auto justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSubmit}
                >
                  Yes
                </button>
                <button 
                  type="button" 
                  className="mt-3 inline-flex w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>}
      {/* end dialog box */}

      {/* add success alert */}
      {openSuccess && <div id="alert" className="flex w-[700px] ml-[280px] p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
        <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
        <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
          Review has successfully submitted!
        </div>
        <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300" data-dismiss-target="#alert" aria-label="Close"
          onClick={() => setOpenSuccess(false)}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
      </div>}
      {/* end success alert */}

        <div className="form-wrapper w-1/2 m-auto mt-8 placeholder:p-4 border-4 bg-gradient-to-b from-gray-200 to-gray-100 opacity-75 inset-0 z-0 bg-white rounded shadow-md px-6 py-8 flex items-center justify-center">
          <form className="flex flex-col w-full gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label><b>COURSE</b></label>
              <textarea
                className="overflow-auto border border-slate-400 border-solid rounded p-2"
                placeholder="Course name"
                name="course"
                value={formData.course}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label><b>PROS</b></label>
              <textarea
                className="overflow-auto border border-slate-400 border-solid rounded p-2"
                placeholder="List the positives of this course"
                name="pros"
                value={formData.pros}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label><b>CONS</b></label>
              <textarea
                className="overflow-auto border border-slate-400 border-solid rounded p-2"
                placeholder="List the negatives of this course"
                name="cons"
                value={formData.cons}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="p-2 flex">
                <div className="w-1/2"></div>
                <div className="w-1/2 flex justify-end">
                  <Link href="/">
                    <button type="button" className="mt-3 inline-flex w-auto justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                      CANCEL
                    </button>
                  </Link>
                  <button 
                    type="button" 
                    className="inline-flex w-auto justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(true)}
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  )
}
