const ContentProperties = ({ properties }) => {
  return (
    <div className="content-properties w-full max-w-[100vw] py-6 px-4 flex flex-col gap-6">
      {properties.map((property, index) => (
        <div key={index} className="property-item ">
          {/* <strong>{property.label}</strong>: {property.value} */}
          {property}
        </div>
      ))}
    </div>
  );
};

export default ContentProperties;