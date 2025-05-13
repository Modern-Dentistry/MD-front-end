// import React, { useEffect } from "react";
// import PatientForm from "../components/PatientForm";
// import { useCreatePatient, usePatients } from "../hooks/usePatients.js";
// import { toast } from "react-toastify";
// import BlurLoader from "../components/layout/BlurLoader.jsx";

// function AddPatient() {
//     const { mutate, isPending, isError, error, isSuccess } = useCreatePatient();
//     const { data: patients } = usePatients();

//     useEffect(() => {
//         if (isError) {
//            toast.error("Xəta baş verdi");
//         }
//         if (isSuccess) {
//             toast.success("Uğurla yaradıldı");      
//       }
//     }, [isError, isSuccess, error]);

//     return (
//         <div>
//             <BlurLoader isLoading={isPending}>
//             <PatientForm mode="create" onSubmit={mutate}/>
//             </BlurLoader>
//         </div>
//     );
// }

// export default AddPatient;
