import { useEffect, useState } from 'react';

import Error from './Error';


const Form = ({patients, setPatients, patient: oldPatient, setPatient: setOldPatient}) => {

  const [patient, setPatient] = useState({
    name: '',
    owner: '',
    email: '',
    discharge: '',
    symptoms: ''
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    setPatient(oldPatient);
  }, [oldPatient]);

  const generateId = () => {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form
    const emptyField = Object.values(patient).includes('');
    if (emptyField) {
      // console.log('All fields are required');
      setError(true);
      return;
    }
    setError(false);
    // Add id
                // setPatient({
                //   ...patient,
                //   id: generateId()
                // });
                // There's something wrong with this code, it's not adding the id to the patient object
    const patientObj = {
      ...patient
    }
    if(patient.id){
      // Edit patient in state
      const updatedPatients = patients.map(patient => patient.id === patientObj.id ? patientObj : patient);
      setPatients(updatedPatients);
      setOldPatient({
        name: '',
        owner: '',
        email: '',
        discharge: '',
        symptoms: ''
      });
    }else{
      patientObj.id = generateId();
      // Add patient to state
      setPatients([
        ...patients,
        patientObj
      ]);
    }
    // Reset form
    setPatient({
      name: '',
      owner: '',
      email: '',
      discharge: '',
      symptoms: ''
    });
  }


  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Patients Monitoring</h2>
      <p className='text-xl mt-5 text-center mb-10'>Add Patients and <span className='text-indigo-600 font-bold'>Manage them</span></p>

      <form 
        onSubmit={ handleSubmit }
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >
        { error ? <Error message='All fields are required' /> : null }
        <div className='mb-5'>
          <label htmlFor="name" className='block text-gray-700 uppercase font-bold'>Pets Name</label>
          <input
            type="text"
            name="name"
            id='name'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Pets Name'
            value={ patient.name }
            onChange={ handleChange }
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="owner" className='block text-gray-700 uppercase font-bold'>Owners Name</label>
          <input
            type="text"
            name="owner"
            id='owner'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Owners Name'
            value={ patient.owner }
            onChange={ handleChange }
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>Email</label>
          <input
            type="email"
            name="email"
            id='email'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Owners Email'
            value={ patient.email }
            onChange={ handleChange }
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="discharge" className='block text-gray-700 uppercase font-bold'>Discharge</label>
          <input
            type="date"
            name="discharge"
            id='discharge'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={ patient.discharge }
            onChange={ handleChange }
          />
        </div>
        <div className='mb-5'>
          <label htmlFor="symptoms" className='block text-gray-700 uppercase font-bold'>Symptoms</label>
          <textarea 
            name="symptoms" 
            id="symptoms" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            placeholder='Describe the symptoms'
            value={ patient.symptoms }
            onChange={ handleChange }
          />
        </div>
        <input 
          type="submit"
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 rounded-md cursor-pointer transition-colors' 
          value={ patient.id ? 'Edit Patient' : 'Add Patient' }
        />
      </form>
    </div>
  )
}

export default Form