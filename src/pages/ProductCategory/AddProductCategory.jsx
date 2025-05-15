// Style
import "../../assets/style/ProductCategory/addproductcategory.css"


// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png"



function AddProductCategory() {
  return (
    <>
     <div className="addProductCategoryWrapper">
        <div className="addProductCategoryContainer">
            <div className="addProductCategoryInput">
                <p>Məhsul kateqoriyasının adı<span>*</span></p>
                <input type="text" placeholder="Məhsulun adı" />
            </div>
            <div className="addProductCategoryButtons">
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
    </>
  )
}

export default AddProductCategory