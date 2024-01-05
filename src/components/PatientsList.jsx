import { useEffect } from "react"

import Patient from "./Patient"

const PatientsList = ({patients, setPatient, removePatient}) => {

    return (
        <div className='md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll'>
            {patients && patients.length ? (
                <>
                    <h2 className='font-black text-3xl text-center'>Patients List</h2>
                    <p className='text-xl mt-5 text-center mb-10'>Manage your <span className='text-indigo-600 font-bold'>Patients and Appointments</span></p>
                    { patients.map((patient) => (
                        <Patient
                            key={ patient.id }
                            patient={ patient }
                            setPatient={ setPatient }
                            removePatient={ removePatient }
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className='font-black text-3xl text-center'>No Patients Yet</h2>
                    <p className='text-xl mt-5 text-center mb-10'>Start adding new patients <span className='text-indigo-600 font-bold'>and they will appear below</span></p>
                </>
            )}
        </div>
    )
}

export default PatientsList
