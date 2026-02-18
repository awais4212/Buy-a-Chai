import React from 'react'

const Footer = () => {
  return (
    <footer className='relative mt-auto bg-gradient-to-r from-black to-purple-900'>
      {/* Gradient top border - Purple to Black */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-purple-700 to-purple-500"></div>
      
      <div className='flex justify-center items-center p-4 h-15'>
        <p className='text-white text-center'>Copyright &copy; Get me a Chai - Fund Your Projects With Chai</p>
      </div>
    </footer>
  )
}

export default Footer