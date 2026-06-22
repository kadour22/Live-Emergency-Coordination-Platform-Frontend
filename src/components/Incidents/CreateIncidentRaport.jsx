import React,{useState} from 'react'

const CreateIncidentRaport = () => {
  const [incidentType, setIncidentType] = useState('')
  const [incidentDescription, setIncidentDescription] = useState('')

  return (
    <div>

      <h1>Create An Incident Report</h1>\

      <div className="">

          <select name="incidentType" id="incidentType" value={incidentType} onChange={(e) => setIncidentType(e.target.value)}>
            <option value="fire">Fire</option>
            <option value="flood">Flood</option>
            <option value="robbery">Robbery</option>
            <option value="medical">Medical</option>
          </select>

          <input type="text" name="incidentDescription" id="incidentDescription" placeholder="Describe the incident..." value={incidentDescription} onChange={(e) => setIncidentDescription(e.target.value)} />

      </div>

    </div>
  )
}

export default CreateIncidentRaport
