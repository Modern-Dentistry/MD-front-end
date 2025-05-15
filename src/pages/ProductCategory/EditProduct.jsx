// Style
import "../../assets/style/ProductCategory/editproduct.css"

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png"

function EditProduct() {
  return (
    <div className="editProductWrapper">
        <div className="editProductContainer">
            <div className="editProductInput">
                <p>Məhsulun adı<span>*</span></p>
                <input type="text" placeholder="Məhsulun adı" />
            </div>
            <div className="editProductInput">
                <p>Məhsulun kodu</p>
                <input type="text" placeholder="Məhsulun kodu" />
            </div>
            <div className="editProductInput">
                <p>Özəllikləri</p>
                <input type="text" placeholder="Məhsulun adı" />
            </div>
         <div className="editProductButtons">
            <button type="submit" className="cancelFormCondition">
                <img src={cancelButton} />
                İmtina et
            </button>
            <button type="submit" className="acceptFormCondition">
                <img src={acceptButton} />
                Yadda saxla
            </button>
        </div>
        </div>
    </div>
  )
}

export default EditProduct