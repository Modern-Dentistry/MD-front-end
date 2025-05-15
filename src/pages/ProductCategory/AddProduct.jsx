// Style
import "../../assets/style/ProductCategory/addproduct.css"

// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png"

function AddProduct() {
  return (
    <div className="addProductWrapper">
        <div className="addProductContainer">
            <div className="addProductInput">
                <p>Məhsulun adı<span>*</span></p>
                <input type="text" placeholder="Məhsulun adı" />
            </div>
            <div className="addProductInput">
                <p>Məhsulun kodu</p>
                <input type="text" placeholder="Məhsulun kodu" />
            </div>
            <div className="addProductInput">
                <p>Özəllikləri</p>
                <input type="text" placeholder="Məhsulun adı" />
            </div>
         <div className="addProductButtons">
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

export default AddProduct