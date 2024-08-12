import React from "react";

const OfficeMap: React.FC = () => {

      return (
          <div className='d-flex justify-content-center px-4'>
              <iframe
                  title="Google Map"
                  style={{ width: '100%', height: '6cm' }}
                  src="https://www.google.com/maps/embed/v1/search?q=+1015+15th+St+NW+6th+Floor,+Washington,+DC,+20005,+USA+·+1050+Connecticut+Avenue+Northwest.&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
              />
          </div>
      );
  };
  
  
export default OfficeMap;
