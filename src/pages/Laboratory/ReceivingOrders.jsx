import React from 'react'

function ReceivingOrders() {
  return (
    <div className="labListHeader">
        <div className="leftPart">
            <select name="" id="">
                <option value="">Status</option>
                <option value="Gözləyir">Gözləyir</option>
                <option value="Texnikə göndərilib">Texnikə göndərilib</option>
                <option value="Texnik həkimə geri göndərib">Texnik həkimə geri göndərib</option>
                <option value="Texnik qəbul edib">Texnik qəbul edib</option>
                <option value="Həkimə göndərilib">Həkimə göndərilib</option>
                <option value="Həkim texnikə geri göndərdi">Həkim texnikə geri göndərdi</option>
                <option value="Texnikdən təhvil alınıb">Texnikdən təhvil alınıb</option>
                <option value="Pasiyentə təhvil verilib">Pasiyentə təhvil verilib</option>
            </select>
            <select name="" id=""></select>
        </div>
        <div className="rightPart"></div>
 </div>
  )
}

export default ReceivingOrders