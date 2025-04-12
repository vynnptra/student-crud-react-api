export default function FormInput({ title, children, ...props }) {
    return (
      <div className="pt-36">
        <div className="p-8 rounded border shadow-md border-gray-200 w-9/12 ml-96">
          <h1 className="font-medium text-3xl">{title}</h1>
          <p className="text-gray-600 mt-6">Isi informasi pengguna dengan benar.</p>
  
          <form {...props}>
           
              {children}

          </form>
        </div>
      </div>
    );
  }
  
  FormInput.Label = function Label({ children }) {
    return (
      <label className="text-sm text-gray-700 block mb-1 font-medium">{children}</label>
    );
  };
  
  FormInput.Input = function Input(props) {
    return (
      <input
        {...props}
        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
      />
    );
  };
  
  FormInput.Checkbox = function Checkbox({ children }) {
    return <div className="flex flex-wrap gap-y-10">{children}</div>;
  };
  FormInput.Checkbox.Item = function CheckboxItem({ children, ...props }) {
    const id = `checkbox-${Math.random().toString(36).substring(2, 9)}`;
  
    return (
      <div className="relative basis-1/4">
        <input
          type="checkbox"
          id={id}
          {...props}
          className="peer hidden"
        />
        <label
          htmlFor={id}
          className="select-none cursor-pointer rounded-lg border-2 border-gray-200
          py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out
          peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600"
        >
          {children}
        </label>
      </div>
    );
  };
  
  
  FormInput.SubmitButton = function SubmitButton({ children, ...props }) {
    return (
      <button
        {...props}
        className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 active:bg-green-700 disabled:opacity-50"
      >
        {children}
      </button>
    );
  };
  
  FormInput.CancelButton = function CancelButton({ children, ...props }) {
    return (
      <button
        {...props}
        className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
      >
        {children}
      </button>
    );
  };
  