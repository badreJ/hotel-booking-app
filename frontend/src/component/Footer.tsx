

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 mt-2 py-10">
     <div className="container mx-auto flex justify-between items-center px-2">
        <span className="text-3xl text-white font-bold tracking-tight">Bookit<span className="bg-gradient-to-br from-blue-500 to-blue-800 text-transparent bg-clip-text">.com</span></span>
        <span className="text-white font-bold tracking-tight flex gap-4">
            <p className="cursor-pointer underline">Privacy Policy</p>
            <p className="cursor-pointer underline">Terms of Service</p>
        </span>
     </div>
    </div>
  )
}

export default Footer
