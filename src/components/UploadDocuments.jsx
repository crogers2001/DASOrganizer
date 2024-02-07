import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import HomeButton from './HomeButton.jsx';


function UploadDocuments () {
    const { objectID } = useParams(); //the objectID of the user's dance
    const [dance, setDance] = useState(null);
    const navigate = useNavigate();

    const [songFileUploaded, setSongFileUploaded] = useState(false);
    const [choreographerContractUploaded, setChoreographerContractUploaded] = useState(false);
    const [choreographerPacketUploaded, setChoreographerPacketUploaded] = useState(false);

    useEffect(() => {
        const fetchPerformanceData = async () => {
          try {
            const response = await fetch(`https://www.server.dastamu.com/api/performances/${objectID}`);
            if (!response.ok) {
              console.error("An error occurred while fetching performance data");
              return;
            }
            const responseData = await response.json();
            updateDance(responseData.data);
            console.log(responseData.data.dancers);
          } catch (error) {
            console.error("An error occurred:", error);
          }
        };
        fetchPerformanceData();
    }, []);
    
    const updateDance = (data) => {
        setDance(data);
        console.log("Dance has been updated")
    }


    const handleSongFile = async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        await fetch(`https://www.server.dastamu.com/api/performances/${objectID}`, {
          method: 'PUT',
          body: formData,
        });
  
        setSongFileUploaded(true);
      } catch (error) {
        console.error("An error occurred while uploading song file:", error);
      }
    };
  
    const handleChoreographerContract = async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        await fetch(`https://www.server.dastamu.com/api/performances/${objectID}`, {
          method: 'PUT',
          body: formData,
        });
  
        setChoreographerContractUploaded(true);
      } catch (error) {
        console.error("An error occurred while uploading choreographer contract:", error);
      }
    };
  
    const handleChoreographerPacket = async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
  
        await fetch(`https://www.server.dastamu.com/api/performances/${objectID}`, {
          method: 'PUT',
          body: formData,
        });
  
        setChoreographerPacketUploaded(true);
      } catch (error) {
        console.error("An error occurred while uploading choreographer packet:", error);
      }
    };


    const handleBackButton = () => {
        navigate(`/choreographer/manage/${objectID}`);
    }

    return (
        <div>
            <button className='back-button' onClick={handleBackButton}>
                <img src= "/back-arrow.svg" alt="Back" />
            </button>
            <HomeButton />
    
            <div className='centered-stuff'>
                <h1>Upload Documents</h1>
            </div>
    
            <div className='upload-item-container'>
                <h4>Song file</h4>
                {   dance?.songFile || songFileUploaded ? 
                    <div className='submitted-msg'>
                        Submitted
                        <img src='/checkmark.svg' alt=''></img>
                    </div>
                    :
                    <div className='missing-msg'>
                        Missing
                    </div>

                }
                <div>
                    <label className='upload-button'>
                        Upload Song File
                        <input type="file" accept=".mp3" onChange={(e) => handleSongFile(e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                </div>
                <div className='top-gap'>.mp3 only</div>
            </div>
    
            <div className='upload-item-container'>
                <h4>Choreographer Contract</h4>
                {   dance?.choreographerContract || choreographerContractUploaded ? 
                    <div className='submitted-msg'>
                        Submitted
                        <img src='/checkmark.svg' alt=''></img>
                    </div>
                    :
                    <div className='missing-msg'>
                        Missing
                    </div>

                }
                <div>
                    <label className='upload-button'>
                        Upload Contract
                        <input type="file" accept=".pdf" onChange={(e) => handleChoreographerContract(e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                </div>
                <div className='top-gap'>.pdf only</div>
            </div>
    
            <div className='upload-item-container'>
                <h4>Choreographer Packet</h4>
                {   dance?.choreographerPacket || choreographerPacketUploaded? 
                    <div className='submitted-msg'>
                        Submitted
                        <img src='/checkmark.svg' alt=''></img>
                    </div>
                    :
                    <div className='missing-msg'>
                        Missing
                    </div>

                }
                <div>
                    <label className='upload-button'>
                        Upload Packet
                        <input type="file" accept=".pdf" onChange={(e) => handleChoreographerPacket(e.target.files[0])} style={{ display: 'none' }} />
                    </label>
                </div>
                <div className='top-gap'>.pdf only</div>
            </div>
        </div>
    );
}

export default UploadDocuments;