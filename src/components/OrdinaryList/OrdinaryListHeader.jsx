import React from 'react'

// Style
import "../../assets/style/OrdinaryListStyle/ordinarylistheader.css"

// Libraries
import { IoPersonAddOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";

import { Link } from 'react-router-dom';

function OrdinaryListHeader({ title, addText, addLink, exportLink, onAddClick }) {
  return (
    <div className="listHeader">
      <p className='titleOrdinaryList'>{title}</p>
      <div className="ordinaryListButtons">
        <Link onClick={onAddClick} to={addLink} className='addTextBTN'>
          <IoPersonAddOutline className='addBTN' /> {addText}
        </Link>
        <Link className='exportDataNow' to={exportLink}>
          <FiDownload className='exportDataBTN' />
        </Link>
      </div>
    </div>
  )
}

export default OrdinaryListHeader
