import React from "react";
import PropTypes from "prop-types";

const Sectors = ({ allSectors, onSectorChange, selectedSectors }) => {
  const renderNestedOptions = (sector, level = 0) => {
    const indentation = '\u00A0'.repeat(level * 4); // Using &nbsp; for indentation

    return (
      <React.Fragment key={sector.id}>
        <option value={sector.id}>{`${indentation}${sector.name}`}</option>
        {sector.children.length > 0 && (
          sector.children.map(child => renderNestedOptions(child, level + 1))
        )}
      </React.Fragment>
    );
  };

  return (
    <div className='block relative'>
      <label className='block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2' htmlFor="sectorSelect">Select Sectors:</label>
      <select className='rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] block focus:ring-2 ring-offset-2  ring-gray-900 outline-0' size={7} id="sectorSelect" multiple value={selectedSectors} onChange={onSectorChange}>
        {allSectors.map(parentSector => (
          <optgroup key={parentSector.id} label={parentSector.name}>
            {parentSector.children.map(childSector => (
              renderNestedOptions(childSector, 1)
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

Sectors.propTypes = {
  allSectors: PropTypes.array,
  onSectorChange: PropTypes.func,
  selectedSectors: PropTypes.array
};

export default Sectors;