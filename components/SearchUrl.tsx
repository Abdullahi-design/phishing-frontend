import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import CreateSuccess from './CreateSuccess'
import axios from 'axios';
import Link from 'next/link';

const SearchUrl = () => {

  const [urlToScan, setUrlToScan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resMsg, setResMsg] = useState<string>('');
  const [jobId, setJobId] = useState();
  const [brand, setBrand] = useState();
  const [disposition, setDisposition] = useState();
  const [error, setError] = useState();
  const [insights, setInsights] = useState<any>();
  const [job_id, setJob_id] = useState();
  const [resolved, setResolved] = useState();
  const [scanEnd, setScanEnd] = useState<any>();
  const [scanStart, setScanStart] = useState<any>();
  const [screenShot, setScreenShot] = useState();
  const [status, setStatus] = useState();
  const [url, setUrl] = useState();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrlToScan(e.target.value); // Update urlToScan when the input changes
        console.log(e.target.value, 'input value');
    };
  

    const fetchUrlDetails = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          setIsLoading(true);
          console.log(urlToScan);
          
      
          const response = await fetch(`http://localhost:9000/scan-url`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ urlToScan }), // Ensure that 'urlToScan' is correctly set
          });
      
          if (response.ok) {
            const data = await response.json();
            const scanStart = new Date(data.scan_start_ts);
            const scanEnds = new Date(data.scan_end_ts);
            const formatedStart = scanStart.toDateString();
            const formatedEnd =scanEnds.toDateString();

            setResMsg(data.status)
            setJobId(data.job_id)
            setBrand(data.brand);
            setDisposition(data.disposition);
            setError(data.error);
            setInsights(data.insights);
            setJob_id(data.job_id);
            setResolved(data.resolved);
            setScanEnd(formatedEnd);
            setScanStart(formatedStart);
            setScreenShot(data.screenshot_path);
            setStatus(data.status);
            setUrl(data.url);
            console.log(data, 'this data');
      
          } else {
            const data = await response.json();
            setResMsg(data.error);
            console.log('Login error:', data.error);
          }
      
        } catch (error: any) {
          setResMsg(error);
          console.log(error, 'err');
          
        } finally {
          setIsLoading(false);
        }
    };
      

    useEffect(() => {
        if (resMsg) {
        const timer = setTimeout(() => {
            setResMsg('');
        }, 5000);
        return () => clearTimeout(timer);
        }
    }, [resMsg]);

    const fetchJobStatus = async (jobID: string) => {
        try {
          const response = await axios.get(`http://localhost:9000/job-status/${jobID}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching job status:', error);
          throw error;
        }
      };
      
      useEffect(() => {
        if (resMsg === 'Data received' && jobId) {
          const pollInterval = setInterval(async () => {
            const statusData = await fetchJobStatus(jobId);
            console.log('Job Status:', statusData);
            // Update the status in your component's state
            // setStatus(statusData.status);
          }, 5000); // Poll every 5 seconds
      
          return () => clearInterval(pollInterval);
        }
    }, [resMsg, jobId]);      
      

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className='max-w-4xl mx-auto'>
        <h1 className="text-3xl font-bold text-center mb-8">Enter weburl</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          {/* {resMsg && <CreateSuccess resMsg={resMsg}/>} */}
          <div className="flex items-center space-x-4">
            <input
            required
            type="text"
            className="input-field flex-grow"
            placeholder="Enter Url"
            value={urlToScan}
            onChange={handleInputChange}
            />
            {isLoading ? (
            <Loader/>
            ):(
            <button
                className="bg-emerald-500 hover:bg-emerald-700 flex  text-white px-4 py-2 rounded"
                onClick={fetchUrlDetails}
            >
                Scan <span className='px-1'>Url</span>
            </button>
            )}
          </div>
        

          {status == 'DONE' && (
            <div className='mt-6'>
              <p className='text-lg text-black'>Status: <span className={`text-white text-sm ${status == 'DONE' ? 'bg-green-500 rounded-2xl px-4 py-1' : 'bg-gray-500 rounded-2xl px-4 py-1'}`}>{status}</span></p>
              <p className='text-lg text-black'>JobId: <span className='text-gray-700 text-sm'>{job_id}</span></p>
              <p className='text-lg text-black'>Url: <span className='text-gray-700 text-sm'>{url}</span></p>
              <p className='text-lg text-black'>ScreenShot: <a className='text-blue-700 text-sm' href={screenShot}>Click here to download screen shot</a></p>
              {resolved && <p className='text-lg text-black'>Resolved: <span className='text-gray-700 text-sm'>{resolved}</span></p>}
              {error && <p className='text-lg text-black'>Error: <span className='text-gray-700 text-sm'>{error}</span></p>}
              <p className='text-lg text-black'>Brand: <span className='text-gray-700 text-sm'>{brand}</span></p>
              <p className='text-lg text-black'>Disposition: <span className='text-gray-700 text-sm'>{disposition}</span></p>
              <p className='text-lg text-black'>ScanStart: <span className='text-gray-700 text-sm'>{scanStart}</span></p>
              <p className='text-lg text-black'>ScanEnd: <span className='text-gray-700 text-sm'>{scanEnd}</span></p>
              <Link href={insights} >
                <button className='bg-emerald-500 hover:bg-emerald-700 flex  text-white px-4 py-2 rounded mt-4'>Click here to view full insights</button>
              </Link>
            </div>
          )}
          {status == 'PENDING' &&(
            <div className='mt-6'>
              <p className='text-lg text-black'>Status: <span className={`text-white text-sm ${status == 'DONE' ? 'bg-green-500 rounded-2xl px-4 py-1' : 'bg-gray-500 rounded-2xl px-4 py-1'}`}>{status}</span></p>
              <p className='text-lg text-black'>JobId: <span className='text-gray-700 text-sm'>{job_id}</span></p>
              <p className='text-lg text-black'>Url: <span className='text-gray-700 text-sm'>{url}</span></p>
              <p className='text-lg text-black'>ScanStart: <span className='text-gray-700 text-sm'>{scanStart}</span></p>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchUrl