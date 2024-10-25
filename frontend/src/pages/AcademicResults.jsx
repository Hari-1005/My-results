import React, { useEffect, useState } from 'react'

const AcademicResults = () => {
  const [htno, setHtno] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = "https://my-results-backend.vercel.app";



  const onChangeHandler = (event) => {
    event.target.value = event.target.value.toUpperCase();
    setHtno(event.target.value);
  }

  const fetchdata = async (htno) => {
    setLoading(true); //start loading
    try {
      const response = await fetch(`${url}/proxy?htno=${htno}`);
      const result = await response.json();
      setData(result);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div>
      {/* Input Section */}
      <div className='border bg-stone-100 border-none flex gap-1 flex-col items-center w-[100] justify-center py-5 mb-7 shadow'>
        <h2 className='font-semibold text-2xl'>Academic results</h2>
        <input
          className='px-4 py-1 m-3 border border-black drop-shadow-sm text-center'
          type="text"
          name="htno"
          placeholder='Enter your hallticket no.'
          onChange={onChangeHandler}
          maxLength={10}
        />
        <button
          className='border border-gray-700 px-4 py-1 rounded bg-black text-white'
          onClick={() => fetchdata(htno)}
        >
          Submit
        </button>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="loader"></div>
        </div>
      )}
  
      {/* Academic Results Table */}
      {data === null ? '' : (
        <div className='flex flex-col text-[30%]  sm:text-[45%]  md:text-[60%] lg:text-[100%]'>
          {/* Student Details */}
          <table className='w-[100%] mb-5'>
            <thead>
              <tr className='border w-max border-b-gray-400 bg-stone-300'>
                {Object.keys(data.Details).map((key, idx) => (
                  <th key={idx} className='border border-b-gray-400 p-2'>{key}</th>
                ))}
              </tr>
              <tr className='border w-max border-b-gray-400'>
                {Object.values(data.Details).map((value, index) => (
                  <th key={index} className='border border-b-gray-400 p-2'>{value}</th>
                ))}
              </tr>
            </thead>
          </table>
  
          {/* Semester Results */}
          <div>
            {Object.entries(data.Results).map(([semester, subjects]) => (
              semester !== "Total" ? (
                <div key={semester}>
                  {/* Semester Title */}
                  <table className='w-full'>
                    <tbody>
                      <tr>
                        <th className='bg-slate-300 border border-b-gray-400 p-1'>{semester}</th>
                      </tr>
                    </tbody>
                  </table>
  
                  {/* Subjects Table */}
                  <table className='w-full'>
                    <thead>
                      <tr className='border border-b-gray-400'>
                        <th className='p-1 border border-collapse'>SUBJECT_CODE</th>
                        <th className='p-1 border border-collapse'>SUBJECT_NAME</th>
                        <th className='p-1 border border-collapse'>INTERNAL</th>
                        <th className='p-1 border border-collapse'>EXTERNAL</th>
                        <th className='p-1 border border-collapse'>TOTAL</th>
                        <th className='p-1 border border-collapse'>GRADE</th>
                        <th className='p-1 border border-collapse'>CREDITS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(subjects).map(([subjectKey, details]) => (
                        subjectKey !== "total" && subjectKey !== "credits" && subjectKey !== "CGPA" ? (
                          <tr key={subjectKey} className='text-center'>
                            <th className='font-medium border border-collapse p-1'>{details.subject_code}</th>
                            <th className='font-medium border border-collapse p-1'>{details.subject_name}</th>
                            <th className='font-medium border border-collapse p-1'>{details.subject_internal}</th>
                            <th className='font-medium border border-collapse p-1'>{details.subject_external}</th>
                            <th className='font-medium border border-collapse p-1'>{details.subject_total}</th>
                            <th className={`font-medium border border-collapse p-1 ${details.subject_grade === 'F' ? 'text-red-500' : ''}`}>{details.subject_grade}</th>
                            <th className='font-medium border border-collapse p-1'>{details.subject_credits}</th>
                          </tr>
                        ) : null
                      ))}
                    </tbody>
                  </table>
  
                  {/* Semester Total Credits and CGPA Row */}
                  <table className='w-full mb-4'>
                    <tbody>
                      <tr>
                        <th className='w-[25%] p-2 border border-collapse font-medium'>Total Credits</th>
                        <td className='w-[25%] p-2 border border-collapse font-medium text-center'>{subjects.credits}</td>
                        <th className='w-[25%] p-2 border border-collapse font-medium'>CGPA</th>
                        <td className='w-[25%] p-2 border border-collapse font-medium text-center'>{subjects.CGPA}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null
            ))}
  
            {/* Overall CGPA */}
            {data.Results.Total && (
              <table className='w-full my-6'>
                <tbody>
                  <tr>
                    <th className='w-[70%] bg-slate-300 border border-b-gray-400 p-1 font-bold'>Overall CGPA</th>
                    <td className='p-1 border border-b-gray-400 font-bold text-center text-green-800'>{data.Results.Total}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
  
}

export default AcademicResults
