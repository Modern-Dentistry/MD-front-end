// Style
import "../../assets/style/ProductCategory/editproductcategory.css"


// Images
import acceptButton from "../../assets/images/EmployeesPage/verifyProcess.png"
import cancelButton from "../../assets/images/EmployeesPage/cancelProcess.png"



function EditProductCategory() {
  return (
    <>
     <div className="editProductCategoryWrapper">
        <div className="editProductCategoryContainer">
            <div className="editProductCategoryInput">
                <p>Məhsul kateqoriyasının adı<span>*</span></p>
                <input type="text" placeholder="Məhsulun adı" />
            </div>
            <div className="editProductCategoryButtons">
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

export default EditProductCategory