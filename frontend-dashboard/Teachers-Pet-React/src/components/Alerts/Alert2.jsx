import React from "react";
import swal from "sweetalert2";

export default function sweetalertfunction2() {
  swal.fire({
    title: "Gabriel is missing!\n",
    text: "He has been in the washroom for more than 30 minutes!",
    type: "warning",
    width: 1200,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Acknowledged!"
  });
}
