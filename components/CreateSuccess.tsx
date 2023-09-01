import { BsFillBellFill } from 'react-icons/bs';

const CreateSucess = ({resMsg}: {resMsg: string | undefined}) => {
  return (
    <>
      {resMsg && (
        <div className="fixed z-20 top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="flex text-xl font-bold text-[#0182ff]">
              <BsFillBellFill className="w-6 h-6"/>
              <span className='px-2'>Notification!</span>
            </h2>
            <p className="mt-2">{ resMsg }</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateSucess