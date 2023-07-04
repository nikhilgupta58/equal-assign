export default function GenricLayout({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-gray-50">
      <div className="w-[450px] max-w-[90vw] mx-auto h-[90vh] my-auto shadow-lg bg-white rounded-md">
        {children}
      </div>
    </div>
  );
}
