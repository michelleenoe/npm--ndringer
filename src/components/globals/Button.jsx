const Button = ({ title }) => {
  return (
    <>
      <div className=" bg-bgColor rounded-lg border-2 border-inputFieldColor text-secondaryColor transition-colors duration-100 ease-in-out hover:bg-secondaryColor hover:text-bgColor hover:border-bgColor px-5 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentColor">
        {title}
      </div>
    </>
  );
};

export default Button;
