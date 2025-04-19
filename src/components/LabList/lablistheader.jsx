import React from 'react'

function lablistheader() {
  return (
    <>
     <div className="labListHeader">
        <div className="leftPart">
            <select name="" id="">
                <option value="">Status</option>
                <option value="Gözləyir">Gözləyir</option>
                <option value="">Texnikə göndərilib</option>
                <option value="">Texnik həkimə geri göndərib</option>
                <option value="">Texnik qəbul edib</option>
                <option value="">Həkimə göndərilib</option>
                <option value="">Həkim texnikə geri göndərdi</option>
                <option value="">Texnikdən təhvil alınıb</option>
                <option value="">Pasiyentə təhvil verilib</option>
            </select>
            <select name="" id=""></select>
        </div>
        <div className="rightPart"></div>
     </div>
    </>
  )
}

export default lablistheader