export default function GenricLayout({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto flex items-center justify-center bg-[#fbfafb]">
      <div className="relative custom-shadow sm:w-[450px] overflow-y-auto sm:max-w-[100vw] mx-auto sm:h-[95vh] w-[100vw] h-[100vh]  my-auto bg-[#fffefe] rounded-md">
        {children}
      </div>
    </div>
  );
}
