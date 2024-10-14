import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root")

const Logout = ({onClose,onConfirm}) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            className="flex items-center justify-center h-full"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div className="bg-white rounded-lg p-4 md:p-6 lg:p-8 w-full max-w-md mx-4 relative">
                <button onClick={onClose} className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 text-4xl">&times;</button>
                <h2 className="text-xl font-semibold mb-4" > Confirm Logout</h2>
                <p className="mb-4">Are you want to logout ?</p>
                <div className="flex justify-end space-x-4">
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={onConfirm}>Logout</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={onClose} >Cancel</button>
                </div>
            </div>

        </Modal>
    )
}

export default Logout