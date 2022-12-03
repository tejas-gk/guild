export default function Loading() {
  return (
    <div className='p-10 min-h-24 flex justify-center bg-indigo'>
      
      <div className='w-[100vh] bg-white rounded-lg shadow-xl p-10 '>
        <div className='animate-pulse'>
          {/* profile */}
          <div className='h-12 w-12 bg-gray-400 rounded-full'></div>
                  <div className='space-y-6'>
                      {/* text */}
            <div className='w-full h-4 bg-gray-400 rounded mt-4'></div>
            <div className='w-32 h-4 bg-gray-400 rounded'></div>
            </div>
        </div>
      </div>
    </div>
  )
}