// 'use client';


// export default function StartPage() {
 
//   return (
//     <div className="h-screen ">
//         <div className="relative h-full p-8 rounded-lg shadow-lg text-center">
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black/40  z-0" />

//           {/* Background Image */}
//               <div className="absolute inset-0 bg-[url(/bg2.jpg)] bg-no-repeat bg-center bg-fit bg-cover  z-[-1]" />

//                 {/* Content */}
          
//                 <div className="relative z-10 text-white ">
//                     <h1 className="text-4xl font-extrabold mb-10 mt-25">Welcome to MentorMatch <br /> <span className="text-teal-400">where Potential are been unluck</span>  </h1>
//                         <p className=" mb-4 mt-16 font-extrabold text-3xl shadow-2xl  text-white">Your platform to connect with mentors and mentees.</p>
//                         <p className="mb-4 mt-16 font-extrabold text-xl shadow mx-auto text-white w-1/2">Connect with experienced mentors who can guide you on your journey to success. Whether you&rsquo;re starting your career or looking to grow, we have the right mentor for you.</p>
//                         <p className=" mt-9 flex text-center justify-center items-center gap-4 text-white">
//                           <button  className="flex mb-4 font-extrabold shadow text-xl rounded-xl bg-teal-600 border-teal-600  hover:text-teal-300 hover:bg-transparent border px-6 py-4 text-white">
//                             <a href="/login" className="">Find a mentor</a>
//                             </button>
                            
//                             <button className="flex mb-4 font-extrabold shadow text-xl rounded-xl border px-6 py-4 text-white hover:bg-white hover:text-teal-400">

//                              <a href="/register" className="">Become a mentor</a> 
//                             </button>
                             
//                           </p>
                    
//                 </div>
//              </div>

     
//       <div>

//       </div>

//       <div>

//       </div>
      
    
//     </div> 
    
//   );
// }
'use client';

export default function StartPage() {
  return (
    <div className="h-screen flex items-center justify-center relative p-8 text-center text-white">
      {/* Optional Overlay if not already global in layout.tsx */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 leading-tight">
          Welcome to <span className="text-teal-400">MentorMatch</span><br />
          <span className="text-xl">Where potential is <span className="underline decoration-teal-400">unlocked</span></span>
        </h1>

        <p className="text-lg font-medium mb-6">
          Your platform to connect with mentors and mentees.
        </p>

        <p className="mb-8 text-base font-light leading-relaxed">
          Connect with experienced mentors who can guide you on your journey to success.
          Whether you’re starting your career or looking to grow, we have the right mentor for you.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="/login"
            className="bg-teal-600 hover:bg-transparent hover:text-teal-300 border border-teal-600 font-bold px-6 py-3 rounded-xl transition duration-300"
          >
            Find a Mentor
          </a>
          <a
            href="/register"
            className="border border-white hover:bg-white hover:text-teal-600 font-bold px-6 py-3 rounded-xl transition duration-300"
          >
            Become a Mentor
          </a>
        </div>
      </div>
    </div>
  );
}
