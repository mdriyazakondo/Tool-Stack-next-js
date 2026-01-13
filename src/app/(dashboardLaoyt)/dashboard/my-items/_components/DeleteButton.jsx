"use client";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteItem } from "@/services/item.server";

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    // SweetAlert2 Custom Styling
    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-rose-600 text-white px-6 py-2.5 rounded-xl font-bold mx-2 shadow-lg shadow-rose-100 outline-none",
        cancelButton:
          "bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-bold mx-2 outline-none",
      },
      buttonsStyling: false,
    });

    swalWithTailwindButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this tool!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await deleteItem(id);

            if (res.acknowledged) {
              // Success Message
              Swal.fire({
                title: "Deleted!",
                text: "The tool has been removed successfully.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                  popup: "rounded-[2rem]",
                },
              });
              router.refresh();
            } else {
              throw new Error("Failed");
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
              confirmButtonColor: "#4f46e5",
            });
          }
        }
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
      title="Delete"
    >
      <FiTrash2 size={18} />
    </button>
  );
}
