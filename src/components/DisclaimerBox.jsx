const DisclaimerBox = ({ text }) => {
    if (!text) return null;
  
    return (
      <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-md text-gray-700 text-base leading-relaxed">
        {text}
      </div>
    );
  };
  
  export default DisclaimerBox;
  